import { last } from 'ramda'
import { useEffect, useState } from 'react'

import Keyboard from './components/Keyboard'
import { throttle } from './common/utils'
import './App.css'

const targetKeyList = ['q', 'w', 'q', 'w']

function App() {
  const [currentKeyList, setCurrentKeyList] = useState<string[]>([])

  const throttleHandle = throttle((e: KeyboardEvent) => {
    e.defaultPrevented
    e.stopPropagation()

    setCurrentKeyList(v => v.concat([e.key]))
  })


  useEffect(() => {
    document.addEventListener('keypress', throttleHandle)
  }, [])

  useEffect(() => {
    if (currentKeyList.length === targetKeyList.length) {
      console.log('DONE!')
    }
  }, [currentKeyList])

  return (
    <div className="app">
      <Keyboard targetKey={targetKeyList[currentKeyList.length]} currentKey={last(currentKeyList)} />
    </div>
  )
}

export default App
