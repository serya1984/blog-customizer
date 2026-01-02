import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import { Article } from './components/article/Article';
import {
	ArticleParamsForm,
	TextProps,
} from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';
import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const defaultParamsProps: TextProps = {
		fontFamily: defaultArticleState.fontFamilyOption,
		fontSize: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		backgroundColor: defaultArticleState.backgroundColor,
		contentWidth: defaultArticleState.contentWidth,
	} as TextProps;

	const [paramsProps, setParamsProps] = useState(defaultParamsProps);

	const handleReset = () => {
		setParamsProps(defaultParamsProps);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': paramsProps.fontFamily.value,
					'--font-size': paramsProps.fontSize.value,
					'--font-color': paramsProps.fontColor.value,
					'--container-width': paramsProps.contentWidth.value,
					'--bg-color': paramsProps.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				textProps={paramsProps}
				onChange={setParamsProps}
				onReset={handleReset}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
