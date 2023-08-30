import { SquaresPlusIcon, UserIcon } from '@heroicons/react/24/outline'

export const MY_JUZGADO_MAP: Record<string, string> = {
  '1civil': 'JUZGADO PRIMERO CIVIL',
  '2civil': 'JUZGADO SEGUNDO CIVIL',
  '3civil': 'JUZGADO TERCERO CIVIL',
  '4civil': 'JUZGADO CUARTO CIVIL',
  '5civil': 'JUZGADO QUINTO CIVIL',
  '6civil': 'JUZGADO SEXTO CIVIL',
  '7civil': 'JUZGADO SEPTIMO CIVIL',
  '8civil': 'JUZGADO OCTAVO CIVIL',
  '9civil': 'JUZGADO NOVENO CIVIL',
  '10civil': 'JUZGADO DECIMO CIVIL',
  '11civil': 'JUZGADO DECIMO PRIMERO CIVIL',
  '1familiar': 'JUZGADO PRIMERO DE LO FAMILIAR',
  '2familiar': 'JUZGADO SEGUNDO DE LO FAMILIAR',
  '3familiar': 'JUZGADO TERCERO DE LO FAMILIAR',
  '4familiar': 'JUZGADO CUARTO DE LO FAMILIAR',
  '5familiar': 'JUZGADO QUINTO DE LO FAMILIAR',
  '6familiar': 'JUZGADO SEXTO DE LO FAMILIAR',
  '7familiar': 'JUZGADO SEPTIMO DE LO FAMILIAR',
  '8familiar': 'JUZGADO OCTAVO DE LO FAMILIAR',
  '9familiar': 'JUZGADO NOVENO DE LO FAMILIAR',
  '10familiar': 'JUZGADO DECIMO DE LO FAMILIAR',
  '11familiar': 'JUZGADO DECIMO PRIMERO DE LO FAMILIAR',
}

export const MUNICIPALITIES: string[] = ['Tijuana', 'Mexicali', 'Ensenada', 'Tecate']

export const TABS = [
  { name: 'Resumen', href: '/boletin/resumen', icon: SquaresPlusIcon, current: true },
  { name: 'Administrador de archivos', href: '/boletin/administrador', icon: UserIcon, current: false },
]

export const COLUMNS = [
  { id: 1, name: 'Ciudad', value: 'ciudad' },
  { id: 2, name: 'Tribunal / Juzgado', value: 'tribunal' },
  { id: 3, name: 'Fecha encontrado', value: 'fecha' },
]

export const STATUSES = { found: 'text-green-400 bg-green-400/10', notFound: 'text-rose-400 bg-rose-400/10' }
