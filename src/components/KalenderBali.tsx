'use client';

import React from 'react';
import { Calendar } from '@/components/ui/Calendar';

function KalenderBali() {
	const [date, setDate] = React.useState<Date | undefined>(new Date());
	return (
		<div>
			<Calendar
				mode='single'
				selected={date}
				onSelect={setDate}
				className='border rounded-md'
			/>
		</div>
	);
}

export default KalenderBali;
