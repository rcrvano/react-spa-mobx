Task 2. “Time for shopping!”
---------------------------

Sometimes we all need to choose and buy something online, but we all know how time consuming it is - let’s try to automate it in some way. Your task is to implement a little helper using any language that does the following:

- Parse an online shop’s catalog (any shop you like)

- Identify products you need based on any criteria you can come up with (e.g. size, price, color, type, etc.)

- Store results in an SQLite database (e.g. id, title, price, link to the product’s page)

- Optionally save product images

Requirements:

- You can use any publicly available API or library

- Parsing should be performed on HTML page and not on machine-readable format

Demo
---------------------------
You can find demo [here](http://sidorov.net:3001)

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



Installation
---------------------------
1) Clone from git repository

2) Run

``` npm install ```

3) After that

``` npm start ```

4) Open 

``` http://localhost:3001/ ```

