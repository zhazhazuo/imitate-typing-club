import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { ReactSVG } from 'react-svg'
import { compose, tap } from "ramda";

import { initEveryKey, filterLetter, highlightTagetKey, highlightCurretnKey } from "./logic";
import KeyboardSvg from '../../assets/keyboard-ansi.svg'
import './index.scss'

interface IProps {
	targetKey: string
}

interface IDefaultProps {
	width: number
	height: number
	currentKey: string
}

type Props = IProps & Partial<IDefaultProps>

// TODO 后续由状态控制
const isLowCase = true

const Keyboard: FC<Props> = (props) => {
	const { targetKey, width = 200, height = 200, currentKey } = props

	const domRef = useRef<SVGGElement>()
	const [isInit, setIsInit] = useState(false)

	const initSVG = compose(
		tap(highlightTagetKey(targetKey)),
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

		highlightCurretnKey({
			target: targetKey, current: currentKey
		}, domRef.current)
	}, [targetKey, currentKey])

	return (
		<div className="keyboard">
			{svgMemo}
		</div>
	);
}

export default Keyboard;