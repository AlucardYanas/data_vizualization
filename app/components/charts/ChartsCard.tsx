import { Card, CardHeader, CardTitle, CardContent } from '@/components/card';
import Status from './Status';
import FulfillmentCenter from './FulfilmentCenterChart';
import { useDataStore } from '../../dataStore';

const ChartsCard: React.FC = () => {
  const { data } = useDataStore();
  return (
    <Card className="my-6 shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Inventory Charts</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <Status data={data} />
        <FulfillmentCenter data={data} />
      </CardContent>
    </Card>
  );
};

export default ChartsCard;
