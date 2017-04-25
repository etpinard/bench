#!/usr/bin/env node

var path = require('path')
var fs = require('fs')
var start = require('./')

var argv = require('minimist')(process.argv.slice(2), {
  string: ['imageFilename', 'credentials'],
  alias: {
    credentials: ['c', 'creds'],
    imageFilename: ['o', 'output']
  },
  'default': {
    credentials: path.join('.', '.credentials.json'),
    imageFilename: 'benchmark.png'
  }
})

// TODO add support for stdin
if (argv._.length === 0) {
  console.log('Must specify a benchmark file')
  process.exit(1)
}

var creds
try {
  creds = JSON.parse(fs.readFileSync(argv.credentials), 'utf-8')
} catch (e) {
  creds = {}
}

var opts = {
  files: argv._,
  imageFilename: argv.imageFilename,
  username: process.env.PLOTLY_USERNAME || creds.username,
  apiKey: process.env.PLOTLY_API_KEY || creds.apiKey
}

start(opts, function (exitCode) {
  process.exit(exitCode)
})
