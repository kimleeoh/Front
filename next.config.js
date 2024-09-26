/** @type {import('next').NextConfig} */


const withPlugins = require('next-compose-plugins'); // 여러 plugin 사용 위함
const withPWA = require('next-pwa');

// @next/bundle-analyzer 관련 설정
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  compress: true,
  webpack(config) {
    const prod = process.env.NODE_ENV === 'production';
    const plugins = [...config.plugins];
    return {
      ...config,
      mode: prod ? 'producton' : 'development',
      devtool: prod ? 'hidden-source-map' : 'eval',
      plugins,
    };
  },
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  presets: ['next/babel'],
  productionBrowserSourceMaps: true, // source-map-explorer 관련 설정
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = withPlugins(
  [[withBundleAnalyzer], [withPWA({ pwa: { dest: 'public' } }), ]],
  nextConfig,
);