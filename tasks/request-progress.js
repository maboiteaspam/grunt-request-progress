
module.exports = function(grunt) {

  var request = require('request')
  var path = require('path')
  var ProgressBar = require('progress')
  var Spinner = require('cli-spinner').Spinner;
  var fs = require('fs-extra')

  grunt.registerMultiTask('request-progress', function () {
    var done = this.async();
    var options = this.options()
    var file = options.dst
    var src = options.src
    var allowOverwrite = options.allowOverwrite
    fs.exists(file, function (indeed) {
      if (indeed && !allowOverwrite) {
        grunt.log.ok('file already exists, over write is not allowed')
        return done();
        fs.removeSync(file)
      }
      fs.mkdirs(path.dirname(file), function(){
        watchProgress (request(src, options.request || {}))
          .pipe(fs.createWriteStream(file))
          .on('close', function () {
            grunt.log.ok('All done')
            done()
          })
      })
    })
  });

  function watchProgress (stream) {
    var bar
    var spin
    var readDataLength = 0
    var maxDataLength = 0
    var waitheaders = new Spinner('waiting headers.. %s');
    waitheaders.setSpinnerString('|/-\\');
    waitheaders.start();
    stream
      .on('response', function(response) {
        waitheaders.stop(true);
        if (response.headers['content-length']) {
          maxDataLength = response.headers['content-length']
          maxDataLength = parseInt(maxDataLength)
          bar = new ProgressBar('[ :bar ] :percent, still (s):eta', { total: 100, width: 20 });
        } else {
          spin = new Spinner('downloading file.. %s');
          spin.start();
        }
      })
      .on('data', function (chunk) {
        readDataLength += chunk.length
        var d = (readDataLength/maxDataLength).toFixed(4)
        if (bar && d < 1) bar.update (d)
      })
      .on('close', function () {
        if (spin) spin.stop(true);
        else bar.update (1)
      })
    return stream
  }
};
