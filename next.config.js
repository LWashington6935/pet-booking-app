/** @type {import('next').NextConfig} */
const isProjectPage = true;
const repoName = 'pet-booking-app';

module.exports = {
  output: 'export',
  images: { unoptimized: true },
  basePath: isProjectPage ? `/${repoName}` : '',
  assetPrefix: isProjectPage ? `/${repoName}/` : '',
  trailingSlash: true,
};
