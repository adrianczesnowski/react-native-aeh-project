const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);

// ⚠️  Turn off the new “exports” & symlink logic that causes the duplicate load
config.resolver.unstable_enablePackageExports = false;
config.resolver.unstable_enableSymlinks      = false;

// (optional, but handy if you hit “module.cjs not found”)
config.resolver.sourceExts.push('cjs');

module.exports = config;