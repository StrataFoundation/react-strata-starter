const webpack = require("webpack");
const path = require("path");

module.exports = {
  webpack: {
    configure: (config, { env, paths }) => {
      config.module.rules = [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto",
        },
        ...config.module.rules.map((rule) => {
          if (rule.oneOf instanceof Array) {
            rule.oneOf[rule.oneOf.length - 1].exclude = [
              /\.(js|mjs|jsx|cjs|ts|tsx)$/,
              /\.html$/,
              /\.json$/,
            ];
          }
          return rule;
        }),
      ];

      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve.fallback,
          process: require.resolve("process/browser"),
          assert: require.resolve("assert"),
          buffer: require.resolve("buffer"),
          stream: require.resolve("stream-browserify"),
          crypto: require.resolve("crypto-browserify"),
          os: false,
          fs: false,
        },
        alias: {
          ...config.resolve.alias,
          "@solana/wallet-adapter-react": path.resolve(
            "./node_modules/@solana/wallet-adapter-react"
          ),
        },
      };

      const scopePluginIndex = config.resolve.plugins.findIndex(
        ({ constructor }) =>
          constructor && constructor.name === "ModuleScopePlugin"
      );

      config.resolve.plugins.splice(scopePluginIndex, 1);

      config.plugins = [
        ...config.plugins,
        new webpack.ProvidePlugin({
          process: "process/browser",
        }),
      ];

      config.ignoreWarnings = [/Failed to parse source map/];

      return config;
    },
  },
};
