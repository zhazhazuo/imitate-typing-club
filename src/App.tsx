import { last } from 'ramda'
import { useEffect, useState } from 'react'

import Keyboard from './components/Keyboard'
import { throttle } from './common/utils'
import './App.css'
import Teleprompter from './components/Teleprompter'

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
      <div className='app__teleprompter'>
        <Teleprompter questionsList={[targetKeyList]} currentAnswerList={currentKeyList} />
      </div>

      <div className='app_keyboard'>
        <Keyboard targetKey={targetKeyList[currentKeyList.length]} currentKey={last(currentKeyList)} />
      </div>
    </div>
  )
}

export default App
