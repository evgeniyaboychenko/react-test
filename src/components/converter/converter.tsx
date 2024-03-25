
import Currencies from "../currencies/currencies";
import Card from "../card/card";
import { observer } from 'mobx-react-lite';
import { useStores } from '../../root-store-context';

const Converter = observer(() => {
   const rootStore = useStores();
   return (
      <section className="сonverter">
        <h1>Конвертация валют</h1>
        <p className="сonverter__message">Выберите пару валют для конвертации</p>
        <Currencies CurrencyItem={rootStore.currencyStore.currencyCards} onCurrencyClick = {rootStore.currencyStore.onCurrencyClick}/>
        <ul className="сonverter__card-list">
          {rootStore.converterStore.converters.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                rate={item.rate}
                isLoading={item.isLoading}
                error = {item.error}
                firstСurrency={item.firstСurrency}
                secondСurrency={item.secondСurrency}
                onRemoveButtonClick = {rootStore.converterStore.onRemoveButtonClick}
                onInputChange= {item.onInputChange}
                loadCurrencyRate = {item.loadCurrencyRate}
              />
            ))}
        </ul>
        <p className="сonverter__message">{rootStore.converterStore.cardСount === 5 ? 'Количество карточек слишком большое. Удалите ненужные карточки с парами валют. И снова выберете необходимую пару валют' : ''}</p>
      </section>
  );
});

export default Converter;

