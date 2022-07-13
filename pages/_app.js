import Head from "next/head";
import * as React from 'react';
import "../styles/global.scss";


export default function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>The Ambrose Jobboard</title>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			<Component {...pageProps} />
		</>
	);
}
