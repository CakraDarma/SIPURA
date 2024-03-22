'use client';

import CustomCodeRenderer from '@/components/renderers/CustomCodeRenderer';
import CustomImageRenderer from '@/components/renderers/CustomImageRenderer';
import dynamic from 'next/dynamic';

const blogContentStyle = {
	header: {
		h1: {
			fontSize: '2.5rem',
			fontWeight: 'bold',
			margin: '28px 0 10px 0',
		},
		h2: {
			fontSize: '2rem',
			fontWeight: 'bold',
			margin: '28px 0 10px 0',
		},
		h3: {
			fontSize: '1.75rem',
			fontWeight: 'bold',
			margin: '28px 0 10px 0',
		},
		h4: {
			fontSize: '1.5rem',
			fontWeight: 'bold',
			margin: '28px 0 10px 0',
		},
		h5: {
			fontSize: '1.25rem',
			fontWeight: 'bold',
			margin: '28px 0 10px 0',
		},
		h6: {
			fontSize: '1rem',
			fontWeight: 'bold',
			margin: '28px 0 10px 0',
		},
	},
	list: {
		container: {
			marginLeft: '2rem',
		},
		listItem: {
			padding: '.1rem 2rem',
			listStyleType: 'disc',
			fontSize: '1.3rem',
			lineHeight: '2.4rem',
			marginBottom: '10px',
		},
	},
	paragraph: {
		fontSize: '1.3rem',
		textAlign: 'justify',
		lineHeight: '2.4rem',
		marginBottom: '18px',
	},
};

const blogContentConfig = {
	header: {
		disableDefaultStyle: true,
	},
	paragraph: {
		disableDefaultStyle: true,
	},
	list: {
		disableDefaultStyle: true,
	},
};

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

const EditorOutput = ({ content }: EditorOutputProps) => {
	return (
		<Output
			style={blogContentStyle}
			config={blogContentConfig}
			renderers={renderers}
			data={content}
		/>
	);
};

export default EditorOutput;
