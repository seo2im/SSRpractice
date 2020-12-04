import React from 'react'
import express from 'express'
import fs from 'fs';
import path from 'path'
import * as url from'url'

import { renderPage, prerenderPages } from './common'

import lruCache from 'lru-cache'
const ssrCache = new lruCache({
	max : 100,
	maxAge : 1000 * 60,
})

const app = express();

const prerenderHtml = {};
for (const page of prerenderPages) {
	const pageHtml = fs.readFileSync(
		path.resolve(__dirname, `../dist/${page}.html`),
		'utf8'
	)
	prerenderHtml[page] = pageHtml;
}

app.use('/dist', express.static('dist'))
/* web favicon reject in '*' */
app.get('./favicon.ico', (req, res) => res.sendStatus(204));
app.get('*', (req, res) => {
	const parsedUrl = url.parse(req.url, true);
	const cacheKey = parseUrl.path;
	/* Get cache */
	if (ssrCache.has(cacheKey)) {
		res.send(ssrCache.get(cacheKey));
		return ;
	}
	const page = parsedUrl.pathname ? parsedUrl.pathname.substr(1) : 'home'
	const initialData = { page };

	/* render only when no pre rendering */
	const pageHtml = prerenderHtml.includes(page)
		? prerenderHtml[page]
		: renderPage(page);
	const result = pageHtml.replace(
		'__DATA_FROM_SERVER__', JSON.stringify(initialData)
	)
	/* Save cache */
	ssrCache.set(cacheKey, result);
	res.send(result);
})

app.listen(3000);
