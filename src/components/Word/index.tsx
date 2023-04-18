import React, { FC } from "react"
import './index.scss'

enum WordStatusEnum {
  Normal,
  Target,
  Correct,
  InCorrect
}

interface IProps {
  content: string
}

interface IDefaultProps {
  status: WordStatusEnum
}

type Props = IProps & Partial<IDefaultProps>

const Word: FC<Props> = ({ content, status }) => {
  return (
    <div className="word">
      <span>
        {content}
      </span>
      <div className="word__cursor"></div>
    </div>
  )
}

export default Word