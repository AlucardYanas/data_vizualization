import { PieChart, Pie, Tooltip, Cell } from 'recharts';

interface ChartProps {
  data: any[];
}

const Chart: React.FC<ChartProps> = ({ data }) => {
  const chartData = data.reduce((acc: any, item) => {
    const status = item.status || 'Unknown';
    if (!acc[status]) acc[status] = 0;
    acc[status] += Number(item.quantity);
    return acc;
  }, {});

  const formattedData = Object.keys(chartData).map((key) => ({
    name: key,
    value: chartData[key],
  }));

  return (
    <PieChart width={400} height={400}>
      <Pie data={formattedData} dataKey="value" nameKey="name" fill="#8884d8">
        {formattedData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.name === 'Available' ? '#82ca9d' : '#d88484'} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default Chart;
