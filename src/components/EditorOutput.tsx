'use client';

import CustomCodeRenderer from '@/components/renderers/CustomCodeRenderer';
import CustomImageRenderer from '@/components/renderers/CustomImageRenderer';
import dynamic from 'next/dynamic';

const Output = dynamic(
	async () => (await import('editorjs-react-renderer')).default,
	{ ssr: false }
);

interface EditorOutputProps {
	content: any;
}

const renderers = {
	image: CustomImageRenderer,
	code: CustomCodeRenderer,
};

const style = {
	paragraph: {
		fontSize: '1rem',
		fontWeight: 200,
		textAlign: 'justify',
	},
};

const EditorOutput = ({ content }: EditorOutputProps) => {
	return (
		<Output
			style={style}
			className='font-sans text-base text'
			renderers={renderers}
			data={content}
		/>
	);
};

export default EditorOutput;
