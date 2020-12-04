import fs from 'fs'
import path from 'path'
import { renderToString } from 'react-dom/server'
import React from 'react'
import App from './App'

/* page read html */
const html = fs.readFileSync(
	path.resolve(__dirname, '../dist/index.html'),
	'utf8'
)
/* page list */
export const prerenderPages = ['home'];

/* pre render page function */
export function renderPage(page) {
	const renderString = renderToString(<App firstPage={page}/>);
	const result = html
		.replace('<div id="root"></div>', `<div id="root">${renderString}</div>`)
	return result;
}