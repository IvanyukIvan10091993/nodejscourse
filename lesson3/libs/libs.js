var libs = {};

libs.request = require('request');
libs.cheerio = require('cheerio');
libs.readline = require('readline');
libs.rl = libs.readline.createInterface(
  {
    input: process.stdin,
    output: process.stdout
  }
);

module.exports = libs;
