/* eslint-disable import/prefer-default-export */
export const plural = (number, one, two, three) => {
  const count = number || 0;
  const i = count % 10;
  switch (count - i === 10 ? count : i) {
    case 1:
      return `${count} ${one}`;

    case 2:
    case 3:
    case 4:
      return `${count} ${two}`;

    default:
      return `${count} ${three}`;
  }
};

export const shortenText = (inputText, maxLen, separator = ' ') => {
  if (!inputText || inputText.length <= maxLen) {
    return inputText;
  }
  return `${inputText.substr(0, inputText.lastIndexOf(separator, maxLen))} ...`;
};

export const errorLog = error => console.error(error); // eslint-disable-line no-console
