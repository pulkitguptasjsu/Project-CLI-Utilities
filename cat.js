#!/usr/bin/env node

var fs = require('fs')
  , filename = process.argv[2];
fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  console.log('OK: ' + filename);
  //console.log(data)
process.stdout.write(data + '\n')
});
