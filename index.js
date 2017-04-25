var karma = require('karma')

function start (opts, cb) {
  var server = new karma.Server(makeKarmaOpts(opts), cb)
  server.start()
}

function makeKarmaOpts (opts) {
  var out = {
    frameworks: ['benchmark', 'browserify'],
    reporters: ['benchmark', 'benchmark-plotly'],

    files: opts.files,
    preprocessors: {},

    benchmarkPlotlyReporter: {
      username: opts.username,
      apiKey: opts.apiKey,
      cloudFilename: null,
      imageFilename: opts.imageFilename
    },

    browserify: {
      debug: true
    },

    basePath: '.',
    browsers: ['Chrome'],
    port: 9876,
    colors: true,
    autoWatch: false,
    singleRun: true,
    logLevel: karma.constants.LOG_INFO,
    browserConsoleLogOptions: { level: 'log' }
  }

  opts.files.forEach(function (f) {
    out.preprocessors[f] = ['browserify']
  })

  return out
}

module.exports = start
