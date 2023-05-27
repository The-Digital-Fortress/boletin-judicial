import React, { useState } from 'react'

function MatchedFilesTable(props: { matchedFiles: any[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState(props.matchedFiles)

  const handleSearch = event => {
    const value = event.target.value
    setSearchTerm(value)

    const results = props.matchedFiles.filter(
      file =>
        file[2].toLowerCase().includes(value.toLowerCase()) ||
        file[3].toLowerCase().includes(value.toLowerCase()) ||
        file[1].toLowerCase().includes(value.toLowerCase()) ||
        file[0].toLowerCase().includes(value.toLowerCase())
    )

    setSearchResults(results)
  }

  return (
    <div>
      {props?.matchedFiles?.length > 0 && (
        <>
          <div className='mx-auto mt-4 lg:mt-3.5 px-2 max-w-7xl lg:px-8'>
            <input
              className='w-full rounded-md lg:max-w-[500px] border-indigo-400 focus:border-indigo-600 focus-visible:border-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-indigo-600  border-2'
              type='text'
              value={searchTerm}
              onChange={handleSearch}
              placeholder='Buscar entre los archivos encontrados...'
            />
          </div>
          <div className='px-2 lg:px-8 mt-4 max-w-7xl m-auto'>
            <span className='o font-semibold text-indigo-400'>
              Expedientes encontrados: {searchResults.length}
            </span>

            <div className='overflow-scroll'>
              <div className='mt-4 lg:mt-4 mx-auto min-w-[800px] max-w-7xl lg:px-8'>
                <div className='flex items-center border-b-2 justify-between border-gray-300 '>
                  <p className='text-center font-semibold  text-sm lg:text-lg flex-1 '>
                    Numero de archivo
                  </p>
                  <p className='text-center font-semibold text-sm lg:text-lg flex-[2_2_0] '>
                    Expediente
                  </p>
                  <p className='text-center font-semibold text-sm lg:text-lg flex-[3_3_0] '>
                    Tribunal / Juzgado
                  </p>
                  <p className='text-center font-semibold text-sm lg:text-lg flex-[5_5_0] '>
                    Nombre de las partes
                  </p>
                </div>

                <div>
                  {searchResults.map(file => (
                    <div
                      key={file[1]}
                      className='flex py-2 lg:py-4 items-center justify-between  border-b border-gray-300'
                    >
                      <p className='flex-1 text-center text-sm lg:text-base text-gray-500'>
                        {file[0]}
                      </p>
                      <p className='flex-[2_2_0] text-center text-sm lg:text-base'>
                        {file[1]}
                      </p>
                      <p className='flex-[3_3_0] text-center text-sm lg:text-base text-gray-500'>
                        {file[3]}
                      </p>
                      <p className='flex-[5_5_0] text-center text-sm lg:text-base text-gray-500'>
                        {file[2]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default MatchedFilesTable
