import React from 'react'

function Home ({ username }) {
	return (
		<div>
			<h1>Home Page</h1>
			{username && <p>`Hello! ${username}`</p>}
		</div>
	)
}

export default Home;