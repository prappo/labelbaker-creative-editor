import * as Comlink from "comlink";

const PrintDynamicData = {
  init(printConfig, config, editor) {
    editor.dynamicPrint(printConfig, config);
  },
};

Comlink.expose(PrintDynamicData);
