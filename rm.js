#!/usr/bin/env node

var fs = require("fs"),
        filename = process.argv[2];

fs.unlinkSync(filename);

