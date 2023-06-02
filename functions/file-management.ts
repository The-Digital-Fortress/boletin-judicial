const xlsx = require('xlsx')

export async function fileUpload(file: any) {
  const fileBuffer = await file?.arrayBuffer()

  // Assuming the file buffer is in the variable 'buffer'
  const workbook = xlsx.read(new Uint8Array(fileBuffer), { type: 'array' })
  const workingSheet = workbook.Sheets[workbook.SheetNames[0]]

  return workingSheet
}

export async function getExcelColumns(workingSheet: any) {

  // Transform the sheet to JSON data and get the first and second row
  const excelColumns = xlsx.utils.sheet_to_json(workingSheet,
    {
      header: 1,
      range: 2,
      raw: false,
      defval: null,
      blankrows: false,
      dateNF: 'yyyy-mm-dd',
    }
  )

  return excelColumns
}

export async function filterColumns(excelColumns: any) {
  // Filter empty columns
  const regex = /^\d{0,5}\/\d{4}$/

  const cleanedColumns = excelColumns.map(subarray => [
    subarray[0] && subarray[0].trim() ? subarray[0].trim().replace(/\s+/g, '') : '',
    subarray[1] && subarray[1].trim() ? subarray[1].trim().replace(/\s+/g, '') : ''
  ]
  );

  const filteredColumns = cleanedColumns.filter(([column1, column2]) => {
    const value = column2
    return regex.test(value)
  })

  return filteredColumns
}

export async function addZeroPaddingToIds(filteredColumns: any) {
  // Add zero padded IDs
  const zeroPaddedColumns = filteredColumns.map(([column1, column2]) => {
    const itemSplit = column2.split('/')
    const newItem = [itemSplit[0].padStart(5, '0'), itemSplit[1]].join('/')
    return [column1, newItem.trim()]
  })

  return zeroPaddedColumns
}
