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

export function minutesPassedFromDateToNow(date: string) {
  if (!date) return null

  const newDate = new Date(date)
  const now = new Date()
  const diff = now.getTime() - newDate.getTime()
  const minutes = Math.floor(diff / 60000)

  return minutes
}