import type { Kegiatan, Pura, User } from '@prisma/client';

export type ExtendedPost = Kegiatan & {
	pura: Pura;
	user: User;
};
