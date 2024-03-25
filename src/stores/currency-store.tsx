import { makeAutoObservable } from "mobx";
import { CurrencyItem } from "../types";
import { supportedCurrencies } from "../components/defaultData";
import RootStore from "./root-store";

class CurrencyStore {
  rootStore: RootStore;
  currencyCards: CurrencyItem[];

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    this.currencyCards = supportedCurrencies;
  }

  get selectedCurrencies() {
    return this.currencyCards.filter((item) => item.isActive);
  }

  resetActiveCurrency = () => {
    this.currencyCards.forEach((item) => {
      item.isActive = false;
    });
  };

  onCurrencyClick = (id: string) => {
    if (this.rootStore.converterStore.cardСount >= 5) {
      this.resetActiveCurrency();
      return;
    }

    const currentCard = this.currencyCards.findIndex((item) => item.id === id);
    this.currencyCards[currentCard].isActive =
      !this.currencyCards[currentCard].isActive;

    if (this.selectedCurrencies.length === 2) {
      const selectedCurrencies = this.selectedCurrencies;
      this.rootStore.converterStore.addConverter(
        selectedCurrencies[0].type,
        selectedCurrencies[1].type
      );
      this.resetActiveCurrency();
    }
  };
}

export default CurrencyStore;
