import React, { FC } from "react"
import Word from "../Word"

interface IProps {
  questionsList: string[][]
  currentAnswerList: string[]
}

interface IDefaultProps {

}

type Props = IProps & Partial<IDefaultProps>

const Teleprompter: FC<Props> = (props) => {
  const { questionsList, currentAnswerList } = props

  return (
    <div className="teleprompter">
      <Word content="f" />
    </div>
  )
}

export default Teleprompter