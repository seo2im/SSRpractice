import fs from 'fs'
import path from 'path'
import { renderToString } from 'react-dom/server'
import React from 'react'
import App from './App'

const html = fs.readFileSync(
	path.resolve(__dirname, '../dist/index.html'),
	'utf8'
)

export const prerenderPages = ['home'];

export function renderPage(page) {
	const renderString = renderToString(<App firstPage={page}/>);
	const result = html
		.replace('<div id="root"></div>', `<div id="root">${renderString}</div>`)
	return result;
}