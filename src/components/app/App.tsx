import "./App.css";
import { useRef } from "react";

import RootStore from "../../stores/root-store";

import { RootStoreContext } from "../../root-store-context";
import Converter from "../converter/converter";

const App = () => {
  const store = useRef(new RootStore());
  return (
    <RootStoreContext.Provider value={store.current}>
      <Converter />
    </RootStoreContext.Provider>
  );
};

export default App;
