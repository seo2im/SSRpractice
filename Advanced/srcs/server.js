import React from 'react'
import App from './App'
import { renderToNodeStream } from 'react-dom/server'
import { Transform } from 'stream'

import express from 'express'
import fs from 'fs';
import path from 'path'
import * as url from'url'

import { prerenderPages } from './common'

import lruCache from 'lru-cache'
const ssrCache = new lruCache({
	max : 100,
	maxAge : 1000 * 60,
})

/* Stream for cache */
function createCacheStream(cacheKey, prefix, postfix) {
	const chunks = [];
	return new Transform({
		transform(data, _, callback) {
			chunks.push(data);
			callback(null, data);
		},
		flush(callback) {
			const data = [prefix, Buffer.concat(chunks).toString(), postfix]
			ssrCache.set(cacheKey, data.join(''))
			callback();
		}
	})
}

const app = express();

/* Read preredner html */
const prerenderHtml = {};
for (const page of prerenderPages) {
	const pageHtml = fs.readFileSync(
		path.resolve(__dirname, `../dist/${page}.html`),
		'utf8'
	)
	prerenderHtml[page] = pageHtml;
}
/* Stream render function */
const html = fs.readFileSync(
	path.resolve(__dirname, '../dist/index.html'),
	'utf8'
)

app.use('/dist', express.static('dist'))
/* web favicon reject in '*' */
app.get('./favicon.ico', (req, res) => res.sendStatus(204));
app.get('*', (req, res) => {
	const parsedUrl = url.parse(req.url, true);
	const cacheKey = parsedUrl.path;
	/* Get cache */
	if (ssrCache.has(cacheKey)) {
		res.send(ssrCache.get(cacheKey));
		return ;
	}
	const page = parsedUrl.pathname ? parsedUrl.pathname.substr(1) : 'home'
	const initialData = { page };

	/* render only when no pre rendering */
	const isPrerender = prerenderPages.includes(page)
	const result = (isPrerender ? prerenderHtml[page] : html)
		.replace('__DATA_FROM_SERVER__', JSON.stringify(initialData))
	if (isPrerender) {
		/* Save cache */
		ssrCache.set(cacheKey, result);	
		res.send(result);
	}
	else
	{
		/* stream start is prefix ; end is posfix */
		const ROOT_TEXT = '<div id="root">';
		const prefix = result.substr(
			0, result.indexOf(ROOT_TEXT) + ROOT_TEXT.length
		)
		const postfix = result.substr(prefix.length);
		res.write(prefix);
		const stream = renderToNodeStream(<App page={page} />)
		/* make cache stream pipe */
		const cacheStream = createCacheStream(cacheKey, prefix, postfix)
		cacheStream.pipe(res);
		stream.pipe(
			cacheStream, // res => cacheStream
			{ end : false }
		);
		stream.on('end', () => {
			res.end(postfix)
		})
	}
})

app.listen(3000);
