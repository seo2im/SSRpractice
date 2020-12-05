import Head from 'next/head'
import api from '../srcs/api'
import Router from 'next/router'

/* get Data from first service */
Page2.getInitialProps = async ({ query }) => {
	const { func } = await import('../srcs/SplitFunction')
	console.log(func());
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
	function onClick () {
		import('../srcs/SplitFunction').then(({ func }) => console.log(func()));
	}

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
			<button onClick={onClick}>Split Code</button>
		</div>
	)
}

export default Page2