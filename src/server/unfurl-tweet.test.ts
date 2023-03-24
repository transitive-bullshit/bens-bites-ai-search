import fs from 'node:fs'

import test from 'ava'

import { unfurlTweet } from './unfurl-tweet'

const resolvedTwitterUser = JSON.parse(
  fs.readFileSync('fixtures/transitive_bs.json', 'utf8')
)

const fixtures = [
  { id: '1625435055706308608', label: 'basic reply' },
  { id: '1603341229047021568', label: 'basic retwet' },
  { id: '1628578673585709056', label: 'media w/ alt text' },
  { id: '1622150427885326337', label: 'media' },
  { id: '1628578692707532800', label: 'media + quote tweet' },
  { id: '1628219587748589568', label: 'url' },
  { id: '1628143012847943680', label: 'quote tweet' },
  { id: '1628118176524533760', label: 'media + url (google drive)' },
  { id: '1628088218364297216', label: 'url + url + media' },
  { id: '1628065270245003264', label: 'url + url' },
  { id: '1627984478743236609', label: 'media (gif)' },
  { id: '1628578702421557248', label: 'recursive (tweet edit)' },
  { id: '1596617311867359232', label: 'error' },
  { id: '1572186724117221376', label: 'error tweet special character' },
  { id: '1376571894493704194', label: 'error tweet special character' },
  { id: '1616716417700892674', label: 'ampersand' }
]

for (const fixture of fixtures) {
  test(`unfurlTweet ${fixture.id} – ${fixture.label}`, async (t) => {
    const tweet = resolvedTwitterUser.tweets[fixture.id]
    t.truthy(tweet)

    const text = unfurlTweet(tweet, { resolvedTwitterUser })
    t.truthy(text)

    const expanded = unfurlTweet(tweet, {
      resolvedTwitterUser,
      unfurlUrls: true
    })
    t.truthy(expanded)

    console.log({
      id: fixture.id,
      label: fixture.label,
      full_text: tweet.full_text,
      text,
      expanded
    })
    // t.snapshot(text)
  })
}
