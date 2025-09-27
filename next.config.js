/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production';
const isProjectPage = true;
const repoName = 'pet-booking-app';

module.exports = {
  output: 'export',
  images: { unoptimized: true },
  basePath: isProduction && isProjectPage ? `/${repoName}` : '',
  assetPrefix: isProduction && isProjectPage ? `/${repoName}/` : '',
  trailingSlash: true,
};