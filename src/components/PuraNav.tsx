'use client';

import { puraNavConfig } from '@/config/nav';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React from 'react';

export default function PuraNav() {
	const params = useParams();
	const path = usePathname();

	return (
		<div className='bg-gray-200 '>
			<div className='container flex flex-row justify-center w-full gap-12 py-3 max-w-7xl'>
				{puraNavConfig?.map((item, index) => (
					<Link
						key={index}
						href={`/pura/${params.puraId}/${item.href}`}
						className={`font-sans text-sm font-medium  
            ${
							path.includes(item.href) ? 'border-b-2 border-orange-light' : ''
						}`}
					>
						{item.title}
					</Link>
				))}
			</div>
		</div>
	);
}
