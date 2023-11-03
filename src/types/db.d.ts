import type { Kegiatan, Pura, User, Vote, Comment } from '@prisma/client';

export type ExtendedPost = Kegiatan & {
	pura: Pura;
	votes: Vote[];
	author: User;
	comments: Comment[];
};
