export const capitalizeString = (string: string) => {
    const strArr = string.split('');
    const firstLetter = strArr[0].toLocaleUpperCase();
    strArr.splice(0, 1, firstLetter);
    return strArr.join('');
}