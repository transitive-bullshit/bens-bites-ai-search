import { Storage } from '@google-cloud/storage'

import * as types from '@/server/types'

export interface UploadFileToBucketOptions {
  name: string
  path: string
  storage: types.GCPStorage
  bucket: string
  contentType?: string
}

export const storage = new Storage()

export async function uploadFileToBucket({
  path,
  name,
  storage,
  bucket,
  contentType = 'image/jpeg'
}: UploadFileToBucketOptions) {
  return storage.bucket(bucket).upload(path, {
    destination: name,
    contentType
  })
}
