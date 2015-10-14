# reads

Transform all of your inputs to a Readable stream. Wrap all the things! It
currently transforms:

- Strings, assumes they are file paths and returns `fs.createReadableStream`
- Buffers, transformed to a new "Buffered" Readable stream.
- Stream, just returns all the things.

```
npm install --save reads
```

## Usage

A single function is exposed which accepts a `string`, `buffer` or `stream` as
first argument and Stream options as a second argument. It always returns
a ReadableStream as result:

```js
'use strict';

var reads = require('reads')
  , stream;

stream = reads('/path/toa/file.js');
stream = reads(new Buffer('foo bar'));
```

## License

MIT
