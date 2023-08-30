import { formatDistance, formatRelative, subDays } from 'date-fns'
import { es } from 'date-fns/locale'

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

export function timeFromDateToNow(date: string) {
  if (!date) return null

  const fromDate = new Date(date)
  const timePassed = formatDistance(fromDate, new Date(), { locale: es })

  return timePassed
}