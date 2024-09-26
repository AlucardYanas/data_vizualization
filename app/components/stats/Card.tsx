import { Card, CardHeader, CardTitle, CardContent } from '@/components/card';
import { useDataStore } from '../../dataStore';
import Stats from './Stats';

const StatsCard: React.FC = () => {
  const { data } = useDataStore();

  return (
    <Card className="my-6 shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Inventory statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <Stats data={data} />
      </CardContent>
    </Card>
  );
};

export default StatsCard;
