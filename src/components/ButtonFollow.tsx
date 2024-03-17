'use client';

import { useState, useEffect } from 'react';

interface ButtonFollowProps {
	puraId: string;
}

const ButtonFollow = ({ puraId }: ButtonFollowProps) => {
	const [isFollowed, setIsFollowed] = useState(false);

	useEffect(() => {
		const savedPurasString: string | null = localStorage.getItem('savedPuras');
		const savedPuras: string[] = savedPurasString
			? JSON.parse(savedPurasString)
			: [];
		setIsFollowed(savedPuras.includes(puraId));
	}, []);

	const handleFollowClick = () => {
		const savedPurasString: string | null = localStorage.getItem('savedPuras');
		const savedPuras: string[] = savedPurasString
			? JSON.parse(savedPurasString)
			: [];

		if (!isFollowed) {
			savedPuras.push(puraId);
			localStorage.setItem('savedPuras', JSON.stringify(savedPuras));
			setIsFollowed(true);
		} else {
			const updatedPuras = savedPuras.filter((id) => id !== puraId);
			localStorage.setItem('savedPuras', JSON.stringify(updatedPuras));
			setIsFollowed(false);
		}
	};

	return (
		<button
			className='flex flex-row items-center justify-center gap-1 px-2 py-1 text-xs tracking-wide text-center text-white transition-colors duration-200 transform rounded-md font-extralight bg-orange-dark w-fit hover:bg-orange-light'
			onClick={handleFollowClick}
		>
			{isFollowed ? 'Hapus' : 'Ingatkan'}
		</button>
	);
};

export default ButtonFollow;
