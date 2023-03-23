import * as React from 'react'
import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en' dir='ltr' className='light'>
      <Head>
        <link rel='shortcut icon' href='/favicon.ico' />
        <link rel='icon' type='image/png' sizes='32x32' href='/icon.png' />
      </Head>

      <body>
        <Main />

        <NextScript />
      </body>
    </Html>
  )
}
