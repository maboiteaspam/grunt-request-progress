# grunt-request-progress
Grunt task to download a file with a progress bar. Could not find one...

## Installation

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the 
[Getting Started](http://gruntjs.com/getting-started) guide.

Run the following commands to download and install the application:

```sh
npm i grunt-request-progress --save-dev
```

Load the task with

```js
grunt.loadNpmTasks('grunt-request-progress');
```

## Documentation

Configure a task such

```js

grunt.initConfig({
  'request-progress': {
    'mp4-sample': {
      options:{
        // here lands request module options
        request: {'proxy':'http://localhost:3213'}, 
        // if file exists, overwrite ? default is `false`.
        allowOverwrite: true,
        // self explanatory. i think it supports only GET at that time.
        dst: 'test/fixtures/big_buck_bunny.mp4',
        src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
      }
    },
    // next task
    'webm-sample': {
      options:{
        request: {'proxy':'http://localhost:3213'},
        dst: 'test/fixtures/big_buck_bunny.webm',
        src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.webm'
      }
    }
  }
})

grunt.registerTask('default', [
  'request-progress:mp4-sample',
  'request-progress:webm-sample'
]);
```


## How to contribute

1. File an issue in the repository, using the bug tracker, describing the
   contribution you'd like to make. This will help us to get you started on the
   right foot.
2. Fork the project in your account and create a new branch:
   `your-great-feature`.
3. Commit your changes in that branch.
4. Open a pull request, and reference the initial issue in the pull request
   message.

## License
See the [LICENSE](./LICENSE) file.
