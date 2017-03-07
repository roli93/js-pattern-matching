const withoutWhitespaces = (string) => string.replace(/\s/g, '');

const substringFrom = (string, start) => {
  return string.substring(string.indexOf(start)+start.length)
}

const substringTo = (string, end) => {
  return string.substring(0,string.indexOf(end))
}

const head = (string) => string[0]

const last = (string) => string[string.length - 1]

export {
  withoutWhitespaces,
  substringFrom,
  substringTo,
  head,
  last
}
