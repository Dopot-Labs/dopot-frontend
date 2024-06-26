// next.config.mjs

const nextconfig =  {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /vm2/,
        use: 'null-loader',
      });
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
  
      // Ensure that the file-loader is applied to the client as well
      config.resolve.fallback = { fs: false, net: false, tls: false, lokijs: false };
    
    } else {
      config.externals = [...config.externals, 'vm2'];
    }
    config.resolve.alias = {
      ...config.resolve.alias,
      'eccrypto': '@toruslabs/eccrypto',
      //'warp-contracts-old': 'warp-contracts',
    };
    return config;
  },
  eslint: { 
    ignoreDuringBuilds: true, 
  },
  images: {
    domains: ['i.ibb.co']
  },
  experimental: {
    serverComponentsExternalPackages: ["coffee-script"],
    externalDir: true,
  },
  reactStrictMode: true,
};


export default nextconfig;