const { exec } = require('child_process');

exec('npx next-sitemap', (error: any, stdout: string, stderr: string) => {
  if (error) {
    console.error(`Erreur : ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr : ${stderr}`);
    return;
  }
  console.log(`stdout : ${stdout}`);
});
