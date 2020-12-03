import express from 'express'
import fs from 'fs';
import path from 'path'
import { renderToString } from 'react-dom/server' 
import React from 'react'
import App from './App'

const app = express();
const html = fs.readFileSync(
	path.resolve(__dirname, '../dist/index.html'),
	'utf-8'
)
app.use('/dist', express.static('dist'))
/* web favicon reject in '*' */
app.get('./favicon.ico', (req, res) => res.sendStatus(204));
app.get('*', (req, res) => {
	const renderString = renderToString(<App firstPage="home"/>);
	const result = html.replace(
		'<div id="root"></div>',
		`<div id='root'>${renderString}</div>`
	);
	res.send(result);
})

app.listen(3000);
