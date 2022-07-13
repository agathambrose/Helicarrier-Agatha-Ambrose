import Head from "next/head";
import * as React from 'react';
export default function MyApp({ Component, pageProps }) {

  return (
		<>
			<div className="App">
				<Head>
					<title>The Ambrose Jobboard</title>
					<meta name="viewport" content="initial-scale=1, width=device-width" />
				</Head>
				<Component {...pageProps} />
			</div>
		</>
	);
}
