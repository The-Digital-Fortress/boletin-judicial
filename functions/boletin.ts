const moment = require('moment-timezone')
const jsdom = require('jsdom')
const tabletojson = require('tabletojson').Tabletojson

interface BoletinData {
  files: any
  status: number
  data: {
    files?: Record<string, unknown>[]
    retrievedFiles?: number
    datetime?: string
    tableData?: any
    url?: string
    message?: string
  }
}

export async function getBoletinData(
  date: string | null | FormDataEntryValue,
  municipality: string
): Promise<BoletinData> {
  // Generate a current date
  const now = moment().tz('America/Los_Angeles')
  const datetime = now.format('YYYY/MM/DD HH:mm:ss')
  const year = now.format('YYYY')

  //   const formattedDate = now.format("YYMMDD")
  const formattedDate = moment(date).format('YYMMDD')

  const URL = `http://www.pjbc.gob.mx/boletinj/${year}/my_html/${municipality}${formattedDate}.htm`

  // Get htm data and convert it to JSON
  try {
    const response = await fetch(URL)
    const html = await response.text()

    // Process the HTML here
    const dom = new jsdom.JSDOM(html)
    const mainSection = dom.window.document.querySelector('.WordSection1')

    if (!mainSection) {
      return {
        status: 204,
        data: { message: 'No hay informacion de este boletin' },
      }
    }

    const juryCases = {}
    let currentJury = ''

    // The following code iterates through each item in the jury file and uses the previous variables to
    // keep track of which files corespond to which jury and change jury when a new section is reached
    for (const child of mainSection.children) {
      // @ts-ignore
      if (child.tagName === 'DIV') {
        const reformattedContent = child.textContent.replace(/\n/g, ' ').trim()
        juryCases[reformattedContent] = []
        currentJury = reformattedContent
      } else if (child.tagName === 'TABLE') {
        const jsonTableData = tabletojson.convert(child.outerHTML)
        const jsonTableDataFlat = jsonTableData.flat(1)
        juryCases[currentJury].push(jsonTableDataFlat)
      }
    }

    // Flatten out each array for each jury
    const flattenedJuryFilesObj = Object.entries(juryCases).map(([key, files]) => {
      return {
        key: key,
        files: files.flat(),
      };
    });

    return {
      status: 200,
      files: flattenedJuryFilesObj,
      datetime,
      url: URL,
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

