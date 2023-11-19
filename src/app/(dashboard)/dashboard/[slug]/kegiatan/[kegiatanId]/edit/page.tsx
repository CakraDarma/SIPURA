import { notFound, redirect } from 'next/navigation';
import { Kegiatan, User } from '@prisma/client';

import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';
// import { Editor } from '@/components/editor';

async function getPostForUser(postId: Kegiatan['id'], userId: User['id']) {
	return await db.kegiatan.findFirst({
		where: {
			id: postId,
			authorId: userId,
		},
	});
}

interface EditorPageProps {
	params: { postId: string };
}

export default async function EditorPage({ params }: EditorPageProps) {
	const session = await getAuthSession();

	if (!session) {
		redirect(authOptions?.pages?.signIn || '/login');
	}

	const post = await getPostForUser(params.postId, session.user.id);

	if (!post) {
		notFound();
	}

	return (
		// <Editor
		// 	post={{
		// 		id: post.id,
		// 		title: post.title,
		// 		content: post.content,
		// 		published: post.published,
		// 	}}
		// />
		<h1>tol</h1>
	);
}
