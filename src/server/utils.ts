import crypto from 'node:crypto'
import fs from 'node:fs/promises'

import * as types from './types'

export async function readJson<T = any>(filePath: string): Promise<T> {
  return JSON.parse(await fs.readFile(filePath, 'utf-8'))
}

export async function writeJson<T = any>(filePath: string, json: T) {
  return fs.writeFile(filePath, JSON.stringify(json, null, 2), 'utf-8')
}

export function pick<T extends object, U = T>(obj: T, ...keys: string[]): U {
  return Object.fromEntries(
    keys.filter((key) => key in obj).map((key) => [key, obj[key]])
  ) as U
}

export function omit<T extends object, U = T>(obj: T, ...keys: string[]): U {
  return Object.fromEntries<T>(
    Object.entries(obj).filter(([key]) => !keys.includes(key))
  ) as U
}

export function hash(d: Buffer | string): string {
  const buffer = Buffer.isBuffer(d) ? d : Buffer.from(d.toString())
  return crypto.createHash('sha256').update(buffer).digest('hex')
}

export function sanitizePineconeString(input: string): string {
  if (!input) return ''
  return input.replace(/[\ud800-\udfff]/g, '').trim()
}

export function getNewsletterLinkId(link: types.NewsletterLink): string {
  return `${link.postId}-${hash(link.url).slice(0, 16)}`
}
