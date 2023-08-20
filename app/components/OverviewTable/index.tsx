import { classNames, convertDateToLocale } from '~/utils'
import { MY_JUZGADO_MAP } from '~/constants'

// const files = [
//   {
//     fileTitle: 'JUZGADO QUINTO CIVIL DE TIJUANA, B.C. 05 DE JULIO DE 2023',
//     foundDate: 'Agosto 15 - Tijuana',
//     fileJury: '01308/2021',
//     partsName: 'ROSA MARIA MARTINEZ ALVAREZ VS ISAAC GARCIA VAZQUEZ Y OTRA. ORDINARIO CIVIL PRESCRIPCION POSITIVA',
//   },
//   {
//     fileTitle: 'JUZGADO QUINTO CIVIL DE TIJUANA, B.C. 05 DE JULIO DE 2023',
//     foundDate: 'Agosto 15 - Tijuana',
//     fileJury: '01308/2021',
//     partsName: 'ROSA MARIA MARTINEZ ALVAREZ VS ISAAC GARCIA VAZQUEZ Y OTRA. ORDINARIO CIVIL PRESCRIPCION POSITIVA',
//   },
//   // { file: 'Lindsay Walton', title: 'Front-end Developer', foundDate: '', role: 'Member' },
//   // More people...
// ]

const statuses = { found: 'text-green-400 bg-green-400/10', notFound: 'text-rose-400 bg-rose-400/10' }

export default function OverviewTable({ files }) {
  return (
    <div className='px-4 sm:px-6 lg:px-0'>
      <div className='flow-root'>
        <div className='-mx-4 -my-2 sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle'>
            <table className='min-w-full border-separate border-spacing-0'>
              <thead>
                <tr>
                  <th
                    scope='col'
                    className='sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8'
                  >
                    Expediente
                  </th>
                  <th
                    scope='col'
                    className='sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell'
                  >
                    Fecha encontrado
                  </th>
                  <th
                    scope='col'
                    className='sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell'
                  >
                    Tribunal / Juzgado
                  </th>
                  <th
                    scope='col'
                    className='sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter'
                  >
                    Nombre de las partes
                  </th>
                  <th
                    scope='col'
                    className='sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8'
                  >
                    <span className='sr-only'>Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {files?.map((file, idx) => (
                  <tr key={idx}>
                    <td
                      className={classNames(
                        idx !== files.length - 1 ? 'border-b border-gray-200' : '',
                        'py-4 pl-4 pr-3 min-w-[300px] text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                      )}
                    >
                      {file.fileId}
                    </td>
                    <td
                      className={classNames(
                        idx !== files.length - 1 ? 'border-b border-gray-200' : '',
                        'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 lg:table-cell'
                      )}
                    >
                      <div className='flex items-center gap-3'>
                        <div
                          className={classNames(
                            convertDateToLocale(file.foundDate) ? statuses.found : statuses.notFound,
                            'flex-none rounded-full p-1 '
                          )}
                        >
                          <div className='h-1.5 w-1.5 rounded-full bg-current' />
                        </div>
                        <div className='hidden text-gray-500 sm:block'>
                          {convertDateToLocale(file.foundDate) || 'No encontrado'}
                        </div>
                      </div>
                    </td>
                    <td
                      className={classNames(
                        idx !== files.length - 1 ? 'border-b border-gray-200' : '',
                        'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 lg:table-cell'
                      )}
                    >
                      {MY_JUZGADO_MAP[file.fileJury]}
                    </td>
                    <td
                      className={classNames(
                        idx !== files.length - 1 ? 'border-b border-gray-200' : '',
                        'min-w-[300px] px-3 py-4 text-sm text-gray-500'
                      )}
                    >
                      {file.partsName}
                    </td>
                    <td
                      className={classNames(
                        idx !== files.length - 1 ? 'border-b border-gray-200' : '',
                        'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8'
                      )}
                    >
                      <a href='#' className='text-indigo-600 hover:text-indigo-900'>
                        Detalles<span className='sr-only'>, {file.fileTitle}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
