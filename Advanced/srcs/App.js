import React, { useState, useEffect } from 'react'
import Home from './Home'
import About from './About'
import profile from './profile.jpg'


function fetchUsername () {
	const usernames = ['lim', '2im', '3im'];
	return new Promise(resolve => {
		const username = usernames[Math.random() * 3];
		setTimeout(() => resolve(username,), 100);
	})
}

function App ({ firstPage }) {
	const [ page, setPage ] = useState(firstPage);
	const [ username, setUsername ] = useState(null);

	useEffect(() => {
		/* onpopstate is event handle when history change(pagination) */
		window.onpopstate = event => {
			setPage(event.state);
		}
	}, []);

	useEffect(() => {
		fetchUsername().then(data => setUsername(data));
	}, []);

	function OnChange (e) {
		const newPage = e.target.dataset.page;
		window.history.pushState(newPage, '', `/${newPage}`);
		setPage(newPage);
	}

	const PageComponent = (page === 'home' || page === '') ? Home : About;

	return (
		<div>
			<img src={profile} />
			<button data-page="home" onClick={OnChange}>
				Home
			</button>
			<button data-page="about" onClick={OnChange}>
				About
			</button>
			<PageComponent username={username}/>
		</div>
	)
}

export default App;