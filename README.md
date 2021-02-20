Test SPA Application
---------------------------

## Features
- React
- TypeScript
- MobX
- i18n
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
- Start on port 8000: 
```bash
docker run -d --name test-spa-app -p 8000:80 test-spa-app
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

Demo
---------------------------
You can find demo [here](http://test-spa-app.sidorov.net)

