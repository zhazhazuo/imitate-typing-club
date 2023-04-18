import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { ReactSVG } from 'react-svg'
import { compose, last, reduce, tap } from "ramda";

import { initEveryKey, filterLetter, initHighlightTargetKey, highlightCurrentKey } from "./logic";
import KeyboardSvg from '../../assets/keyboard-ansi.svg'
import CartoonKeyboardSvg from '../../assets/cartoon-ansi.svg'
import { KeyInfoType } from "../TypingClub";
import './index.scss'

interface IProps {
	questionsList: string[][]
	currentAnswerList: KeyInfoType[]
}

interface IDefaultProps {
	width: number
	height: number
}

type Props = IProps & Partial<IDefaultProps>

// TODO 后续由状态控制
const isLowCase = true

const Keyboard: FC<Props> = (props) => {
	const { questionsList, currentAnswerList, width = 200, height = 200 } = props
	const formatQuestionsList = reduce<string[], string[]>((acc, item) => {
		return acc.concat(item)
	}, [], questionsList)
	const targetKey = formatQuestionsList[currentAnswerList.length]

	const domRef = useRef<SVGGElement>()
	const [isInit, setIsInit] = useState(false)

	const initSVG = compose(
		tap(initHighlightTargetKey(targetKey)),
		tap(filterLetter({
			isLowCase,
		})),
		tap(initEveryKey)
	)

	const storeSVGDOM = (e: SVGGElement) => {
		domRef.current = e
		setIsInit(true)
	}

	const svgMemo = useMemo(() => <ReactSVG src={KeyboardSvg} beforeInjection={initSVG} afterInjection={storeSVGDOM} />, [])

	useEffect(() => {
		if (!isInit) return

		highlightCurrentKey({
			target: targetKey, current: last(currentAnswerList)
		}, domRef.current)
	}, [questionsList, currentAnswerList])

	return (
		<div className="keyboard">
			{svgMemo}
		</div>
	);
}

export default Keyboard;