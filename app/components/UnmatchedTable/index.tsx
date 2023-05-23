import React from 'react'

function UnmatchedFilesTable(props: { unmatchedFiles: any[] }) {
  return (
    <div>
      {props?.unmatchedFiles?.length > 0 && (
        <div className='px-2 lg:px-8 mt-4 max-w-7xl m-auto'>
          <p className='text-center font-semibold text-xl text-black py-4 bg-rose-500 rounded-md border-2 border-rose-400'>
            Expedientes no encontrados
          </p>

          <div className='overflow-scroll'>
            <div className='mt-4 lg:mt-16 mx-auto max-w-7xl lg:px-8'>
              <div className='flex items-center border-b-2 justify-between border-gray-300 '>
                <p className='text-center font-semibold text-sm lg:text-lg flex-[2_2_0]'>
                  Numero de archivo
                </p>
                <p className='text-center font-semibold text-sm lg:text-lg flex-[3_3_0]'>
                  ID de archivo
                </p>
                <p className='text-center font-semibold text-sm lg:text-lg flex-[5_5_0]'>
                  Nombre de archivo
                </p>
              </div>

              <div>
                {props.unmatchedFiles.map((file: any) => (
                  <div
                    key={file[1]}
                    className='flex py-4 items-center justify-between  border-b border-gray-300'
                  >
                    <p className='flex-[2_2_0] text-center text-sm lg:text-base text-gray-400'>
                      {file[0]}
                    </p>
                    <p className='flex-[3_3_0] text-center text-sm lg:text-base'>
                      {file[1]}
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

export default UnmatchedFilesTable
