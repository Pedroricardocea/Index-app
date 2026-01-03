const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const tailwindConfigPath = path.join(rootDir, 'tailwind.config.js');
const babelConfigPath = path.join(rootDir, 'babel.config.js');
const packageJsonPath = path.join(rootDir, 'package.json');

let hasError = false;

function checkFile(filePath, searchString) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    hasError = true;
    return;
  }
  if (searchString) {
    const content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes(searchString)) {
      console.error(`❌ File ${filePath} does not contain "${searchString}"`);
      hasError = true;
      return;
    }
  }
  console.log(`✅ Verified ${path.basename(filePath)}`);
}

console.log('Starting automated verification...');

// Verify Tailwind Config
checkFile(tailwindConfigPath, 'nativewind/preset');

// Verify Babel Config
checkFile(babelConfigPath, 'nativewind/babel');

// Verify Package JSON dependencies
try {
  const packageJson = require(packageJsonPath);
  if (!packageJson.dependencies['@index/logic']) {
    console.error('❌ @index/logic dependency missing in package.json');
    hasError = true;
  } else {
    console.log('✅ Verified @index/logic dependency');
  }
} catch (e) {
  console.error('❌ Could not read package.json');
  hasError = true;
}

if (hasError) {
  console.error('⚠️ Verification failed');
  process.exit(1);
} else {
  console.log('🎉 Verification successful');
}
