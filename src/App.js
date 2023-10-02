import "./App.css";
import ComponentToPrint from "../src/component/ComponentToPrint";
import { useReactToPrint } from "react-to-print";
import React, { useRef } from "react";

import { StyledEngineProvider } from "@mui/material/styles";

function App() {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      {/* <Demo /> */}
      <ComponentToPrint />
    </>
  );
}

export default App;
