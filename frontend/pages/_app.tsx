import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';

import 'styles/globals.css';
import { Navbar } from 'components/Navbar';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<div className='relative'>
			<UserProvider>
				<Navbar />
				<div className='max-w-7xl mx-auto py-4 px-2 sm:px-6 lg:px-8'>
					<Component {...pageProps} />
				</div>
			</UserProvider>
		</div>
	);
}

export default MyApp;
