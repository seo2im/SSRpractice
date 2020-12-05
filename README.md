# Server side rendering

## What is SSR

**SSR(server side rendering)** is react rendering in server. Object are two.

1. For search engine optimization
2. For fast first page rendering

## Basic

Basic function for SSR

1. `renderToString()`, `hydrate()` in React
2. How to send data from server to client
3. How to make bundle for server
4. How to apply extern modules.

Basically, server get static html file show in browser. we use `renderToString()` for making react component to string.

```javascript
const renderString = renderToString(<ReactComponent />)

html.replace('<div/><div>', `<div>${renderString}</div>`)
```

But, server data can't be sended to client with above. So, use trick in window object. template html get data from first rendering with replacing. Then client use data from window object.

```javascript
/* template html */
<head>
	...
	<script type="text/javascript">
		window.__INITIAL_DATA__ = __DATA_FROM_SERVER__;
	</script>
</head>

/* server */
html.replace('__DATA_FROM_SERVER__', JSON.stringfy(someData));
```

When you want use other module(like file from loader), build server with webpack. But, server bundling has some diff with client bundling. For example, server no need node_bunding because server always get module from node_modules directory. Want more details, ref `Basic/webpack.config.js`

## Advanced

Because SSR use many resources, have way to deal with high traffic. like below

### 1. prerendering page

Which page no dependency of data are pre-rendered when building, better preformance. Also, low dependency page.

For example, page with `username` from server, pre-rendered without name. Later, fetch data from server with api.

```javascript
/* Get data with API, this worked smillar */
const fetchData = () => {
	return new Promise(resolve => {
		setTimeout(() => resolve(username), 100);
	})
}

const App = () => {
	const [username, setUsername] = useState(null);

	/* first time, get data with api */
	useEffect(() => {
		fetchData().then(data => setUsername(data));
	}, [])

	return (
		<div>
			<Component username={username} />
		</div>
	)
}
```

Page renderer is worked before, server read page before.

```javascript
import fs from 'fs'
import path from 'path'
import { renderToString } from 'react-dom/server'
import App from './App'

const html = fs.readFileSync(
	path.resolve(__dirname, '../dist/index.html')
	'utf8'
)
/* preRender Page function*/
const renderPage = () => {
	const renderString = renderToString(<App />)
	const result = html
		.replace('<div id="root"></div>',
		`<div id="root">${renderToString}</div>`)
	return result;
}
/* page to html render */
for (const page of ['page', 'list']) {
	const result = renderPaeg(page)
	fs.wirteFileSync(path.resolve(__dirname, `../dist/${page}.html`))
}
/* server get pre render page */
const prerenderPage = {}
for (const page of ['page', 'list']) {
	const pageHtml = fs.readFileSync(path.resolve(__dirname, `../dist/${page}.html`), 'utf8')
	prerenderPage[page] = pageHtml
}
app.get('*', (req, res) => {
	~~~
	page = /* parse page */
	const pageHtml = ['page', 'list'].includes(page)
	? prerenderHtml[page]
	: renderPage(page)
	~~~
})
```

### Browse Caching

Whcih page less dependency of data, cache result, use it. Using `lru-cache` module, control memory and time, save & load cache.

```javascript
import lruCache from 'lruCahce'
const ssrCache = new lruCache({
	max : 100, /* max # of pages */
	maxAge : 1000 * 60; /* caching time */
})

app.get('*', (req,res) => {
	~~~
	const cacheKey = /* key like parse url */
	/* When have cache, load it */
	if (ssrCache.has(cacheKey))
	{
		res.send(ssrCache.get(cacheKey))
		return ;
	}
	~~~
	/* save cache */
	ssrCache.set(cacheKey, result);
	~~~
})
```

### Use NodeToStream

When static file is too big, use `renderToNodeStream` instead of `renderToString`. Steam start sending at first chunk made, more faster.

```javascript
import { renderToNodeString } from 'react-dom/server'

app.get('*', (req, res) => {
	~~~
	if (isPrerender)
		res.send(result)
	else
	{
		/* stream start, end setting */
		const ROOT_TEXT = '<div id="root">';
		const prefix = result.substr(
			0, result.indexOf(ROOT_TEXT + ROOT_TEXT.length)
		)
		const postfix = result.substr(prefix.length)
		res.write(prefix); //stream start
		const stream = renderToNodeStream(<App />)
		stream.pipe(res, { end : false }) //stream runing
		stream.on('end', () => {res.end(postfix)}) // end option
	}
})
```

When use Nodestream, have to cache data other way. `Transform` make it.

```javascript
import { Transform } from 'stream';
/* create caching stream function */
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

app.get('*', (req, res) => {
	~~~
	/* make cache stream */
	const cacheStream = createCacheStream(cacheKey, prefix, postfix)
	cacheStream.pipe(res);
	stream.pipe(
		cacheStream, // res => cacheStream
		{ end : false }
	);
	~~~
})
```

## Next

Next is SSR framework in react. Bunlding ssr application automatically, easy to customize with config file.

Basically, bundling wiht react, so dont need `import react`.
Command `npx next build && npx next start`, make .next directory. This consist of client bundle file & server bundle file.

### Next config & basic

Next basically has load static file like img, setting metadata, style, etc... like below.

```javascript
/* head setting module */
import Head from 'next/head'
function App() {
	return (
		<div>
			{/* Head meta setting */}
			<Head>
				<title>Next App</title>
			</Head>
			{/* image load (static file in /static )*/}
			<img src='/static/img.png'>
			{/* style set */}
			<style jsx>{`
				p {
					color : red;
				}
			`}</style>
		</div>
	)
}
```

But, when load image changed, static path is also changed for browse caching. So we'd better use `file-loader`. In next, bundling setting with next.config.js

```javascript
module.exports = {
	webpack : config => {
		config.module.rules.push({
			test : /.(png|jpg)$/,
			use : [
				{
					loader : 'file-loader',
					options : {
						/* path change when file load */
						name : '[path][name].[ext]?[hash]',
						emitFile : false,
						publicPath : '/',
					}
				}
			]
		})
		return config;
	}
}
```

### Send data from server

In next, use `getInitialProps` serving data, no need to use tricky way. `getInitialProps` called before page render.

```javascript
Page2.getInitialProps = async ({ query }) => {
	const str = query.str || 'none'
	return { str };
}

function Page2({ str }) {
	~~~
}
```

### Move to pages

Next provides `Link`, `Router` like pure react. `Link` set `href` & `Router` can use browser route function like `push` 

### Error Page

Next error page `_error.js` in pages. Any Next function possible.

## Advanced Next

### _app.js

`_app.js` is component uesd all page, like header menu. `_app.js` get props `Component`, `pageProps`. `Component` is Child page, `pageProps` is Child page's props(`getInitialProps`). 

```javascript
export default function App ({ Component, pageProps }) {
	return (
		<div>
			<Component {...pageProps}> {/* Component */}
		</div>
	)
}
```

### Code split in Next

React code split with dynamic import, Next also have. And Next split module code used in common place.

```javascript
App.getInitialProps = async () => {
	const { func } = await import('./importModule.js')
	~~~
}
```

### Using custom web server

Above Next, use basic server contained in Next. When use custom server, do somthing more like caching. Next has production or dev-server, we consider it.

```javascript
const express = require('express')
const next = require('next')

/* next setting */
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler(); //handle work in  basic next

app.prepare().then(() => {
	const server = express();

	server.get('*', (req, res) => {
		return handle(req, res)
	})

	server.listen('/* port*/', err => {
		if (err) throw err;
	})
})
```

Starting server or build and production code below.

```bash
node server.js
or
npx next build
NODE_ENV=production node server.js
```

### Browse Caching

As mentioned, custom web server can use caching. use `lru-cache` and `renderToHTML` in next. `renderToHTML` is make static html page.

```javascript
async function renderAndCache (req, res) {
	const parsedUrl = url.parse(req.url, true);
	const cacheKey = parsedUrl.path;
	if (ssrCache.has(cacheKey)) {
		res.send(ssrCache.get(cacheKey));
		return ;
	}
	try {
		const { query, pathname } = parsedUrl;
		const html = await renderToHTML(req, res, pathname, query);
		if (res.statusCode === 200) {
			ssrCache.set(cacheKey, html)
		}
		res.send(html);
	} catch (err) {
		app.renderError(err, req, res, pathname, query);
	}
}
~~
app.prepare().then(() => {
	server.get(/url pattern/, (req, res) => {
		return renderAndCache();
	})
})
```

### prerendering

Next automatically pre-render page not using `initialPageProps` to html. Futhermore, `exportPathMap` in next.config.js make custom static html pre-rendered. Command `next export`.

```javascript
module.exports = {
	/* ~~~ */
	exportPathMap : function () {
		return {
			'/page1' : { page : 'page1'},
			/* Query string in static page  */
			'/page2-hello' : { page : '/page2', query : { str : 'hello' }},
			'/page2-world' : { page : '/page2', query : { str : 'world' }}
		}
	}
}
```

But manytime, we work static file & js file. So we use render & caching change

```javascript
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
	~~~
	/* prerendering cache has  */
	if (prerenderCache.hasOwnProperty(cacheKey)) {
		res.send(prerenderCache[cacheKey]);
		return ;
	}
}
```


## ETC
### 1. winodw
**window** is javascript program global object. 
Ref. [This MDN](https://developer.mozilla.org/ko/docs/Web/API/Window)
