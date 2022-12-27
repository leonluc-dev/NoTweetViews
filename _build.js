var file_system = require('fs');
var archiver = require('archiver');
const version = process.env.npm_package_version;
const args = process.argv.slice(2);

const packAddon = (platform) => {
  //Adjust version of manifest.json
  let manifestContent = JSON.parse(file_system.readFileSync(`dist/manifest.${platform}.json`, 'utf8'));
  manifestContent.version = version;
  file_system.writeFileSync(`dist/manifest.${platform}.json`, JSON.stringify(manifestContent, null, 2));
  
  //Archive dist folder contents
  const archive = archiver('zip');
  const output = file_system.createWriteStream(`NoTweetViews-${platform}-${version}.zip`);
  
  output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log(`${platform}-file: ${output.path}`);
  });

  archive.on('error', function(err){
    throw err;
  });

  archive.pipe(output);

  archive.glob('**/*', {
    cwd: 'dist',
    ignore: ['manifest.*.json']
  });
  archive.file(`dist/manifest.${platform}.json`, { name: "manifest.json" });
  archive.finalize();
}

console.log(args);
if(args[0] === 'pack') {
  packAddon('chrome');
  packAddon('firefox');
}