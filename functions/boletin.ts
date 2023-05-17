const moment = require('moment-timezone')
const tabletojson = require('tabletojson').Tabletojson

interface BoletinData {
  status: number
  data: {
    files: Record<string, unknown>[]
    retrievedFiles: number
    datetime: string
  }
}

export async function getBoletinData(
  date: string | null
): Promise<BoletinData> {
  // Generate a current date
  const now = moment().tz('America/Los_Angeles')
  const datetime = now.format('YYYY/MM/DD HH:mm:ss')
  const year = now.format('YYYY')

  //   const formattedDate = now.format("YYMMDD")
  const formattedDate = moment(date).format('YYMMDD')

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
  } catch (error: any) {
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
