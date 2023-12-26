import { z } from 'zod';

export const VirtualTourValidator = z.object({
	virtualTour: z.any(),
	puraId: z.string(),
});
