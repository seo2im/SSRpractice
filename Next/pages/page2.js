import Head from 'next/head'
import api from '../srcs/api'
import Router from 'next/router'

/* get Data from first service */
Page2.getInitialProps = async ({ query }) => {
	const str = query.str || 'none'
	const data = await api();
	return { str, data };
}
/*
	This also possible other request like HTTP

Page2.getInitialProps = async ({ req }) => {
	req.header ...
}
*/

function Page2({str, data}) {
	return (
		<div>
			<Head>
				<title>page2</title>
			</Head>
			<Head>
				<meta nema="description" content="hello world"/>
			</Head>
			<p>{str}</p>
			<p>{data}</p>
			<button onClick={() => Router.push('/page1')}>To page1</button>
		</div>
	)
}

export default Page2