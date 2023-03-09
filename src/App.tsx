import { useCallback, useEffect, useMemo, useState } from "react";
import { IPortableBlock } from "./core/types";
import { renderPortableArr } from "./core/helpers";

function App() {
  const [textAreaContent, setTextAreaContent] = useState("");

  const [errorParsing, setErrorParsing] = useState(false);

  const portableArr = useMemo(() => {
    try {
      const arr = JSON.parse(textAreaContent);
      setErrorParsing(false);
      return renderPortableArr(arr);
    } catch (error) {
      setErrorParsing(true);
      console.log(error);

      return [];
    }
  }, [textAreaContent]);

  useEffect(() => {
    if (!portableArr.length) {
      return;
    }
    console.log(portableArr);

    const dom = document.querySelector(".render-result");
    if (!dom) return;
    dom.innerHTML = "";
    portableArr.forEach((n) => {
      n && dom?.append(n);
    });
  }, [portableArr]);

  return (
    <>
      <main
        className="main"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          placeItems: "stretch",
          width: "100%",
          minHeight: 400,
        }}
      >
        <textarea
          value={textAreaContent}
          onChange={(e) => {
            setTextAreaContent(e.target.value);
          }}
        ></textarea>
        <div
          className="render-result"
          // dangerouslySetInnerHTML={{ __html: portableArr.toString() }}
        >
          {/* {portableArr as any} */}
        </div>
      </main>
      <p>{errorParsing && "Error"}</p>
    </>
  );
}

export default App;
