import profile from '../static/profile.jpg'
import Head from 'next/head'
import Link from 'next/link'

function Page1() {
	return (
		<div>
			<p>Next Start</p>
			<Link href='/page2'>
				<a>To Page2</a>
			</Link>
			<img src={profile}/>
			<Head>
				<title>page1</title>
			</Head>
			<Head>
				<meta nema="description" content="hello world"/>
			</Head>
			<style jsx>{
				`p {
					color : blue;
					font-size : 18pt;
				}`
			}</style>
		</div>
	)
}

export default Page1