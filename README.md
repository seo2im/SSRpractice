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

## ETC
### 1. winodw
**window** is javascript program global object. 
Ref. [This MDN](https://developer.mozilla.org/ko/docs/Web/API/Window)
