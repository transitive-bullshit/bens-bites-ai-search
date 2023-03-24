import pRetry from 'p-retry'
import { type Browser, type Page, executablePath } from 'puppeteer'
import puppeteer from 'puppeteer-extra'
import AdBlockerPlugin from 'puppeteer-extra-plugin-adblocker'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

import * as types from '@/server/types'

import { uploadFileToBucket } from './services/storage'

puppeteer.use(StealthPlugin())
puppeteer.use(AdBlockerPlugin())

export async function getThumbnailForUrl({
  url,
  storageUrl,
  width = 1200,
  height = 630,
  browser,
  storage,
  bucket,
  timeoutMs = 30000
}: {
  url: string
  storageUrl: string
  width?: number
  height?: number
  browser?: Browser
  storage?: types.GCPStorage
  bucket?: string
  timeoutMs?: number
}): Promise<string> {
  const originalBrowser = browser
  let page: Page = null
  let output: string = null

  if (!browser) {
    browser = await getBrowser()
    page = (await browser.pages())[0]
  } else {
    page = await browser.newPage()
  }

  try {
    await page.setViewport({
      deviceScaleFactor: 1,
      width,
      height
    })
    await page.goto(url, {
      timeout: timeoutMs
      // waitUntil: 'networkidle2'
    })

    const name = storageUrl.split('/').pop()
    const path = `out/${name}`
    await page.screenshot({
      type: 'jpeg',
      path
    })

    if (storage && bucket) {
      await pRetry(
        () =>
          uploadFileToBucket({
            path,
            name,
            storage,
            bucket,
            contentType: 'image/jpeg'
          }),
        {
          retries: 3
        }
      )

      output = storageUrl
    }
  } finally {
    if (!originalBrowser) {
      await browser.close()
    } else {
      await page.close()
    }
  }

  return output
}

export async function getBrowser() {
  return puppeteer.launch({
    headless: true,
    args: [
      '--no-first-run',
      '--no-service-autorun',
      '--password-store=basic',
      '--mute-audio',
      '--disable-default-apps',
      '--no-zygote'
    ],
    ignoreHTTPSErrors: true,
    executablePath: executablePath()
  })
}
