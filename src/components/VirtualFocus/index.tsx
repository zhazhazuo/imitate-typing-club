import React, { FC, Fragment, useEffect, useRef } from "react"
import './index.scss'

interface IProps {

}

interface IDefaultProps {

}

type Props = IProps & Partial<IDefaultProps>

const VirtualFocus: FC<Props> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const reFocusInput = () => {
    if (!inputRef.current) return
    inputRef.current.focus()
  }

  useEffect(() => {
    if (!inputRef.current) return
    inputRef.current.focus()
  }, [])

  return (
    <Fragment>
      {/* 隐式 Input 元素，收集 focus */}
      <input className="virtual-focus__input" ref={inputRef} type="text" autoComplete="off" autoCorrect="off" autoCapitalize="off" autoFocus={true} aria-hidden="true" />
      {/* 隐式 Mask 元素，收集 focus */}
      <div className='virtual-focus__mask' onClick={reFocusInput} />
    </Fragment>
  )
}

export default VirtualFocus