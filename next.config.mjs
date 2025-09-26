/** @type {import('next').NextConfig} */
const isProjectPage = true;            // true if url is https://USER.github.io/REPO
const repoName = 'pet-booking-app';    // <-- set to your repo name

module.exports = {
  output: 'export',                    // enables `next export`
  images: { unoptimized: true },       // next/image works on static hosts
  basePath: isProjectPage ? `/${repoName}` : '',
  assetPrefix: isProjectPage ? `/${repoName}/` : '',
  trailingSlash: true                  // helps with static hosting
}
