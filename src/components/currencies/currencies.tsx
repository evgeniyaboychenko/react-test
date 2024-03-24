import "./currencies.css";
import Сurrency from "../currency/currency";
import { CurrencyItem } from "../../types";
import { observer } from "mobx-react-lite";
// import CurrencyStore from "../../stores/currency-store";


interface Props {
  CurrencyItem: CurrencyItem[];
  onCurrencyClick: (id: string) => void;
}

const Currencies = (props: Props) => {
  const {CurrencyItem,onCurrencyClick} = props;
  return (
    <ul className="сonverter__currencies-list">
        {CurrencyItem.map((item) => (
          <Сurrency
            key={item.id}
            id={item.id}
            type={item.type}
            isActive={item.isActive}
            onCurrencyClick = {onCurrencyClick}
          />
        ))}
    </ul>
  );
};

export default Currencies;
