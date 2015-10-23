'use strict';

var Readable = require('stream').Readable
  , fs = require('fs');

/**
 * Buffered is a simple Readable stream which writes the buffer to the stream
 * and cleans up after it self.
 *
 * @constructor
 * @param {Buffer} data The buffer that needs to be send as readable stream.
 * @param {Object} options Additional Readable stream configuration.
 * @api private
 */
function Buffered(data, options) {
  Readable.call(this, options || {});
  this._data = data;
}

//
// Us the utils.inherit to prevent broken inheritance caused by Node shitty
// EventEmitter setup. Do it before setting our own property.
//
require('util').inherits(Buffered, Readable);

/**
 * Handle the Read requests on the Stream interface.
 *
 * @api private
 */
Buffered.prototype._read = function _read() {
  this.push(this._data);

  //
  // Set the data to null so the next time _read is called it knows that we have
  // no more data to send.
  //
  this._data = null;
};

/**
 * The public interface that will always return a Readable stream regardless
 * what source of data was used. Making it dead easy to pass data around.
 *
 * @param {Mixed} what The thing that should used as data source.
 * @param {Object} options Additional options for stream creation.
 * @returns {ReadableStream}
 * @api public
 */
module.exports = function reads(what, options) {
  if ('string' === typeof what) return fs.createReadStream(what, options);
  if (what instanceof Readable) return what;

  return new Buffered(what, options);
};
