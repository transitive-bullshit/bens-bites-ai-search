import browserless from 'browserless'
import getHTML from 'html-get'
import isRelativeUrl from 'is-relative-url'
import metascraper, { type Metadata } from 'metascraper'
import metascraperAuthor from 'metascraper-author'
import metascraperDescription from 'metascraper-description'
import metascraperPublisher from 'metascraper-publisher'
import metascraperTitle from 'metascraper-title'
import metascraperTwitter from 'metascraper-twitter'
import metascraperYouTube from 'metascraper-youtube'
import pMemoize from 'p-memoize'
import QuickLRU from 'quick-lru'

export type LinkMetadata = Omit<Metadata, 'date' | 'image' | 'video'>

const cache = new QuickLRU<string, LinkMetadata | null>({ maxSize: 10000 })
export const getLinkMetadata = pMemoize(getLinkMetadataImpl, { cache })

export const protocolAllowList = new Set(['https:', 'http:'])

const m = metascraper([
  metascraperAuthor(),
  metascraperDescription(),
  metascraperPublisher(),
  metascraperTitle(),
  metascraperTwitter(),
  metascraperYouTube()
])

let gBrowser: any

async function getLinkMetadataImpl(url: string): Promise<LinkMetadata | null> {
  if (isRelativeUrl(url)) {
    return null
  }

  try {
    const parsedUrl = new URL(url)
    if (!protocolAllowList.has(parsedUrl.protocol)) {
      return null
    }
  } catch (err) {
    return null
  }

  const html = await getLinkHtml(url)
  const metadata = await m({ html, url })

  delete metadata.date
  delete metadata.image
  delete (metadata as any).video

  return metadata as LinkMetadata
}

async function getLinkHtml(url: string) {
  if (!gBrowser) {
    gBrowser = browserless()
  }

  // create a browser context inside the main Chromium process
  const browserContextP = gBrowser.createContext()
  try {
    const html = await getHTML(url, { getBrowserless: () => browserContextP })
    return html
  } finally {
    try {
      const browserContext = await browserContextP
      await browserContext.destroyContext()
    } catch (err) {
      console.warn('error disposing browser context', err.toString())
    }
  }
}

export async function closeLinkMetadata() {
  if (gBrowser) {
    const browser = gBrowser
    gBrowser = null
    return browser.close()
  }
}
