import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Select } from 'src/ui/select';
import clsx from 'clsx';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

export type TextProps = {
	/** Размер шрифта */
	fontSize: OptionType;
	/** Цвет шрифта */
	fontColor: OptionType;
	/** Фоновый цвет */
	backgroundColor: OptionType;
	/** Ширина контента */
	contentWidth: OptionType;
	/** font-family текста */
	fontFamily: OptionType;
};

export const ArticleParamsForm = (articleParamsFormProps: {
	textProps: TextProps;
	onChange: (props: TextProps) => void;
	onReset: () => void;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [fontFamily, setFontFamily] = useState(
		articleParamsFormProps.textProps.fontFamily
	);
	const [fontSize, setFontSize] = useState(
		articleParamsFormProps.textProps.fontSize
	);
	const [fontColor, setFontColor] = useState(
		articleParamsFormProps.textProps.fontColor
	);
	const [backgroundColor, setBackgroundColor] = useState(
		articleParamsFormProps.textProps.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(
		articleParamsFormProps.textProps.contentWidth
	);

	const sidebarRef = useRef<HTMLElement>(null);

	const handleButtonClick = () => {
		setIsOpen(!isOpen);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	const handleReset = () => {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		setFontSize(defaultArticleState.fontSizeOption);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		articleParamsFormProps.onChange({
			fontFamily: fontFamily,
			fontSize: fontSize,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
		});
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				handleClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleButtonClick} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						selected={fontFamily}
						onChange={setFontFamily}
						options={fontFamilyOptions}
					/>
					<RadioGroup
						name={fontSize.title}
						onChange={setFontSize}
						options={fontSizeOptions}
						selected={{
							title: fontSize.title,
							value: fontSize.value,
							className: fontSize.className,
							optionClassName: undefined,
						}}
						title={'размер шрифта'}
					/>
					<Select
						title='Цвет шрифта'
						selected={fontColor}
						onChange={setFontColor}
						options={fontColors}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={backgroundColor}
						onChange={setBackgroundColor}
						options={backgroundColors}
					/>
					<Select
						title='Ширина контента'
						selected={contentWidth}
						onChange={setContentWidth}
						options={contentWidthArr}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={articleParamsFormProps.onReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
