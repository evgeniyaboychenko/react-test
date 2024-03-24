import "./card.css";
import { useEffect } from "react";
import { observer } from 'mobx-react-lite';

interface Props {
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
  onRemoveButtonClick: (id: string) => void;
  // onfirstInputChange: (value: string,id: string )=> void;
  // onsecondInputChange: (value: string,id: string )=> void;
  onInputChange: (inputNumber: number, value: string,id: string )=> void;
  // onButtonUpdateClick: (id: string) => void;

  // loadCurrencyRate: (id: string) => void;
  // getRate: (baseCurrency: string, currencies: string) => void;
  
}

const Card = observer((props:Props) => {
  const {
    id,
    firstСurrency,
    secondСurrency,
    onRemoveButtonClick,
    onInputChange,
  } = props;

  // useEffect(()=> {
  //   loadCurrencyRate(id);
  // }, []);

  return (
    <li className="сonverter__card-item">
      <fieldset className="сonverter__fieldset">
        <legend>Конвертер валют</legend>
          <label className="сonverter__card-label">Введите сумму: 
            <div className="сonverter__item-wrap">
              <input type='number' className="сonverter__card-input" onInput={(evt)=>onInputChange(1, (evt.target as HTMLInputElement).value, id)} value={firstСurrency.value}/>
              <span className="сonverter__currency-type">{firstСurrency.type}</span>
            </div>
          </label>
          <label className="сonverter__card-label">Введите сумму:
            <div className="сonverter__item-wrap">
              <input type='number' className="сonverter__card-input" onInput={(evt)=>onInputChange(2, (evt.target as HTMLInputElement).value , id)} value={secondСurrency.value}/>
              <span className="сonverter__currency-type">{secondСurrency.type}</span>
            </div>
          </label>
      <button type="button"className="сonverter__card-btn-del" onClick={()=> onRemoveButtonClick(id)}></button>
      </fieldset>
    </li>
  );
});

export default Card;
