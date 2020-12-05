import Link from 'next/link'
/*
	_app.js is parent of Component
	Component is page component, pageProps is components props(getInitialProps)
*/
export default function MyApp({Component, pageProps}) {
	return (
		<div>
			<Link href="/page1">
				<a>page1</a>
			</Link>
			<Link href="/page2">
				<a>page2</a>
			</Link>
			<Component {...pageProps} />
		</div>
	)
}