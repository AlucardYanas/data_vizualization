import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { ProductData } from '../types/dataTypes';
import { memo, useMemo } from "react";

interface ChartProps {
  data: ProductData[];
}

const FulfillmentCenterChart: React.FC<ChartProps> = ({ data }) => {

  const formattedData = useMemo(() => {
    const chartData = data.reduce<Record<string, number>>((acc, item) => {
      const center = item['Fulfilment centr'] || 'Unknown';
      if (!acc[center]) acc[center] = 0;
      acc[center] += Number(item['Qty']) || 0;
      return acc;
    }, {});

    return Object.keys(chartData).map((key) => ({
      name: key,
      value: chartData[key],
    }));
  }, [data]);

  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <div className="my-4">
      <h2 className="text-xl font-bold">Product Distribution by Fulfillment Center</h2>
      <BarChart width={600} height={300} data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default memo(FulfillmentCenterChart);
