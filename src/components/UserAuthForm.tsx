'use client';

import { signIn } from 'next-auth/react';
import * as React from 'react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/hooks/use-toast';
import { Icons } from '@/components/icons';

const UserAuthForm = () => {
	const { toast } = useToast();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const loginWithGoogle = async () => {
		setIsLoading(true);

		try {
			await signIn('google');
		} catch (error) {
			toast({
				title: 'Error',
				description: 'Terjadi kesalahan login menggunakan Google',
				variant: 'destructive',
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Button
			isLoading={isLoading}
			type='button'
			variant={'outline'}
			onClick={loginWithGoogle}
			disabled={isLoading}
		>
			{isLoading ? null : <Icons.google className='h-4 w-4 mr-2' />}
			Google
		</Button>
	);
};

export default UserAuthForm;
