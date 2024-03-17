'use client';

import React, { useState } from 'react';
import { Calendar } from '@/components/ui/Calendar';
import { format } from 'date-fns';

const bookedDays = [new Date(2024, 2, 8), new Date(2024, 2, 9)];
const bookedStyle = { border: '2px solid currentColor' };

function KalenderBali() {
	const [booked, setBooked] = useState(false);
	const [selectedDates, setSelectedDates] = useState([
		new Date(),
		new Date(Date.now() + 86400000),
	]);

	// @ts-ignore
	const handleDayClick = (day, modifiers) => {
		setBooked(day && modifiers.booked);
	};

	const footer = booked
		? 'This day is already booked!'
		: 'Try to pick a booked day.';
	return (
		<div className='bg-red-50 w-fit'>
			<Calendar
				defaultMonth={new Date(2024, 5, 8)}
				modifiers={{ booked: bookedDays }}
				modifiersStyles={{ booked: bookedStyle }}
				onDayClick={handleDayClick}
				footer={footer}
				selected={selectedDates}
			/>
		</div>
	);
}

export default KalenderBali;
