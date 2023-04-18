import { curry } from "ramda"

const LOW_CASE_LETTER = 'qwertyuiopasdfghjklzxcvbnm'

const KEY_ITEM_TARGET_HINT = 'keyboard-item--hint'
const KEY_ITEM_TARGET_CORRECT = 'keyboard-item--correct'
const KEY_ITEM_TARGET_INCORRECT = 'keyboard-item--incorrect'

const KEY_ITEM_LETTER_HINT = 'keyboard-item-letter--hint'
const KEY_ITEM_LETTER_CORRECT = 'keyboard-item-letter--correct'
const KEY_ITEM_LETTER_INCORRECT = 'keyboard-item-letter--incorrect'

interface IHandleLetterConfig {
  isLowCase: boolean
}

const handleLetters = (svg: SVGGElement, callback: (v: SVGTextElement) => void) => {
  Array.from(svg.getElementsByTagName('text')).forEach(callback)
}

const handleKey = (svg: SVGGElement, callback: (v: SVGPathElement) => void) => {
  Array.from(svg.getElementsByTagName('path')).forEach(callback)
}

export const filterLetter = curry(({ isLowCase }: IHandleLetterConfig, svg: SVGGElement) => {
  handleLetters(svg, ({ textContent = '', classList }) => {
    const isLowCaseRight = isLowCase && LOW_CASE_LETTER.toLocaleUpperCase().includes(textContent!)
    const isUpperCaseRight = !isLowCase && LOW_CASE_LETTER.includes(textContent!)

    if (isLowCaseRight) {
      classList.add('keyboard-item-letter--hidden')
      return
    }

    if (isUpperCaseRight) {
      classList.add('keyboard-item-letter--hidden')
      return
    }

  })
})

/**
 * 初始化所有按键
 * @param svg 
 */
export const initEveryKey = (svg: SVGGElement) => {
  handleLetters(svg, (letter) => {
    const classList = ['keyboard-item-letter']
    if (LOW_CASE_LETTER.includes(letter.textContent!)) {
      classList.push('keyboard-item--bold')
    }

    letter.classList.add(...classList)
  })
  handleKey(svg, (key) => {
    const classList = ['keyboard-item']

    key.classList.add(...classList)
  })
}

/**
 * 高亮目标按键
 */
export const highlightTagetKey = curry((targetId: string, svg: SVGGElement) => {
  handleKey(svg, ({ id, classList }) => {
    if (id.split('-')[0] === targetId) {
      classList.add(KEY_ITEM_TARGET_HINT)
    }
  })

  handleLetters(svg, ({ textContent, classList }) => {
    if (textContent === targetId) {
      classList.add(KEY_ITEM_LETTER_HINT)
    }
  })
})

interface IHighlightCurretnKeyInfo {
  target: string
  current?: string
}

/**
 * 高亮当前点击按键
 */
export const highlightCurretnKey = curry(({
  target, current
}: IHighlightCurretnKeyInfo, svg: SVGGElement) => {
  console.log('highlightCurretnKey', target, current)
  handleKey(svg, ({ id, classList }) => {
    let timer: number

    if (id.split('-')[0] === current) {
      if (classList.contains(KEY_ITEM_TARGET_HINT)) {
        // 正确场景
        classList.add(KEY_ITEM_TARGET_CORRECT)
      } else {
        // 错误场景
        classList.add(KEY_ITEM_TARGET_INCORRECT)
      }

    }

    classList.remove(KEY_ITEM_TARGET_HINT)

    timer = setTimeout(() => {
      classList.remove(KEY_ITEM_TARGET_INCORRECT)
      classList.remove(KEY_ITEM_TARGET_CORRECT)

      if (id.split('-')[0] === target) {
        classList.add(KEY_ITEM_TARGET_HINT)
      }
    }, 200)


  })

  handleLetters(svg, ({ textContent, classList }) => {
    let timer: number

    if (textContent === current) {
      if (classList.contains(KEY_ITEM_LETTER_HINT)) {
        // 正确场景
        classList.add(KEY_ITEM_LETTER_CORRECT)
      } else {
        // 错误场景
        classList.add(KEY_ITEM_LETTER_INCORRECT)
      }

    }

    classList.remove(KEY_ITEM_LETTER_HINT)

    timer = setTimeout(() => {
      classList.remove(KEY_ITEM_LETTER_INCORRECT)
      classList.remove(KEY_ITEM_LETTER_CORRECT)

      if (textContent === target) {
        classList.add(KEY_ITEM_LETTER_HINT)
      }
    }, 200)


  })
})