import { useGlobalContext } from 'state/context';
import { roundToTwo } from 'utils/utils';

export default function PriceUSD({ value }) {
  const {
    state: { currency },
  } = useGlobalContext();
  const valueUSD = currency ? roundToTwo(parseFloat(value) * parseFloat(currency.priceUSD)) : 0;
  return <span>$ {valueUSD}</span>;
}
