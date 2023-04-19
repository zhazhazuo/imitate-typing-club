import { FC } from 'react'

import Teleprompter from '../Teleprompter'
import Keyboard from '../Keyboard'
import VirtualFocus from '../VirtualFocus'
import { useManageUserKeyEvent } from './logic'
import './index.scss'

export type KeyInfoType = Pick<KeyboardEvent, 'code' | 'key'>

interface IProps {
  questionsList: string[][]
}

interface IDefaultProps {
  onFinished(questionsList: string[][], answersList: string[]): void
}

export type Props = IProps & Partial<IDefaultProps>

const TypingClub: FC<Props> = (props) => {
  const { questionsList } = props

  const { currentKeyList } = useManageUserKeyEvent(props)

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
      {/* 收集用户键入事件 */}
      <VirtualFocus />
    </div>
  )
}

export default TypingClub