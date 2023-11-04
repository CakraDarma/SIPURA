import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface HomepageProps {
	children: React.ReactNode;
}

export default function HomepageLayout({ children }: HomepageProps) {
	return (
		<>
			{/* @ts-expect-error Server Component */}
			<Navbar />
			{children}
			<Footer />
		</>
	);
}
