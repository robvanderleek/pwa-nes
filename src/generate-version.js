const execSync = require('child_process').execSync;
const output = execSync('git rev-parse --short HEAD', {encoding: 'utf-8'});
console.log('const version = {\n    "revision": "' + output.trim() + '",\n    "year": "' + new Date().getFullYear() + '"\n}\n\nexport default version;');
