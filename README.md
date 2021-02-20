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

Realization
---------------------------
Following Node.js modules are used: 

- Express.js for creating web-server, which provides two API methods (/all & /parse/etsy)

- sqlite3 & bluebird for storing data in the SQLite3 database:

- needle for fetch data from a remote host

- cheerio for parsing HTML-page using jQuery-like syntax
  
The main parsing script for ETSY.com you can find here 
[parsers/etsy.js](https://github.com/rcrvano/texel_task2/blob/master/parsers/etsy.js)


Client side is implemented using jQuery, Bootstrap & Bootstrap tables

