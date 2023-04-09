import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getBoletinData } from 'functions/boletin'
import React from 'react'

export const loader = async () => {
  const boletinData = await getBoletinData()
  return json(boletinData)
}

const Boletin = () => {
  const { data } = useLoaderData()
  console.log(data)
  return <div>Boletin</div>
}

export default Boletin
