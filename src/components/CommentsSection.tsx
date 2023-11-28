import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { Comment, CommentVote, User } from '@prisma/client';
import CreateComment from './CreateComment';
import PostComment from './comments/PostComment';

type ExtendedComment = Comment & {
	votes: CommentVote[];
	user: User;
	replies: ReplyComment[];
};

type ReplyComment = Comment & {
	votes: CommentVote[];
	user: User;
};

interface CommentsSectionProps {
	kegiatanId: string;
	comments: ExtendedComment[];
}

const CommentsSection = async ({ kegiatanId }: CommentsSectionProps) => {
	const session = await getAuthSession();

	const comments = await db.comment.findMany({
		where: {
			kegiatanId: kegiatanId,
			replyToId: null, // only fetch top-level comments
		},
		include: {
			user: true,
			votes: true,
			replies: {
				// first level replies
				include: {
					user: true,
					votes: true,
				},
			},
		},
	});

	return (
		<div className='flex flex-col gap-y-4 mt-4'>
			<hr className='w-full h-px my-6' />

			<CreateComment kegiatanId={kegiatanId} />

			<div className='flex flex-col gap-y-6 mt-4'>
				{comments
					.filter((comment) => !comment.replyToId)
					// toplecelcomment isi dari tb comment plus joinjoinnanya
					.map((topLevelComment) => {
						const topLevelCommentVotesAmt = topLevelComment.votes.reduce(
							(acc, vote) => {
								if (vote.type === 'UP') return acc + 1;
								if (vote.type === 'DOWN') return acc - 1;
								return acc;
							},
							0
						);

						const topLevelCommentVote = topLevelComment.votes.find(
							(vote) => vote.userId === session?.user.id
						);
						// console.log(topLevelComment);

						return (
							<div key={topLevelComment.id} className='flex flex-col'>
								<div className='mb-2'>
									<PostComment
										comment={topLevelComment}
										currentVote={topLevelCommentVote}
										votesAmt={topLevelCommentVotesAmt}
										kegiatanId={kegiatanId}
									/>
								</div>

								{/* Render replies */}
								{topLevelComment.replies
									.sort((a, b) => b.votes.length - a.votes.length) // Sort replies by most liked
									.map((reply) => {
										const replyVotesAmt = reply.votes.reduce((acc, vote) => {
											if (vote.type === 'UP') return acc + 1;
											if (vote.type === 'DOWN') return acc - 1;
											return acc;
										}, 0);

										const replyVote = reply.votes.find(
											(vote) => vote.userId === session?.user.id
										);

										return (
											<div
												key={reply.id}
												className='ml-2 py-2 pl-4 border-l-2 border-zinc-200'
											>
												<PostComment
													comment={reply}
													currentVote={replyVote}
													votesAmt={replyVotesAmt}
													kegiatanId={kegiatanId}
												/>
											</div>
										);
									})}
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default CommentsSection;
