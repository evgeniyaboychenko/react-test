import "./currency.css";
import { observer } from "mobx-react-lite";

interface Props {
  id: string;
  type: string;
  isActive: boolean;
  onCurrencyClick: (id: string) => void;
}

const Сurrency = observer((props: Props) => {
  const {id, type, isActive, onCurrencyClick} = props;
  console.log( isActive);

  return (
    <li onClick={()=> onCurrencyClick(id)} className={`сonverter__currencies-item ${isActive ? "is-active" : ""}`}> {type} </li>
  );
});

export default Сurrency;
