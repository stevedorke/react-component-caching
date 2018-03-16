import { Transform } from "stream";
import { create } from "domain";

const createCacheStream = (cache, streamingStart) => {
  const bufferedChunks = [];
  return new Transform({
    // transform() is called with each chunk of data
    transform(data, enc, cb) {
      // We store the chunk of data (which is a Buffer) in memory
      bufferedChunks.push(data);
      // Then pass the data unchanged onwards to the next stream
      cb(null, data);
    },

    // flush() is called when everything is done
    flush(cb) {
      // We concatenate all the buffered chunks of HTML to get the full HTML
      // then cache it at "key"

      // console.log(cache);
      // console.log(bufferedChunks.join());
      // cache.set(key, Buffer.concat(bufferedChunks));
      // console.log("final", streamingStart.finalSliceStart);
      console.log("to be saved:", bufferedChunks.join().slice(112, 170));
      cb();
    }
  });
};

export default createCacheStream;
