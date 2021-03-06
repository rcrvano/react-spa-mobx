Test Single Page Application
---------------------------

## Demo
You can find demo [here](http://spa.sidorov.net)
- login: test@mail.ru
- password: TestPassword123_

## Features
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [MobX](https://mobx.js.org/)
- [i18n](https://react.i18next.com/)
- [Semantic UI](https://semantic-ui.com/)
- [SCSS](https://sass-lang.com/)
- Authorization
- Modular structure


## Installation and usage 

### Docker image
- Clone or download this repository.
- Install Docker. Please note that you may need sudo to run Docker commands.
- Build image:
```bash
docker build ./ -t test-spa-app
```
- Start on port 5001: 
```bash
docker run -d --name test-spa-app -p 5001:80 test-spa-app
```

### Running locally
- Clone or download this repository.
- Install necessary requirements: 
```bash
yarn install
```
- Start on port 5001:
```bash
yarn start
```


