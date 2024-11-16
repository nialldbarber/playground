const path = require("node:path");
const { getDefaultConfig } = require("@react-native/metro-config");
const withStorybook = require("@storybook/react-native/metro/withStorybook");

const config = getDefaultConfig(__dirname);

module.exports = withStorybook(config, {
	// Set to false to remove storybook specific options
	// you can also use a env variable to set this
	enabled: true,
	// Path to your storybook config
	configPath: path.resolve(__dirname, "./.storybook"),

	// Optional websockets configuration
	// Starts a websocket server on the specified port and host on metro start
	// websockets: {
	//   port: 7007,
	//   host: 'localhost',
	// },
});
