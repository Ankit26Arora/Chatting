const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  // Specify additional project-specific metro configuration here
  // For example, to include custom fonts, add the 'assets' field:
  assets: ['./assets/fonts/'],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
