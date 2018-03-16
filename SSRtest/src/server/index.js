import React from "react";
import ReactCC from "../../ModifiedReact";

import { flushChunkNames } from "react-universal-component/server";
import flushChunks from "webpack-flush-chunks";

import App from "../shared/App";

import createCacheStream from "./cacheStream";

// can pass in max-size, otherwise defaults to 1 million
const cache = new ReactCC.ComponentCache();

const htmlStart =
  '<html><head><title>Page</title></head><body><div id="react-root">';
const htmlEnd = "</div></body></html>";

const streamingStart = {
  sliceStartCount: htmlStart.length,
  finalSliceStarts: []
};

/**
 * @param clientStats Parameter passed by hot server middleware
 */
export default ({ clientStats }) => async (req, res) => {
  const cacheStream = createCacheStream(cache, streamingStart);
  cacheStream.pipe(res);
  cacheStream.write(htmlStart);

  const stream = ReactCC.renderToNodeStream(<App />, cache, streamingStart);
  stream.pipe(cacheStream, { end: false });
  stream.on("pre-finish", () => {
    console.log("pre-finish");
  });
  stream.on("finish", () => {
    console.log("finish");
  });
  stream.on("end", () => {
    console.log("end");
    cacheStream.end(htmlEnd);
  });

  const chunkNames = flushChunkNames();
  const { js, stylesheets, cssHash } = flushChunks(clientStats, { chunkNames });
};
