# Historical Hexo blog dependency upgrade

This is the historical source project, not the current Hugo source. The active `milk` theme and original article URLs remain unchanged. Do not run `hexo deploy` against the current site: this old content set would replace newer published Hugo articles. The supplied CI template only audits and builds; it is not installed because the current GitHub OAuth token lacks workflow scope.

## Upgrades (2026-09-07)

- Hexo 3.9.0 -> 8.1.2. This includes fixes newer than the `include_code` path-traversal fix in 7.2.0.
- Upgrade all ten declared Hexo packages, including EJS/Marked/Stylus renderers, generators, git deployer and server. Regenerate the old lockfile and update Morgan/on-headers to patched versions.
- Upgrade Landscape's Grunt 0.4.2 -> 1.6.3 and all four supporting build plugins; add its own lockfile.
- Upgrade Landscape's browser jQuery 2.0.3 -> 3.7.1 and Fancybox 2.1.5 -> 3.5.7 for jQuery 3 compatibility. Assets are self-hosted and versions are declared in the root package manifest. jQuery 3.7.1 is selected to retain the older theme's API compatibility while including the security fixes; it is not the newest major. Preserve upstream license headers.
- Replace the vendored Mobi CSS Gulp 3 / retired `mobi-util-build-css` build chain with current PostCSS, preset-env, import, pxtorem and cssnano; add a lockfile and regenerate the CSS. The CSS plugins and active Milk template remain intact.
- Add weekly Dependabot scans covering the root and both nested dependency trees. The CI template uses Node 24 and pins GitHub Actions by commit SHA. Copy `docs/ci-workflow.yml.example` to `.github/workflows/check.yml` using a workflow-authorized login to activate it.

## Validation

All three npm dependency trees report **zero known vulnerabilities** after installation at review time. Both Milk and Landscape generate successfully on Node 24. The Mobi CSS build succeeds. The active Milk page was also opened in the browser at mobile width without horizontal overflow.

The old source has many age-related APIs and deprecation warnings; those warnings are distinct from known security advisories. No change here is evidence that the live Hugo generator has been upgraded.

Sources: repository Dependabot alerts; npm audit; [jQuery XSS advisory](https://github.com/jquery/jquery/security/advisories/GHSA-gxr4-xjj5-5px2).
