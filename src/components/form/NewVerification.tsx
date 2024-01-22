'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { newVerification } from '@/actions/new-verification';
import { BeatLoader } from 'react-spinners';

import { CheckCircledIcon } from '@radix-ui/react-icons';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface SignInProps extends React.HTMLAttributes<HTMLDivElement> {}

function NewVerification({ className, ...props }: SignInProps) {
	const searchParams = useSearchParams();
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();

	const token = searchParams.get('token');

	const onSubmit = useCallback(() => {
		if (success || error) return;

		if (!token) {
			setError('Token tidak tersedia!');
			return;
		}

		newVerification(token)
			.then((data) => {
				if (data.success) {
					setSuccess(data.success);
				} else {
					setError(data.error);
				}
			})
			.catch(() => {
				setError('Something went wrong!');
			});
	}, [token, success, error]);

	useEffect(() => {
		onSubmit();
	}, [onSubmit]);

	return (
		<div className={cn('grid gap-6', className)} {...props}>
			<form onSubmit={onSubmit}>
				<div className='grid gap-2'>
					<div className='flex items-center justify-center w-full'>
						{!success && !error && <BeatLoader />}
					</div>
					{success && !error && (
						<div className='flex items-center p-3 text-sm rounded-md bg-emerald-500/15 gap-x-2 text-emerald-500'>
							<CheckCircledIcon className='w-8 h-8' />
							<p className='text-xl'>{success}</p>
						</div>
					)}
					{!success && error && (
						<div className='flex items-center p-3 text-sm rounded-md bg-destructive/15 gap-x-2 text-destructive'>
							<ExclamationTriangleIcon className='w-8 h-8' />
							<p className='text-xl'>{error}</p>
						</div>
					)}
				</div>
			</form>
			<div className='relative'>
				<div className='absolute inset-0 flex items-center'>
					<span className='w-full border-t' />
				</div>
				<div className='relative flex justify-center text-xs uppercase'>
					<a
						className='px-2 text-base underline bg-background text-muted-foreground underline-offset-4 hover:text-primary'
						href={'/sign-in'}
					>
						Kembali ke Login
					</a>
				</div>
			</div>
		</div>
	);
}

export default NewVerification;
