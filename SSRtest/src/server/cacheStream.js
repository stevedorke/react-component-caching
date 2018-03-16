import { Transform } from "stream";
import { create } from "domain";

const createCacheStream = (cache, streamingStart) => {
  const bufferedChunks = [];
  return new Transform({
    // transform() is called with each chunk of data
    transform(data, enc, cb) {
      // We store the chunk of data (which is a Buffer) in memory
      // console.log("data", data);
      bufferedChunks.push(data.lenth);
      // Then pass the data unchanged onwards to the next stream
      cb(null, data);
    },

    // flush() is called when everything is done
    flush(cb) {
      // for (let starts in streamingStarts.final) {
      //   let tagStack = [];
      //   let tagStart;
      //   let tagEnd;

      //   do {
      //     if (!tagStart) tagStart = start[component];
      //     else
      //       tagStart = out[tagEnd] === "<" ? tagEnd : out.indexOf("<", tagEnd);
      //     tagEnd = out.indexOf(">", tagStart) + 1;
      //     // Skip stack logic for void/self-closing elements
      //     if (out[tagEnd - 2] !== "/") {
      //       // Push opening tags onto stack; pop closing tags off of stack
      //       if (out[tagStart + 1] !== "/")
      //         tagStack.push(out.slice(tagStart, tagEnd));
      //       else tagStack.pop();
      //     }
      //   } while (tagStack.length !== 0);

      // cache component by slicing 'out'
      // cache.storage.set(component, out.slice(start[component], tagEnd));
      // }

      // console.log("final starts", streamingStart.finalSliceStarts);
      // console.log("full page", bufferedChunks.join());

      // console.log(
      //   "to be saved:",
      //   bufferedChunks
      //     .join()
      //     .slice(
      //       streamingStart.finalSliceStarts + 1,
      //       streamingStart.finalSliceStarts + 10
      //     )
      // );
      console.log("called");
      cb();
    }
  });
};

export default createCacheStream;
