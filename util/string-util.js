const withoutWhitespaces = (string) => string.replace(/\s/g, '');

const substringFrom = (string, start) => {
  return string.substring(string.indexOf(start)+start.length)
}

const substringTo = (string, end) => {
  return string.substring(0,string.indexOf(end))
}

export {
  withoutWhitespaces,
  substringFrom,
  substringTo
}
