import { EditorCreateKegiatan } from '@/components/form/EditorCreateKegiatan';
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
			id: params.puraId,
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
						di {pura.name}
					</p>
				</div>
			</div>

			{/* form */}
			<EditorCreateKegiatan puraId={pura.id} />
		</div>
	);
};

export default page;
