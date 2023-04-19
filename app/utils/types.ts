export type boletinData = {
  datetime: string
  files: boletinFile[]
  retrievedFiles: number
}

export type boletinFile = {
  0: string
  1: string
  2: string
}

export type fileIds = string[]
