import { Editor2 } from '@/components/Editor2';
import { Button } from '@/components/ui/Button';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';

interface pageProps {
	params: {
		puraId: string;
	};
}

const page = async ({ params }: pageProps) => {
	const pura = await db.pura.findFirst({
		where: {
			name: params.puraId,
		},
	});

	if (!pura) return notFound();

	return (
		<div className='flex flex-col items-start gap-6'>
			{/* heading */}
			<div className='border-b border-gray-200 pb-5'>
				<div className='-ml-2 -mt-2 flex flex-wrap items-baseline'>
					<h3 className='ml-2 mt-2 text-base font-semibold leading-6 text-gray-900'>
						Buat postingan
					</h3>
					<p className='ml-2 mt-1 truncate text-sm text-gray-500'>
						di {params.puraId}
					</p>
				</div>
			</div>

			{/* form */}
			<Editor2 puraId={pura.id} />

			<div className='w-full flex justify-end'>
				<Button type='submit' className='w-full' form='pura-kegiatan-form'>
					Kegiatan
				</Button>
			</div>
		</div>
	);
};

export default page;
