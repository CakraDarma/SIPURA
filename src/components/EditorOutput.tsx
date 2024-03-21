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
		fontSize: '1.3rem',
		// fontWeight: 200,
		textAlign: 'justify',
		lineHeight: '2.4rem',
		marginBottom: '18px',
	},
};

const EditorOutput = ({ content }: EditorOutputProps) => {
	return <Output style={style} renderers={renderers} data={content} />;
};

export default EditorOutput;
