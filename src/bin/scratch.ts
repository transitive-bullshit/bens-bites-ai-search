import { resolveLink } from '@/server/utils'

async function main() {
  const l =
    'https://www.google.com/url?q=https://www.google.com/url?q%3Dhttps://www.google.com/url?q%253Dhttps://www.google.com/url?q%25253Dhttps://www.google.com/url?q%2525253Dhttps://www.google.com/url?q%252525253Dhttps://t.co/YV3pzUbYOr%2525252526sa%252525253DD%2525252526source%252525253Deditors%2525252526ust%252525253D1671786460642148%2525252526usg%252525253DAOvVaw2B9pdCd2RP4w2hvWRQDJVp%25252526sa%2525253DD%25252526source%2525253Deditors%25252526ust%2525253D1671786489689699%25252526usg%2525253DAOvVaw0B_LmNeZNLctOGV9nyZS5Y%252526sa%25253DD%252526source%25253Deditors%252526ust%25253D1671786495435250%252526usg%25253DAOvVaw3wmOEGOJ_xgcdTk1tNkV8k%2526sa%253DD%2526source%253Deditors%2526ust%253D1671786500545138%2526usg%253DAOvVaw2zPLkJ-n3MOjRiiFE5fyZ6%26sa%3DD%26source%3Deditors%26ust%3D1671786545920663%26usg%3DAOvVaw2UHsbWeuGYHkaM7judECvm&sa=D&source=editors&ust=1671786550827059&usg=AOvVaw0w7D1CHb4tT3G1iXcptuY5'
  const u = await resolveLink(l)
  console.log(u)
  return
}

main().catch((err) => {
  console.error('error', err)
  process.exit(1)
})
