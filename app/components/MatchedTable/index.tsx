import React from 'react'

function MatchedFilesTable(props: { matchedFiles: any[] }) {
  return (
    <div>
      {props?.matchedFiles?.length > 0 && (
        <div className='mt-16 mx-auto max-w-7xl lg:px-8'>
          <p className='text-center font-semibold text-xl text-black py-4 bg-green-500 rounded-md border-2 border-green-500'>
            Expedientes encontrados!
          </p>
          <div className='flex items-center border-b-2 justify-between border-gray-300 '>
            <p className='text-center font-semibold text-lg flex-1 '>
              Numero de archivo
            </p>
            <p className='text-center font-semibold text-lg flex-[2_2_0] '>
              ID de archivo
            </p>
            <p className='text-center font-semibold text-lg flex-[5_5_0] '>
              Nombre de archivo
            </p>
          </div>

          <div>
            {props.matchedFiles.map((file: any) => (
              <div
                key={file[1]}
                className='flex py-4 items-center justify-between  border-b border-gray-300'
              >
                <p className='font-semibold flex-1 text-center text-gray-400'>
                  {file[0]}
                </p>
                <p className='font-semibold flex-[2_2_0] text-center'>
                  {file[1]}
                </p>
                <p className='font-semibold flex-[5_5_0] text-center text-gray-400'>
                  {file[2]}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MatchedFilesTable
