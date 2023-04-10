const xlsx = require('xlsx')

export async function fileUpload(file: any) {
  const fileBuffer = await file?.arrayBuffer()

  // Assuming the file buffer is in the variable 'buffer'
  const workbook = xlsx.read(new Uint8Array(fileBuffer), { type: 'array' })
  const sheet = workbook.Sheets[workbook.SheetNames[0]]

  return sheet
}

export async function getFileIdsColumn(sheet: any) {
  // Get the file ID column
  const range = xlsx.utils.decode_range(sheet['!ref'])
  const column = []
  for (let i = range.s.r; i <= range.e.r; i++) {
    const cell = sheet[xlsx.utils.encode_cell({ r: i, c: 1 })] // Change the second argument to the index of the column you want to read (0-indexed)
    if (cell && cell.t === 's') {
      column.push(cell.v)
    } else {
      column.push(null)
    }
  }
  return column
}

export async function filterIdColumns(column: any) {
  // Filter empty columns
  const regex = /^\d{0,5}\/\d{4}$/
  const filteredColumn = column.filter((item: any) => {
    const value = item
    return regex.test(value)
  })

  return filteredColumn
}

export async function addZeroPaddingToIds(filteredColumn: any) {
  // Add zero padded IDs
  const zeroPaddedColumn = filteredColumn.map((item: any) => {
    const itemSplit = item.split('/')
    const newItem = [itemSplit[0].padStart(5, '0'), itemSplit[1]].join('/')
    return newItem
  })

  return { fileIds: zeroPaddedColumn }
}
