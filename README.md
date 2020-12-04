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

## ETC
### 1. winodw
**window** is javascript program global object. 
Ref. [This MDN](https://developer.mozilla.org/ko/docs/Web/API/Window)
