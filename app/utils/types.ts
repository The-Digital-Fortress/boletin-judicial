export type BoletinData = {
  datetime: string
  files: BoletinFile[]
  retrievedFiles: number
}

export type BoletinFile = {
  0: string
  1: string
  2: string
}

export type FileIds = string[]
