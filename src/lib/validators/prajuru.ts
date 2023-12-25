import { z } from 'zod';

export const UserRolesValidator = z.object({
	userId: z.string(),
});
