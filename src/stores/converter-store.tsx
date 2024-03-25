import { makeAutoObservable} from "mobx";
import { Converter } from "../types";
import RootStore from "./root-store";
import { defaultСurrencyСonverters } from "../components/defaultData";
import { KEY_NAME } from "../const";
import {Card} from "../stores/card-store";

class ConverterStore {
  rootStore: RootStore;
  converters: Card[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadConverters();
    makeAutoObservable(this);
  }

  loadConverters = () => {
    const savedConverters: string | null = localStorage.getItem(KEY_NAME);
    let converters: Converter[] = savedConverters ? JSON.parse(savedConverters) : defaultСurrencyСonverters;

    if (converters.length === 0) {
      converters = defaultСurrencyСonverters;
    }
    converters.forEach((converter) => {
      let card = new Card(
        converter.firstСurrency.type,
        converter.secondСurrency.type
      );
      this.converters.push(card);
    });

    if (savedConverters === null || JSON.parse(savedConverters).length === 0) {
      this.saveStorage(this.converters);
    }
  };

  saveStorage = (converters: Converter[]) => {
    const newConverters = converters.map((card) => {
      return {
        id: card.id,
        rate: card.rate,
        firstСurrency: {
          type: card.firstСurrency.type,
          value: card.firstСurrency.value,
        },
        secondСurrency: {
          type: card.secondСurrency.type,
          value: card.secondСurrency.value,
        },
      };
    });

    localStorage.setItem(
      KEY_NAME,
      JSON.stringify(newConverters)
    );
  }


  addConverter = (firstTypeСurrency: string, secondTypeСurrency: string) => {
    const converter = new Card(firstTypeСurrency, secondTypeСurrency);
    this.converters.push(converter);
    this.saveStorage(this.converters);
  };

  get cardСount() {
    return this.converters.length;
  }

  onRemoveButtonClick = (id: string) => {
    this.converters = this.converters.filter((item) => item.id !== id);
    this.saveStorage(this.converters);
  };
}

export default ConverterStore;
