import { cn } from '@/lib/utils';
import { Archivo, Lora } from 'next/font/google';
import Providers from '@/components/Providers';
import { Toaster } from '@/components/ui/Toaster';
import { TailwindIndicator } from '@/components/TailwindIndicator';

import '@/styles/globals.css';

const fontSans = Archivo({
	subsets: ['latin'],
	variable: '--font-sans',
});
const fontHeading = Lora({
	subsets: ['latin'],
	variable: '--font-heading',
});

// const fontHeading = localFont({
// 	src: '../assets/fonts/Didot.woff2',
// 	variable: '--font-heading',
// });

export const metadata = {
	title: 'SIPura',
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
			<body className='min-h-screen antialiased bg-white'>
				<Providers>
					{authModal}
					{/* <div className='container h-full pt-12 mx-auto max-w-7xl'> */}
					{children}
					{/* </div> */}
				</Providers>
				<TailwindIndicator />
				<Toaster />
			</body>
		</html>
	);
}
