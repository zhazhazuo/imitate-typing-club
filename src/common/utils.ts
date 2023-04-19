export let throttle = (func: any, delay: number = 200) => {
  let startTime = Date.now();
  return (...args: any[]) => {
    let curTime = Date.now();
    let interval = delay - (curTime - startTime);
    if (interval <= 0) {
      startTime = Date.now();
      return func(...args);
    }
  };
}

export function toHump(name: string) {
  return name.replace(/\-(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
}

export const tailSVGID = (string: string) => {
  const regex = /-\d+$/
  return string.replace(regex, "")
}

export const removeKey = (string: string) => {
  const regex = /^key/
  return string.replace(regex, "")
}

export const disableEvent = (e: KeyboardEvent) => {
  e.defaultPrevented
  e.stopPropagation()
}