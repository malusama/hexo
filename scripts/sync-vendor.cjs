const fs = require('node:fs');
// Keep the served copies in sync with the audited, locked npm packages.
for (const [source, destination] of [
  ['node_modules/jquery/dist/jquery.min.js', 'themes/landscape/source/js/jquery.min.js'],
  ['node_modules/jquery/LICENSE.txt', 'themes/landscape/source/js/JQUERY-LICENSE.txt'],
  ['node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js', 'themes/landscape/source/fancybox/jquery.fancybox.pack.js'],
  ['node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.css', 'themes/landscape/source/fancybox/jquery.fancybox.css']
]) fs.copyFileSync(source, destination);
