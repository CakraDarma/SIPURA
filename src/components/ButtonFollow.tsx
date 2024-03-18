'use client';

import { useState, useEffect } from 'react';

interface ButtonFollowProps {
	puraId: string;
}

const ButtonFollow = ({ puraId }: ButtonFollowProps) => {
	const [isFollowed, setIsFollowed] = useState(false);
	const defaultReminderDuration = 7;

	useEffect(() => {
		const savedDataString: string | null = localStorage.getItem(
			'piodalanNotifications'
		);
		const savedData: { ids: string[]; reminder: number } = savedDataString
			? JSON.parse(savedDataString)
			: { ids: [], reminder: defaultReminderDuration };

		if (savedData.ids.includes(puraId)) {
			setIsFollowed(true);
		}
	}, [puraId]);

	const handleFollowClick = () => {
		const savedDataString: string | null = localStorage.getItem(
			'piodalanNotifications'
		);
		const savedData: { ids: string[]; reminder: number } = savedDataString
			? JSON.parse(savedDataString)
			: { ids: [], reminder: defaultReminderDuration };

		if (!isFollowed) {
			savedData.ids.push(puraId);
			localStorage.setItem('piodalanNotifications', JSON.stringify(savedData));
			setIsFollowed(true);
		} else {
			const index = savedData.ids.indexOf(puraId);
			if (index !== -1) {
				savedData.ids.splice(index, 1);
				localStorage.setItem(
					'piodalanNotifications',
					JSON.stringify(savedData)
				);
				setIsFollowed(false);
			}
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
