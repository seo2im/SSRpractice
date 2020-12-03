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

## ETC
### 1. winodw
**window** is javascript program global object. 
Ref. [This MDN](https://developer.mozilla.org/ko/docs/Web/API/Window)
