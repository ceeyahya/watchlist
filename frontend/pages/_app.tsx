import { useState } from 'react';
import {
	Hydrate,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';

import 'styles/globals.css';
import { Navbar } from 'components/Navbar';

function MyApp({ Component, pageProps }: AppProps) {
	const [queryClient] = useState(() => new QueryClient());
	return (
		<div className='relative'>
			<UserProvider>
				<Navbar />
				<div className='max-w-7xl mx-auto py-4 px-2 sm:px-6 lg:px-8'>
					<QueryClientProvider client={queryClient}>
						<Hydrate state={pageProps.dehydratedState}>
							<Component {...pageProps} />
						</Hydrate>
						<ReactQueryDevtools initialIsOpen={false} />
					</QueryClientProvider>
				</div>
			</UserProvider>
		</div>
	);
}

export default MyApp;
