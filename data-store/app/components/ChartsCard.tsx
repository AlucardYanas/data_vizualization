import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import StatusChart from './StatusChart';
import FulfillmentCenterChart from './FulfilmentCenterChart';
import { useDataStore } from "../store/dataStore";

const ChartsCard: React.FC = () => {
  const { data} = useDataStore();
  return (
    <Card className="my-6 shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Inventory Charts</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatusChart data={data}/>
        <FulfillmentCenterChart data={data}/>
      </CardContent>
    </Card>
  );
};

export default ChartsCard;
