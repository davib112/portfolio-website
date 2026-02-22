import type { AppProps } from "next/app";
import "../styles.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function MyApp({ Component, pageProps }: AppProps) {

	let backgroundPath: string = `${basePath}/media/test/limestone.jpg`
	return (
		<div style={{ '--background-path': `url(${backgroundPath})` } as React.CSSProperties}>
			<Component {...pageProps} />
		</div>

	);
}
