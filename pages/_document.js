import Document, { Html, Head, Main, NextScript } from "next/document";
import { useDispatch, useSelector } from "react-redux";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <div id="tooltip" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
