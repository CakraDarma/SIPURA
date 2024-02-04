import { EditorCreateKegiatan } from '@/components/form/EditorCreateKegiatan';
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
			{/* form */}
			<EditorCreateKegiatan puraId={pura.id} />
		</div>
	);
};

export default page;
