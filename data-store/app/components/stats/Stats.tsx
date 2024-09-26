import { ProductData } from '../../types/dataTypes';

interface StatsProps {
  data: ProductData[];
}

const Stats: React.FC<StatsProps> = ({ data }) => {
  const totalItems = data.reduce((acc, item) => {
    const quantity = Number(item['Qty']);
    return acc + (isNaN(quantity) ? 0 : quantity);
  }, 0);

  const avgPrice = (
    data.reduce((acc, item) => {
      const price = Number(item['Value']);
      return acc + (isNaN(price) ? 0 : price);
    }, 0) / data.length
  ).toFixed(2);

  const totalValue = data.reduce((acc, item) => {
    const value = Number(item['Value']);
    return acc + (isNaN(value) ? 0 : value);
  }, 0);

  return (
    <div className="my-4">
      <h2 className="text-xl font-bold">Summary</h2>
      <p>Total Items (Qty): {totalItems}</p>
      <p>Average Price: {isNaN(Number(avgPrice)) ? 'N/A' : avgPrice}</p>
      <p>Total Inventory Value: {totalValue}</p>
    </div>
  );
};

export default Stats;
