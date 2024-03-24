import { makeAutoObservable, runInAction } from "mobx";
import { Converter } from "../types";
import RootStore from "./root-store";
import mockData from "../components/mock-data.json";
import { v4 as uuidv4 } from "uuid";
import { defaultСurrencyСonverters } from "../components/defaultData";
import { KEY_NAME } from "../const";

class ConverterStore {
  rootStore: RootStore;
  converters: Card[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadCards();
    makeAutoObservable(this);
  }

  loadCards = () => {
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


  addCard = (firstTypeСurrency: string, secondTypeСurrency: string) => {
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

class Card {
  id: string;
  rate: number;

  firstСurrency: {
    type: string;
    value: string;
  };

  secondСurrency: {
    type: string;
    value: string;
  };

  isLoading = false;

  constructor(
    firstTypeСurrency: string,
    secondTypeСurrency: string,
    id = uuidv4()
  ) {
    this.id = id;
    this.rate = 0;
    this.firstСurrency = {
      type: firstTypeСurrency,
      value: "0",
    };
    this.secondСurrency = {
      type: secondTypeСurrency,
      value: "0",
    };

    this.getRate(firstTypeСurrency, secondTypeСurrency);
    makeAutoObservable(this, undefined, { deep: true });
  }

  getRate = async (baseCurrency: string, currencies: string) => {
    let rate: number = 0;
    try {
      this.isLoading = true;
      const api = `https://api.currencyapi.com/v3/latest?base_currency=${baseCurrency}&currencies=${currencies}`;
      console.log(api);
      // let responce = await axios('https://api.currencyapi.com/v3/latest?base_currency=USD&currencies=EUR,RUB', {
      // 		headers: {
      // 		'apikey': 'cur_live_QYUzCu3xv2X8wCveGoE7tYc7VLVaUCgJbK2XmQnt'
      // 		}
      // 	}
      // 	// curl -k -G "https://api.currencyapi.com/v3/latest?base_currency=RUB&currencies=EUR,USD" -H "apikey: cur_live_QYUzCu3xv2X8wCveGoE7tYc7VLVaUCgJbK2XmQnt"
      //   );

      let responce = await mockData;
      if (responce.status === 200) {
        runInAction(() => {
          console.log(responce);
          rate = responce.data.data.EUR.value;

          // let re= responce.json();

          this.isLoading = false;

          // this.result = response;
        });
      }
    } catch (err) {
      console.error(err);
      this.isLoading = false;
    }

    // return rate;
    this.setRate(rate);
  };

  setRate = (rate: number) => {
    this.rate = rate;
  };

  onInputChange = (inputNumber: number, valueCurrency: string, id: string) => {
    this.updateInputValue(inputNumber, valueCurrency);
  };

  updateInputValue = (inputNumber: number, valueCurrency: string) => {
    switch (inputNumber) {
      case 1: {
        this.firstСurrency.value = valueCurrency;
        this.secondСurrency.value = String(this.rate * Number(valueCurrency));
        break;
      }
      case 2: {
        this.secondСurrency.value = valueCurrency;
        this.firstСurrency.value = String(Number(valueCurrency) / this.rate);
        break;
      }
      default:
        break;
    }
  };
}

export default ConverterStore;
