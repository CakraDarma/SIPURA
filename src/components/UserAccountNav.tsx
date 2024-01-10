'use client';

import Link from 'next/link';
import { User } from 'next-auth';
import { signOut } from 'next-auth/react';
import { userNavConfig } from '@/config/userNav';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { UserAvatar } from '@/components/UserAvatar';

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
	// pick is utility typescript
	user: Pick<User, 'name' | 'image' | 'email'>;
}

export const UserAccountNav = ({ user }: UserAccountNavProps) => {
	const notificationCount = 1;
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<UserAvatar
					user={{ name: user.name || null, image: user.image || null }}
					className='w-8 h-8'
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='bg-white' align='end'>
				<div className='flex items-center justify-start gap-2 p-2'>
					<div className='flex flex-col space-y-1 leading-none'>
						{user.name && <p className='font-medium'>{user.name}</p>}
						{user.email && (
							<p className='w-[200px] truncate text-sm text-muted-foreground'>
								{user.email}
							</p>
						)}
					</div>
				</div>
				<DropdownMenuSeparator />

				{userNavConfig?.map((item, index) => (
					<DropdownMenuItem asChild key={index}>
						<Link href={item.href}>{item.title}</Link>
					</DropdownMenuItem>
				))}
				<DropdownMenuItem>
					<Link
						href={'/dashboard/pura/confirm-pura'}
						className='flex flex-row justify-between w-full'
					>
						<div className='flex flex-row justify-between w-full '>
							<p>Konfirmasi Pura</p>
							{notificationCount > 0 && (
								<div className='flex items-center justify-center w-5 h-5 text-white bg-red-500 rounded-full '>
									<p className='text-[9px] '>{notificationCount}</p>
								</div>
							)}
						</div>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className='cursor-pointer'
					onSelect={(event) => {
						event.preventDefault();
						signOut({
							callbackUrl: `${window.location.origin}/sign-in`,
						});
					}}
				>
					Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
