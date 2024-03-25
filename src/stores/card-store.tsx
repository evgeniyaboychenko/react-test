import { v4 as uuidv4 } from "uuid";
import { makeAutoObservable, runInAction } from "mobx";
import mockData from "../components/mock-data.json";

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
  
	loadCurrencyRate = async (baseCurrency: string, currencies: string) => {
	//   let rate: number = 0;
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
			this.rate = responce.data.data.EUR.value;
			this.isLoading = false;
		  });
		}
	  } catch (err) {
		this.isLoading = false;
		this.error = "ЧТО-ТО ПОШЛО НЕ ТАК";
		console.error(err);
	  }
	 
	};
  
	// setRate = (rate: number) => {
	//   this.rate = rate;
	// };
  
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