import { useEffect, useState } from "react"
import { pluck } from "ramda"

import { disableEvent, throttle } from "../../common/utils"
import { KeyInfoType, Props } from "."


/**
 * 管理用户键入事件
 * @param props
 * @returns 
 */
export const useManageUserKeyEvent = ({ questionsList, onFinished = () => { } }: Props) => {
  const [currentKeyList, setCurrentKeyList] = useState<KeyInfoType[]>([])

  const throttleHandle = throttle((e: KeyboardEvent) => {
    disableEvent(e)
    setCurrentKeyList(v => v.concat([{
      code: e.code,
      key: e.key
    }]))
  })

  useEffect(() => {
    document.addEventListener('keydown', throttleHandle)
    document.addEventListener('keyup', disableEvent)
    document.addEventListener('keypress', disableEvent)
  }, [])

  useEffect(() => {
    if (currentKeyList.length === questionsList.reduce((acc, item) => acc.concat(item), []).length) {
      console.log('DONE!')
      onFinished(questionsList, pluck('key', currentKeyList))
    }
  }, [currentKeyList])

  return {
    currentKeyList
  }
}