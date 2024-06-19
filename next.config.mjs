// next.config.mjs

import path from 'path';

const nextconfig =  {
    i18n: {
      locales: ['en', 'it'],
      defaultLocale: 'en',
    },
    trailingSlash: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Add a rule for SVG files using @svgr/webpack
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });

      config.module.rules.push({
        test: /\.(pdf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/_next/',
              name: 'static/media/[name].[hash].[ext]',
            },
          },
        ],
      });

      // Add a rule for PNG files using file-loader
      config.module.rules.push({
        test: /\.(png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/',
              name: 'static/media/[name].[hash].[ext]',
            },
          },
        ],
      });
      
      // Add a rule for CoffeeScript files using coffee-loader
      config.module.rules.push({
        test: /\.coffee$/,
        use: ['coffee-loader'],
      });
  
      if (!isServer) {
        // Ensure that the file-loader is applied to the client as well
        config.resolve.fallback.fileSystem = false;
        config.resolve.fallback.crypto = false;
      }
    }
    config.bail = false;
    return config;
  },
};


export default nextconfig;