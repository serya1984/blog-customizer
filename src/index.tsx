import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';
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
	const [props, setProps] = useState({
		font: defaultArticleState.fontFamilyOption,
		size: defaultArticleState.fontSizeOption,
		color: defaultArticleState.fontColor,
		backgroundColor: defaultArticleState.backgroundColor,
		contentWidth: defaultArticleState.contentWidth,
	} as TextProps);
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': props.font.value,
					'--font-size': props.size.value,
					'--font-color': props.color.value,
					'--container-width': props.contentWidth.value,
					'--bg-color': props.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm textProps={props} onChange={setProps} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
