import { z } from 'zod';

export const VirtualTourValidator = z.object({
	virtualTour: z.string(),
	puraId: z.string(),
});
