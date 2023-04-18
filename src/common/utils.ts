export let throttle = (func: any, delay: number = 200) => {
  // 第一次触发时间戳
  let startTime = Date.now();
  return (...args: any[]) => {
    // 如果不是剪头函数可以使用arguments获取参数，这样就不用写形参了考虑形参个数了
    // let args = arguments;
    // 再次触发时间
    let curTime = Date.now();
    // 间隔时间 = 延迟的时间 - （再次触发时间戳 - 第一次触发时间戳）
    let interval = delay - (curTime - startTime);
    if (interval <= 0) {
      // 重新计算开始时间
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