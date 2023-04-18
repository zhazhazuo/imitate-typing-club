import React, { FC } from "react"
import { compose } from "ramda"

import Word from "../Word"
import { mapQuestionsList } from "./logic"
import { KeyInfoType } from "../TypingClub"
import './index.scss'

interface IProps {
  questionsList: string[][]
  currentAnswerList: KeyInfoType[]
}

interface IDefaultProps {

}

type Props = IProps & Partial<IDefaultProps>

const renderContent = compose((list) => list.map((letterList, index) => <Word key={index} letterList={letterList} />), mapQuestionsList)

const Teleprompter: FC<Props> = (props) => {
  const { questionsList, currentAnswerList } = props

  return (
    <div className="teleprompter">
      {renderContent(questionsList, currentAnswerList)}
    </div>
  )
}

export default Teleprompter