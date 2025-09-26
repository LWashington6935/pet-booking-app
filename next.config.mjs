/** @type {import('next').NextConfig} */
const isProjectPage = true;                 // USER.github.io/REPO
const repoName = 'pet-booking-app';         // <-- exact repo name

module.exports = {
  output: 'export',                         // enables `next export` (static)
  images: { unoptimized: true },            // next/image on static hosts
  basePath: isProjectPage ? `/${repoName}` : '',
  assetPrefix: isProjectPage ? `/${repoName}/` : '',
  trailingSlash: true                       // safer routing on static hosting
};
