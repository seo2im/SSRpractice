const express = require('express')
const next = require('next')
const fs = require('fs')

const url = require('url')
const lruCache = require('lru-cache')
const { query } = require('express')

const ssrCache = new lruCache({
	max : 100,
	maxAge : 1000 * 60
})
const port = 3000;
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev});
const handle = app.getRequestHandler();

/* prerendering */
const prerenderList = [
	{ name : 'page1', path : '/page1'},
	{ name : 'page2-hello', path : '/page2?str=hello'},
	{ name : 'page2-world', path : '/page2?str=world'}
]
const prerenderCache = {};
if (!dev) {
	for (const info of prerenderList) {
		const { name, path } = info;
		const html = fs.readFileSync(`./out/${name}.html`, 'utf-8'); //prerendering page in out directory
		prerenderCache[path] = html;
	}
}
/* Rendering and set caching in server */
async function renderAndCache (req, res) {
	const parsedUrl = url.parse(req.url, true);
	const cacheKey = parsedUrl.path;
	if (ssrCache.has(cacheKey)) {
		res.send(ssrCache.get(cacheKey));
		return ;
	}
	/* prerendering cache has  */
	if (prerenderCache.hasOwnProperty(cacheKey)) {
		res.send(prerenderCache[cacheKey]);
		return ;
	}
	try {
		const { query, pathname } = parsedUrl;
		const html = await renderToHTML(req, res, pathname, query); //HTML static file get
		if (res.statusCode === 200) {
			ssrCache.set(cacheKey, html)
		}
		res.send(html);
	} catch (err) {
		app.renderError(err, req, res, pathname, query);
	}
}

app.prepare().then(() => {
	const server = express();

	server.get('/page/:id', (req, res) => {
		res.redirect(`/page${req.params.id}`);
	})
	server.get(/^\page[1-9]/, (req, res) => {
		return renderAndCache(req, res);
	})

	server.get('*', (req, res) => {
		return handle(req, res);
	})

	server.listen(port, err => {
		if (err) throw err;
	})

	console.log(`port ${port} Ready`);
})

