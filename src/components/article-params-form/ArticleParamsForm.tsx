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
	size: OptionType;
	/** Цвет шрифта */
	color: OptionType;
	/** Фоновый цвет */
	backgroundColor: OptionType;
	/** Ширина контента */
	contentWidth: OptionType;
	/** font-family текста */
	font: OptionType;
};

export const ArticleParamsForm = (props: {
	textProps: TextProps;
	onChange: (props: TextProps) => void;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [font, setFont] = useState(props.textProps.font);
	const [size, setSize] = useState(props.textProps.size);
	const [color, setColor] = useState(props.textProps.color);
	const [backgroundColor, setBackgroundColor] = useState(
		props.textProps.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(
		props.textProps.contentWidth
	);

	const sidebarRef = useRef<HTMLElement>(null);

	const hendleButtonClick = () => {
		setIsOpen(!isOpen);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isOpen &&
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
			<ArrowButton isOpen={isOpen} onClick={hendleButtonClick} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={font}
						onChange={setFont}
						options={fontFamilyOptions}
					/>
					<RadioGroup
						name={size.title}
						onChange={setSize}
						options={fontSizeOptions}
						selected={{
							title: size.title,
							value: size.value,
							className: size.className,
							optionClassName: undefined,
						}}
						title={'размер шрифта'}
					/>
					<Select
						title='Цвет шрифта'
						selected={color}
						onChange={setColor}
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
							onClick={(e) => {
								e.preventDefault();
								setFont(defaultArticleState.fontFamilyOption);
								setColor(defaultArticleState.fontColor);
								setBackgroundColor(defaultArticleState.backgroundColor);
								setContentWidth(defaultArticleState.contentWidth);
								setSize(defaultArticleState.fontSizeOption);
							}}
						/>
						<Button
							onClick={(e) => {
								e.preventDefault();
								props.onChange({
									font: font,
									size: size,
									color: color,
									backgroundColor: backgroundColor,
									contentWidth: contentWidth,
								});
								return false;
							}}
							title='Применить'
							htmlType='submit'
							type='apply'
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
