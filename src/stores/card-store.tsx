import { v4 as uuidv4 } from "uuid";
import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

export class Card {
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
  error = "";

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

    makeAutoObservable(this, undefined, { deep: true });
  }

  loadCurrencyRate = async (baseCurrency: string, targetCurrency: string) => {
    try {
      this.isLoading = true;
      const api = `https://api.currencyapi.com/v3/latest?base_currency=${baseCurrency}&currencies=${targetCurrency}`;
      console.log(api);
      let response = await axios(
        api,
        {
          headers: {
            apikey: "cur_live_QYUzCu3xv2X8wCveGoE7tYc7VLVaUCgJbK2XmQnt",
          },
        }
      );
      if (response.status === 200) {
        runInAction(() => {
          this.rate = response.data.data[targetCurrency].value;
          this.isLoading = false;
        });
      }
    } catch (err) {
      this.isLoading = false;
      this.error = "Ошибка загрузки";
      console.error(err);
    }
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
