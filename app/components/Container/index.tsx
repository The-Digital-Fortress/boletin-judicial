import React from 'react'

type Props = {
  children: React.ReactNode
}

const Container = ({ children }: Props) => {
  return (
    <div className='mx-auto mt-4 lg:mt-16 px-2 max-w-7xl lg:px-8 gap-4 flex flex-col justify-between'>{children}</div>
  )
}

export default Container
