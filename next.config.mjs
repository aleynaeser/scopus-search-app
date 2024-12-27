/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              expandProps: 'end',
              typescript: true,
            },
          },
        ],
      },
    );

    fileLoaderRule.exclude = /\.svg$/i;
    config.externals = [...config.externals, 'canvas', 'jsdom'];
    return config;
  },
  sassOptions: {
    prependData: `@import '@sass/mixins.scss';`,
  },
};

export default nextConfig;
