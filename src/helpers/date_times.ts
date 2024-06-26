export const getDaysInMonth = (year: number, month: number) => {
  // Returns the number of days in a particular month
  const targetDate = new Date(year, month, 0)
  return targetDate.getDate()
}

export const formatDateNumber = (n: number) => {
  // Returns a number in 03 format instead of 3
  return n.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })
}
