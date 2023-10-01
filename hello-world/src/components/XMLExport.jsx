import React from "react";

export default function XMLExport(props) {
  function convertXML(data, tagName, arrayElementTag = "element", spaces = 0) {
    const tag = tagName
      .replace(/[^_a-zA-Z 0-9:\-\.]/g, "")
      .replace(/^([ 0-9-:\-\.]|(xml))+/i, "")
      .replace(/ +/g, "-");

    const indentSpaces = Array(spaces + 1).join(" ");

    if (data === null || data === undefined) {
      return `${indentSpaces}<${tag} />`;
    }

    const content =
      Object.prototype.toString.call(data) === "[object Array]"
        ? data
            .map((item) =>
              convertXML(item, arrayElementTag, arrayElementTag, spaces + 2)
            )
            .join("\n")
        : typeof data === "object"
        ? Object.keys(data)
            .map((key) => [key, data[key]])
            .map(([key, value]) =>
              convertXML(value, key, arrayElementTag, spaces + 2)
            )
            .join("\n")
        : indentSpaces +
          "  " +
          String(data).replace(/([<>&])/g, (_, $1) => {
            switch ($1) {
              case "<":
                return "&lt;";
              case ">":
                return "&gt;";
              case "&":
                return "&amp;";
              default:
                return "";
            }
          });

    const contentWithWrapper = `${indentSpaces}<${tag}>
            ${content}
            ${indentSpaces}</${tag}>`;

    return contentWithWrapper;
  }

  function createXMLData(data) {
    const content = `<?xml version="1.0" encoding="utf-8"?><!DOCTYPE root>
    ${convertXML(data, "root")}
    `;

    const dataStr =
      "data:text/application/xml;charset=utf-8," + encodeURIComponent(content);
    let downloadData = document.getElementById("downloadData");
    downloadData.setAttribute("href", dataStr);
    downloadData.setAttribute("download", "xmlData.xml");
    downloadData.click();
    console.log(content);
  }

  return (
    <>
      <a id="downloadData" style={{ display: "none" }}></a>
      <button
        onClick={() => {
          createXMLData(props.data);
        }}
      >
        download XML
      </button>
    </>
  );
}
