import { LetterStatusEnum } from '../Letter'
import { KeyInfoType } from '../TypingClub'
import { Props as WordProps } from '../Word'

/**
 * 依据「题」与「回答」格式化数据，用于渲染提词器
 * @param questionsList 
 * @param currentAnswerList 
 * @returns 
 */
export const mapQuestionsList = (
  questionsList: string[][],
  currentAnswerList: KeyInfoType[]
): WordProps['letterList'][] => {

  return questionsList.reduce<WordProps['letterList'][]>((acc, question) => {
    const baseIndex = acc.reduce((accNew, accItem) => accNew + accItem.length, 0)

    return acc.concat([question.map<WordProps['letterList'][number]>((item, index) => {
      const resultIndex = index + baseIndex

      const isHint = resultIndex === currentAnswerList.length || (!currentAnswerList.length && resultIndex === 0)
      const isNormal = !currentAnswerList[resultIndex]
      const isCorrect = item === currentAnswerList[resultIndex]?.key
      const isIncorrect = item !== currentAnswerList[resultIndex]?.key

      // 注意以下顺序不可随意变动

      if (isHint) {
        return {
          content: item,
          status: LetterStatusEnum.Hint
        }
      }

      if (isNormal) {
        return {
          content: item,
          status: LetterStatusEnum.Normal
        }
      }

      if (isCorrect) {
        return {
          content: item,
          status: LetterStatusEnum.Correct
        }
      }

      if (isIncorrect) {
        return {
          content: item,
          status: LetterStatusEnum.Incorrect
        }
      }

      return {
        content: item,
        status: LetterStatusEnum.Normal
      }
    })])
  }, [])

}