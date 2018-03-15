import React from "react";
import ReactCC from "../../ModifiedReact";

import { flushChunkNames } from "react-universal-component/server";
import flushChunks from "webpack-flush-chunks";

import App from "../shared/App";

import createCacheStream from "./cacheStream";

// can pass in max-size, otherwise defaults to 1 million
const cache = new ReactCC.ComponentCache();
const streamingStart = {};

/**
 * @param clientStats Parameter passed by hot server middleware
 */
export default ({ clientStats }) => async (req, res) => {
  const cacheStream = createCacheStream("test", cache, streamingStart);
  cacheStream.pipe(res);
  cacheStream.write(
    '<html><head><title>Page</title></head><body><div id="react-root">'
  );

  const stream = ReactCC.renderToNodeStream(<App />, cache, streamingStart);
  stream.pipe(cacheStream, { end: false });
  stream.on("end", () => {
    cacheStream.end("</div></body></html>");
  });

  const chunkNames = flushChunkNames();
  const { js, stylesheets, cssHash } = flushChunks(clientStats, { chunkNames });
};
