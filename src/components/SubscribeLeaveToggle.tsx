// 'use client';
// import { Button } from '@/components/ui/Button';
// import { SubscribeToSubredditPayload } from '@/lib/validators/pura';
// import { useMutation } from '@tanstack/react-query';
// import axios, { AxiosError } from 'axios';
// import { useRouter } from 'next/navigation';
// import { startTransition } from 'react';
// import { useToast } from '@/hooks/use-toast';
// import { useCustomToasts } from '@/hooks/use-custom-toasts';

// interface SubscribeLeaveToggleProps {
// 	isSubscribed: boolean;
// 	puraId: string;
// 	puraName: string;
// }

// const SubscribeLeaveToggle = ({
// 	isSubscribed,
// 	puraId,
// 	puraName,
// }: SubscribeLeaveToggleProps) => {
// 	const { toast } = useToast();
// 	const { loginToast } = useCustomToasts();
// 	const router = useRouter();

// 	const { mutate: subscribe, isPending: isSubLoading } = useMutation({
// 		mutationFn: async () => {
// 			const payload: SubscribeToSubredditPayload = {
// 				puraId,
// 			};

// 			const { data } = await axios.post('/api/pura/subscribe', payload);
// 			return data as string;
// 		},
// 		onError: (err) => {
// 			if (err instanceof AxiosError) {
// 				if (err.response?.status === 401) {
// 					return loginToast();
// 				}
// 			}

// 			return toast({
// 				title: 'There was a problem.',
// 				description: 'Terjadi kesalahan. Please try again.',
// 				variant: 'destructive',
// 			});
// 		},
// 		onSuccess: () => {
// 			startTransition(() => {
// 				// Refresh the current route and fetch new data from the server without
// 				// losing client-side browser or React state.
// 				router.refresh();
// 			});
// 			toast({
// 				title: 'Subscribed!',
// 				description: `You are now subscribed to r/${puraName}`,
// 			});
// 		},
// 	});

// 	const { mutate: unsubscribe, isPending: isUnsubLoading } = useMutation({
// 		mutationFn: async () => {
// 			const payload: SubscribeToSubredditPayload = {
// 				puraId,
// 			};

// 			const { data } = await axios.post('/api/pura/unsubscribe', payload);
// 			return data as string;
// 		},
// 		onError: (err: AxiosError) => {
// 			toast({
// 				title: 'Error',
// 				description: err.response?.data as string,
// 				variant: 'destructive',
// 			});
// 		},
// 		onSuccess: () => {
// 			startTransition(() => {
// 				// Refresh the current route and fetch new data from the server without
// 				// losing client-side browser or React state.
// 				router.refresh();
// 			});
// 			toast({
// 				title: 'Unsubscribed!',
// 				description: `You are now unsubscribed from/${puraName}`,
// 			});
// 		},
// 	});

// 	return isSubscribed ? (
// 		<Button
// 			className='w-full mt-1 mb-4'
// 			isLoading={isUnsubLoading}
// 			onClick={() => unsubscribe()}
// 		>
// 			Leave community
// 		</Button>
// 	) : (
// 		<Button
// 			className='w-full mt-1 mb-4'
// 			isLoading={isSubLoading}
// 			onClick={() => subscribe()}
// 		>
// 			Join to kegiatan
// 		</Button>
// 	);
// };

// export default SubscribeLeaveToggle;
