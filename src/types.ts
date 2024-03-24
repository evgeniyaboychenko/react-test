export interface CurrencyItem {
	id: string,
	type: string;
	isActive: boolean;
  };

export interface Converter {
	id: string,
	rate: number,
	firstСurrency: {
		type: string,
		value: string,
	},
	secondСurrency: {
		type: string,
		value: string,
	}
};