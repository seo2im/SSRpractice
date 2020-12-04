import express from 'express'
import fs from 'fs';
import path from 'path'
import { renderToString } from 'react-dom/server' 
import React from 'react'
import App from './App'
import * as url from'url'

import { renderPage, prerenderPages } from './common'

const app = express();
/*
const html = fs.readFileSync(
	path.resolve(__dirname, '../dist/index.html'),
	'utf-8'
)
*/
const prerenderHtml = {};
for (const page of prerenderPages) {
	const pageHtml = fs.readFileSync(
		path.resolve(__dirname, `../dist/${page}.html`),
		'utf8'
	)
	prerenderPages[page] = pageHtml;
}

app.use('/dist', express.static('dist'))
/* web favicon reject in '*' */
app.get('./favicon.ico', (req, res) => res.sendStatus(204));
app.get('*', (req, res) => {
	const parsedUrl = url.parse(req.url, true);
	const page = parsedUrl.pathname ? parsedUrl.pathname.substr(1) : 'home'
	console.log(parsedUrl.pathname)
	const initialData = { page };

	console.log(initialData)
	const pageHtml = prerenderPages.includes(page)
		? prerenderPages[page]
		: renderPage(page);
	const result = pageHtml.replace(
		'__DATA_FROM_SERVER__', JSON.stringify(initialData)
	)
	res.send(result);
})

app.listen(3000);
