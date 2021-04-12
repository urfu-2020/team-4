# Kilogram

Simple opensource social network, designed by students in Yandex Course

## Requirements

- You need NodeJS to be installed on your device

## Quick start

- **npm install** --dev - install all dependencies needed for development
- **npm run build** - compiles TypeScript in /dist directory
- **npm run start** - start application
- **npm run test** - `[not working]` run tests

If you have Docker, you can build and run app in the container:
1. docker build --tag kilogram:0.0-local .
2. docker run --rm -d -p 80:80 kilogram:0.0-local

## Available commands

| Command      | Action                                                            |
| ------------ | ----------------------------------------------------------------- |
| build        | Build the application                                             |
| build:ts     | Compiling TypeScript sources                                      |
| build:static | Copying statics to dist/                                          |
| dev          | Start application for development (with automatically restarting) |
| start        | Start application                                                 |
| surge        | Deploy statics to Surge                                           |
| lint         | Runs all linters below                                            |
| lint:html    | HTML Linting                                                      |
| lint:css     | CSS Linting                                                       |
| lint:js      | JS Linting                                                        |
| lint:ts      | TS Linting                                                        |
| format       | Code Formatting                                                   |

## Examples

See example of deployed projects:
- [Stable (master branch)](https://kilogram-team4-master.herokuapp.com/)
- [Develop branch](https://kilogramcd-team4-develop.herokuapp.com/)


## Links

- [Dashboard](https://trello.com/b/xUnRQrQE/kilogram)
- [Slides Repository](https://github.com/urfu-2020/slides)

See chat for actual actions
