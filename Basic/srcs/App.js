import React, { useState, useEffect } from 'react'
import Home from './Home'
import About from './About'

function App ({ firstPage }) {
	const [ page, setPage ] = useState(firstPage);

	useEffect(() => {
		/* onpopstate is event handle when history change(pagination) */
		window.onpopstate = event => {
			setPage(event.state);
		}
	}, []);

	function OnChange (e) {
		const newPage = e.target.dataset.page;
		window.history.pushState(newPage, '', `/${newPage}`);
		setPage(newPage);
	}

	const PageComponent = page === 'home' ? Home : About;

	return (
		<div>
			<button data-page="home" onClick={OnChange}>
				Home
			</button>
			<button data-page="about" onClick={OnChange}>
				About
			</button>
			<PageComponent/>
		</div>
	)
}

export default App;