export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export function convertDateToLocale(date: string) {
  const newDate = new Date(date)
  const formattedDate = newDate.toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  if (formattedDate === 'Invalid Date') return null
  return formattedDate
}
