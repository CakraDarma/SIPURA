import { getAuthSession } from '@/lib/auth';
import React from 'react';

const Admin = async () => {
	const session = await getAuthSession();
	if (session?.user.role !== 'PRAJURU') {
		throw new Error('You need login');
	}

	return <div className='mt-60'>Admin only page</div>;
};

export default Admin;
