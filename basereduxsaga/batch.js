const { exec } = require('child_process');

exec('node scripts/start.js --appIndex base.js', (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${err}`);
    return;
  }

  console.log(`Number of files ${stdout}`);
});