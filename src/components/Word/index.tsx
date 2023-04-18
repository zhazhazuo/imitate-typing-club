import React, { FC } from "react"
import Letter, { Props as LetterProps } from "../Letter"
import './index.scss'

interface IProps {
  letterList: LetterProps[]
}

interface IDefaultProps {

}

export type Props = IProps & Partial<IDefaultProps>

const Word: FC<Props> = ({ letterList }) => {
  return (
    <div className="word">
      {letterList.map((letter, index) => <Letter key={index} {...letter} />)}
    </div>
  )
}

export default Word