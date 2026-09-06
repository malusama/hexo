// Replaces the retired Gulp 3 / mobi-util-build-css dependency chain.
const fs = require('node:fs/promises');
const path = require('node:path');
const postcss = require('postcss');
const imports = require('postcss-import');
const presetEnv = require('postcss-preset-env');
const pxtorem = require('postcss-pxtorem');
const cssnano = require('cssnano');
(async () => {
  const from = path.join(__dirname, 'src/mobi.css');
  const css = await fs.readFile(from, 'utf8');
  await fs.mkdir(path.join(__dirname, 'dist'), { recursive: true });
  for (const minify of [false, true]) {
    const to = path.join(__dirname, `dist/mobi${minify ? '.min' : ''}.css`);
    const colors = {postcssPlugin: 'mobi-legacy-colors', Declaration(decl) {
      decl.value = decl.value.replace(/color\((var\([^)]*\)|hsl\([^)]*\)|[a-z]+) lightness\(-5%\)\)/g, (_, base) => `hsl(from ${base} h s calc(l - 5))`);
    }};
    const plugins = [imports(), colors, presetEnv({stage: 0}), pxtorem({rootValue:16,propList:['*']})];
    if (minify) plugins.push(cssnano());
    const result = await postcss(plugins).process(css, {from,to,map:{inline:false}});
    await fs.writeFile(to, result.css.replace(/\r\n/g, '\n').replace(/[ \t]+$/gm, '')); 
    if (result.map) await fs.writeFile(to+'.map',result.map.toString());
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
