import React from 'react'

function MatchedFilesTable(props: { matchedFiles: any[] }) {
  return (
    <div>
      {props?.matchedFiles?.length > 0 && (
        <div className='px-2 lg:px-8 mt-4 max-w-7xl m-auto'>
          <p className='text-center font-semibold text-xl text-black py-4 bg-green-500 rounded-md border-2 border-green-500'>
            Expedientes encontrados!
          </p>

          <div className='overflow-scroll'>
            <div className='mt-4 lg:mt-16 mx-auto min-w-[800px] max-w-7xl lg:px-8'>
              <div className='flex items-center border-b-2 justify-between border-gray-300 '>
                <p className='text-center font-semibold  text-sm lg:text-lg flex-1 '>
                  Numero de archivo
                </p>
                <p className='text-center font-semibold text-sm lg:text-lg flex-[2_2_0] '>
                  ID de archivo
                </p>
                <p className='text-center font-semibold text-sm lg:text-lg flex-[3_3_0] '>
                  Tribunal / Juzgado
                </p>
                <p className='text-center font-semibold text-sm lg:text-lg flex-[5_5_0] '>
                  Nombre de archivo
                </p>
              </div>

              <div>
                {props.matchedFiles.map((file: any) => (
                  <div
                    key={file[1]}
                    className='flex py-2 lg:py-4 items-center justify-between  border-b border-gray-300'
                  >
                    <p className='flex-1 text-center text-sm lg:text-base text-gray-400'>
                      {file[0]}
                    </p>
                    <p className='flex-[2_2_0] text-center text-sm lg:text-base'>
                      {file[1]}
                    </p>
                    <p className='flex-[3_3_0] text-center text-sm lg:text-base text-gray-400'>
                      {file[3]}
                    </p>
                    <p className='flex-[5_5_0] text-center text-sm lg:text-base text-gray-400'>
                      {file[2]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MatchedFilesTable
