"use client";

import React from "react";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import type Entity from "@ant-design/cssinjs/es/Cache";
import { useServerInsertedHTML } from "next/navigation";
import { ConfigProvider, theme } from "antd";

const StyledComponentsRegistry = ({ children }: React.PropsWithChildren) => {
  const cache = React.useMemo<Entity>(() => createCache(), []);
  useServerInsertedHTML(() => (
    <style
      id="antd"
      dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
    />
  ));

  const { defaultAlgorithm } = theme;

  return (
    <StyleProvider cache={cache}>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "Poppins",
            colorPrimary: "#8358F9",
          },
          components: {
            DatePicker: {
              fontFamily: "Poppins",
              colorPrimary: "#8358F9",
              colorTextPlaceholder: "#9B99A9",
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </StyleProvider>
  );
};

export default StyledComponentsRegistry;
