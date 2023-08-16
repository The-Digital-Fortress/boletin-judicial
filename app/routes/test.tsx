import React from 'react'
import type { ActionFunction } from '@remix-run/node'
import SingleFileUpload from '~/components/SingleFileUpload'
import { addFile } from '~/utils/files'

export default function TestRoute() {
  return (
    <div>
      {/* Single file upload */}
      <div className='w-[230px] m-auto'>
        <SingleFileUpload />
      </div>
    </div>
  )
}
