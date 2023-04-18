import { useEffect, useState, FC, useRef } from 'react'

import { throttle } from '../../common/utils'
import Teleprompter from '../Teleprompter'
import Keyboard from '../Keyboard'
import './index.scss'

const disableEvent = (e: KeyboardEvent) => {
  e.defaultPrevented
  e.stopPropagation()
}

export type KeyInfoType = Pick<KeyboardEvent, 'code' | 'key'>

interface IProps {
  questionsList: string[][]
}

interface IDefaultProps { }

type Props = IProps & Partial<IDefaultProps>

const TypingClub: FC<Props> = ({ questionsList }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [currentKeyList, setCurrentKeyList] = useState<KeyInfoType[]>([])

  const throttleHandle = throttle((e: KeyboardEvent) => {
    disableEvent(e)
    setCurrentKeyList(v => v.concat([{
      code: e.code,
      key: e.key
    }]))
  })

  const reFocusInput = () => {
    if (!inputRef.current) return
    inputRef.current.focus()
  }

  useEffect(() => {
    document.addEventListener('keydown', throttleHandle)
    document.addEventListener('keyup', disableEvent)
    document.addEventListener('keypress', disableEvent)
  }, [])

  useEffect(() => {
    if (currentKeyList.length === questionsList.reduce((acc, item) => acc.concat(item), []).length) {
      console.log('DONE!')
    }
  }, [currentKeyList])

  useEffect(() => {
    if (!inputRef.current) return
    inputRef.current.focus()
  }, [])

  return (
    <div className="typing-club">
      {/* 提词器区域 */}
      <div className='typing-club__teleprompter'>
        <Teleprompter questionsList={questionsList} currentAnswerList={currentKeyList} />
      </div>
      {/* 键盘区域 */}
      <div className='typing-club__keyboard'>
        <Keyboard questionsList={questionsList} currentAnswerList={currentKeyList} />
      </div>
      {/* 隐式 Input 元素，收集 focus */}
      <input className="typing-club__input" ref={inputRef} type="text" autoComplete="off" autoCorrect="off" autoCapitalize="off" autoFocus={true} aria-hidden="true" />
      {/* 隐式 Mask 元素，收集 focus */}
      <div className='typing-club__mask' onClick={reFocusInput} />
    </div>
  )
}

export default TypingClub