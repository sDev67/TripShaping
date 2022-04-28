export const textTruncation = (string, lengthThreshold) => {
  // const words = str.split(' ');
  // const result = words.reduce((acc, it) => {
  //   const parcial = acc + ' ' + it;
  //   return parcial.length >= length ? acc : parcial;
  // }, '');

  // return result + '...';

  if (string.length <= lengthThreshold) {
    return string;
  }

  return string.substring(0, lengthThreshold) + "...";
};
