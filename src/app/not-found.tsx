import Link from 'next/link';
import React from 'react';

const NotFound = () => {
	return (
		<main className='text-center'>
			<h2 className='text-3xl'>We hit a Brick Wall</h2>
			<p>We could not find page</p>
			<p>
				Goback to all <Link href={'/'}>Homepage</Link>
			</p>
		</main>
	);
};

export default NotFound;
