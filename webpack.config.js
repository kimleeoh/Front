const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');

module.exports = {
  name: 'A-F-Killer',
  mode: 'production', // 개발 중에는 'development'로 변경 가능

  entry: './src/index.js', // 진입 파일
  output: {
    path: path.resolve(__dirname, 'dist'), // 번들이 저장될 디렉토리
    filename: '[name].[contenthash].js', // 캐시 무효화를 위해 contenthash 사용
    clean: true, // 기존 빌드 파일 삭제
  },

  resolve: {
    extensions: ['.js', '.jsx'], // 파일 확장자 자동 처리
  },

  cache: {
    type: 'filesystem', // 파일 시스템에 캐시 저장
  },

  devtool: 'source-map', // Source maps for production debugging

  module: {
    rules: [
      {
        test: /\.js$/, // JS 파일을 처리
        exclude: /node_modules/,
        use: [
          'thread-loader', // 병렬 처리를 통해 빌드 성능 향상
          {
            loader: 'babel-loader', // Babel을 통해 최신 자바스크립트 변환
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                ['babel-plugin-styled-components', { minify: true, pure: true }] // styled-components 최적화
              ],
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // 이미지 파일 처리
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash].[ext]',
              outputPath: 'images',
            },
          },
        ],
      },
    ],
  },

  optimization: {
    usedExports: true, // Tree shaking 활성화
    splitChunks: {
      chunks: 'all', // 모든 청크를 분리하여 코드 스플리팅
    },
    minimize: true, // 코드 최소화
    minimizer: [
      new TerserPlugin({
        parallel: true, // 병렬 처리 활성화
        terserOptions: {
          compress: {
            drop_console: true, // console.log 제거
          },
        },
      }),
      new CssMinimizerPlugin(), // CSS 파일 최소화
    ],
  },

  plugins: [
    // React의 Production 최적화
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),

    // 이미지 및 SVG 최적화
    new ImageMinimizerPlugin({
      minimizerOptions: {
        plugins: [
          ['gifsicle', { interlaced: true }],
          ['mozjpeg', { quality: 75 }],
          ['pngquant', { quality: [0.65, 0.9], speed: 4 }],
          ['svgo', {
            plugins: [
              { name: 'removeViewBox', active: false }, // viewBox 유지
              { name: 'removeEmptyAttrs', active: true }, // 빈 속성 제거
            ],
          }],
        ],
      },
    }),

    // 번들 크기 분석
    new BundleAnalyzerPlugin(),

    // 추가적인 최적화 플러그인들
    new webpack.optimize.ModuleConcatenationPlugin(), // 모듈 연결로 성능 개선
  ],
};
