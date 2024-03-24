import './App.css';
import { useRef } from 'react';

import RootStore from "../../stores/root-store"

import { RootStoreContext } from '../../root-store-context';
import Converter from "../converter/converter";

const App = () => {
  const store = useRef(new RootStore());
  console.log(store);
   return (
    <RootStoreContext.Provider value={store.current}>
      <Converter/>
    </RootStoreContext.Provider>
  );
};


export default App;

// или вот так разобраться есть ли разница???
// const App = () => {
//   return (
//    <RootStoreContext.Provider value={new RootStore()}>
//      <Converter/>
//    </RootStoreContext.Provider>
//  );
// };

// export default App;

