'use client';

import Image from 'next/image';

const CustomImageRenderer = ({ data }: any) => {
	const src = data.file.url;

	return (
		<div className='relative w-full min-h-[15rem] border-[1px] border-gray-700 my-3'>
			<Image alt='image' className='object-contain' fill src={src} />
		</div>
	);
};

export default CustomImageRenderer;
