import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';
import { Open_Sans } from 'next/font/google';
import localFont from 'next/font/local';
import Providers from '@/components/Providers';
import { Toaster } from '@/components/ui/Toaster';
import { TailwindIndicator } from '@/components/tailwind-indicator';

import '@/styles/globals.css';

const fontSans = Open_Sans({
	subsets: ['latin'],
	variable: '--font-sans',
});

const fontHeading = localFont({
	src: '../assets/fonts/Didot.woff2',
	variable: '--font-heading',
});

export const metadata = {
	title: 'SIPURA',
	description: 'Sistem Informasi Pura Beserta Virtual Tour Pura',
};

export default function RootLayout({
	children,
	authModal,
}: {
	children: React.ReactNode;
	authModal: React.ReactNode;
}) {
	return (
		<html
			lang='en'
			className={cn(
				'bg-white text-slate-900 antialiased light',
				fontSans.variable,
				fontHeading.variable
			)}
		>
			<body className='min-h-screen bg-white antialiased'>
				<Providers>
					{/* <Navbar /> */}
					{authModal}
					{/* <div className='container max-w-7xl mx-auto h-full pt-12'> */}
					{children}
					{/* </div> */}
					{/* <Footer /> */}
				</Providers>
				<TailwindIndicator />
				<Toaster />
			</body>
		</html>
	);
}
