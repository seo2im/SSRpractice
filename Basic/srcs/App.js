import React, { useState, useEffect } from 'react'
import Home from './Home'
import About from './About'

const App = ({ page }) => {
	const [ page, setPage ] = useState(page);

	useEffect(() => {
		window.onpopstate = event => {
			setPage(event.state);
		}
	})

	const OnChange = e => {
		
	}
}