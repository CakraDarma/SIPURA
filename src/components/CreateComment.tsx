'use client';

import { Button } from '@/components/ui/Button';
import { toast } from '@/hooks/use-toast';
import { CommentRequest } from '@/lib/validators/comment';

import { useCustomToasts } from '@/hooks/use-custom-toasts';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';

interface CreateCommentProps {
	kegiatanId: string;
	replyToId?: string;
}

const CreateComment = ({ kegiatanId, replyToId }: CreateCommentProps) => {
	const [input, setInput] = useState<string>('');
	const router = useRouter();
	const { loginToast } = useCustomToasts();

	const { mutate: comment, isLoading } = useMutation({
		mutationFn: async ({ kegiatanId, text, replyToId }: CommentRequest) => {
			const payload: CommentRequest = { kegiatanId, text, replyToId };

			const { data } = await axios.patch(
				`/api/pura/kegiatan/comment/`,
				payload
			);
			return data;
		},

		onError: (err) => {
			if (err instanceof AxiosError) {
				if (err.response?.status === 401) {
					return loginToast();
				}
			}

			return toast({
				title: 'Terjadi kesalahan.',
				description: "Comment wasn't created successfully. Please try again.",
				variant: 'destructive',
			});
		},
		onSuccess: () => {
			router.refresh();
			setInput('');
		},
	});

	return (
		<div className='grid w-full gap-1.5'>
			<Label htmlFor='comment'>Your comment</Label>
			<div className='mt-2'>
				<Textarea
					id='comment'
					value={input}
					onChange={(e) => setInput(e.target.value)}
					rows={1}
					placeholder='What are your thoughts?'
				/>

				<div className='mt-2 flex justify-end'>
					<Button
						isLoading={isLoading}
						disabled={input.length === 0}
						onClick={() => comment({ kegiatanId, text: input, replyToId })}
					>
						Kegiatan
					</Button>
				</div>
			</div>
		</div>
	);
};

export default CreateComment;
