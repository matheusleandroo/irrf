# IRRF

<h3 align="center">
  A simple project to manage your employees
</h3>

<h1 align="center">
  <img alt="Home" title="Home" src="https://raw.githubusercontent.com/matheusleandroo/irrf/master/src/assets/dashboard.png" width="400px" />
  <img alt="Edit" title="Edit" src="https://raw.githubusercontent.com/matheusleandroo/irrf/master/src/assets/edit.png" width="400px" />
</h1>

<h1 align="center">
  <img alt="Home" title="Home" src="https://raw.githubusercontent.com/matheusleandroo/irrf/master/src/assets/dahsboard_mobile.png" width="200px" />
  <img alt="Cart" title="Cart" src="https://raw.githubusercontent.com/matheusleandroo/irrf/master/src/assets/edit_mobile.png" width="200px" />
</h1>

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes.

<h3>Prerequisites</h3>

<h4>NodeJS</h4>

You need to install NodeJS on your computer before you can use "**IRRF**". You can install NodeJS by following <a href="https://nodejs.org/en/download/package-manager/">these instructions</a>.

Once you have completed the installation process, try typing **```npm -v```** into your command line. You should get a response with the version of NodeJS.

<h4>Yarn</h4>

Once you have NodeJs instaled, you need to install Yarn. You can install Yarn by following <a href="https://yarnpkg.com/en/docs/getting-started">these instructions</a>.

After instalition, try typing **```yarn -v```** into your command line. You should get a response with the version of Yarn.

It is recommended to install the extension ESLint, Prettier, EditorConfig and edit the code editor' settings:
```
  "files.eol": "\n",
  "editor.codeActionsOnSave": { "source.fixAll.eslint": true },
```

## Deploy

After clone repository, go to folder and follow this steps:

- Run **`yarn global add json-server`** to install json-server;
- Run **`yarn`** to install dependencies;
- Run **`json-server server.json -p 3333 -d 3000`** to start api;
- Run **`yarn start`** in another terminal to start application.

Now you can use "**IRRF**".

## Coverage

<h1 align="center">
  <img alt="Coverage" title="Coverage" src="https://raw.githubusercontent.com/matheusleandroo/irrf/master/src/assets/test_coverage.png" width="400px" />
</h1>

## Built With

<ul>
  <li>TypeScript</li>
  <li>Context</li>
  <li>Axios</li>
  <li>Styled Components</li>
  <li>ESLint + Prettier + EditorConfig</li>
</ul>

## Authors

<ul>
  <li><a href="http://matheusleandro.com">Matheus Leandro</a></li>
</ul>

## License

This project is licensed under the MIT License - see the <a href="https://github.com/matheusleandroo/rocketshoes/blob/master/LICENSE">LICENSE.md</a> file for details.
