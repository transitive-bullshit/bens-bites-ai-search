export const environment = process.env.NODE_ENV || 'development'
export const isDev = environment === 'development'
export const isServer = typeof window === 'undefined'
export const isSafari =
  !isServer && /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

export const title = "Ben's Bites AI Search"
export const description =
  "Search across all of the best resources in AI. Powered by the Ben's Bites AI Newsletter and updated daily, with over 60,000 subscribers from companies like Google, a16z, Sequoia, Amazon, and Meta."

export const domain = 'bens-bites-search.vercel.app'

export const author = 'Travis Fischer'
export const twitter = 'transitive_bs'
export const twitterUrl = `https://twitter.com/${twitter}`
export const discordUrl = 'https://discord.gg/ben-s-bites-1039224571376701510'
export const newsletterTitle = "Ben's Bites AI Newsletter"
export const newsletterUrl = 'https://www.bensbites.co/'
export const githubRepoUrl =
  'https://github.com/transitive-bullshit/bens-bites-ai-search'
export const githubSponsorsUrl =
  'https://github.com/sponsors/transitive-bullshit'
export const copyright = `Copyright 2023 ${author}`
export const madeWithLove = 'Made with ❤️ in Brooklyn, NY'

export const port = process.env.PORT || '3000'
export const prodUrl = `https://${domain}`
export const url = isDev ? `http://localhost:${port}` : prodUrl

export const apiBaseUrl =
  isDev || !process.env.VERCEL_URL ? url : `https://${process.env.VERCEL_URL}`

// these must all be absolute urls
export const socialImageUrl = `${url}/social.jpg`
