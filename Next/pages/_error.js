ErrorPage.getInitialProps = ({ res, err }) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : null;
	return { statusCode }
}

export default function ErrorPage({ statusCode }) {
	return (
		<div>
			{statusCode === 404 && 'No Page with 404'}
		</div>
	)
}