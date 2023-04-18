import React, { FC } from "react"
import cls from 'classnames'
import './index.scss'

export enum LetterStatusEnum {
  Normal,
  Hint,
  Correct,
  Incorrect
}

interface IProps {
  content: string
}

interface IDefaultProps {
  status: LetterStatusEnum
}

export type Props = IProps & Partial<IDefaultProps>

const Letter: FC<Props> = ({ content, status }) => {

  const ClassName = cls('letter', {
    'letter--correct': status === LetterStatusEnum.Correct,
    'letter--incorrect': status === LetterStatusEnum.Incorrect,
    'letter--hint': status === LetterStatusEnum.Hint,
  })

  return (
    <div className={ClassName}>
      <span>
        {content}
      </span>
      <div className='letter__cursor'></div>
    </div>
  )
}

export default Letter