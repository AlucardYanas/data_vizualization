import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import type { ProductData } from '../types/dataTypes';

interface ChartProps {
  data: ProductData[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const StatusChart: React.FC<ChartProps> = ({ data }) => {
  
  if (!data || data.length === 0) {
    return <p>No data available</p>; 
  }


  const chartData = data.reduce<Record<string, number>>((acc, item) => {
    const status = item['Status'] || 'Unknown';
    if (!acc[status]) acc[status] = 0;
    acc[status] += Number(item['Qty']) || 0;
    return acc;
  }, {});


  const formattedData = Object.keys(chartData).map((key) => ({
    name: key,
    value: chartData[key],
  }));

  return (
    <div className="my-4">
      <h2 className="text-xl font-bold">Product Distribution by Status</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={formattedData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          label
        >
          {formattedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default StatusChart;
