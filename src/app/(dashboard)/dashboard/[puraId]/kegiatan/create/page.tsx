import { EditorCreateKegiatan } from '@/components/EditorCreateKegiatan';
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
			<div className='pb-5 border-b border-gray-200'>
				<div className='flex flex-wrap items-baseline -mt-2 -ml-2'>
					<h3 className='mt-2 ml-2 text-base font-semibold leading-6 text-gray-900'>
						Buat postingan
					</h3>
					<p className='mt-1 ml-2 text-sm text-gray-500 truncate'>
						di {params.puraId}
					</p>
				</div>
			</div>

			{/* form */}
			<EditorCreateKegiatan puraId={pura.id} />

			<div className='flex justify-end w-full'>
				<Button type='submit' className='w-full' form='pura-kegiatan-form'>
					Kegiatan
				</Button>
			</div>
		</div>
	);
};

export default page;
