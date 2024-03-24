import ConverterStore from "./converter-store";
import CurrencyStore from "./currency-store";

class RootStore {
  converterStore: ConverterStore;
  currencyStore: CurrencyStore;

  constructor() {
    this.converterStore = new ConverterStore(this);
    this.currencyStore = new CurrencyStore(this);
  }
}

export default RootStore;
