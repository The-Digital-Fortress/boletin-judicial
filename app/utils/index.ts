export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export function convertDateToLocale(date: string) {
  if (!date) return null

  const newDate = new Date(date)
  const formattedDate = newDate.toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  if (formattedDate === 'Invalid Date') return null
  return formattedDate
}

const compareAscending = (dateStr1: string, dateStr2: string) => {
  const date1 = new Date(dateStr1)
  const date2 = new Date(dateStr2)

  if (date1 < date2) return -1
  if (date1 > date2) return 1
  return 0
}

const compareDescending = (dateStr1: string, dateStr2: string) => {
  const date1 = new Date(dateStr1)
  const date2 = new Date(dateStr2)

  if (date1 < date2) return 1
  if (date1 > date2) return -1
  return 0
}

export function compareDates(dateStr1: string, dateStr2: string, sort: string) {
  if (sort === 'oldest') {
    return compareAscending(dateStr1, dateStr2)
  } else {
    return compareDescending(dateStr1, dateStr2)
  }
}

export function compareStrings(string1: string, string2: string, sort: string) {
  return string1.localeCompare(string2)
}
