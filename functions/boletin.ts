const moment = require('moment-timezone')
const tabletojson = require('tabletojson').Tabletojson

export async function getBoletinData() {
  const response = await fetch('http://jsonplaceholder.typicode.com/posts/1')
  const data = await response.json()

  // Generate a current date
  const now = moment().tz('America/Los_Angeles')
  const datetime = now.format('YYYY/MM/DD HH:mm:ss')
  const year = now.format('YYYY')

  //   const formattedDate = now.format("YYMMDD")
  const formattedDate = '230331'

  const URL = `http://www.pjbc.gob.mx/boletinj/${year}/my_html/ti${formattedDate}.htm`

  // Get htm data and convert it to JSON
  try {
    const response = await fetch(URL)
    const data = await response.text()
    const jsonTableData = tabletojson.convert(data)
    const jsonTableDataFlat = jsonTableData.flat(1)
    return {
      status: 200,
      data: {
        files: jsonTableDataFlat,
        retrievedFiles: jsonTableData.length,
        datetime,
      },
    }
  } catch (error) {
    console.error(error)
    return {
      status: 500,
      data: {
        error: error.message,
        datetime,
      },
    }
  }
}
