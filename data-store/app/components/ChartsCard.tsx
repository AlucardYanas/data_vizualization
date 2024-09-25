import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import StatusChart from './StatusChart';
import FulfillmentCenterChart from './FulfilmentCenterChart';
import { useDataStore } from "../store/dataStore";
import { memo, useMemo } from "react";

const ChartsCard: React.FC = () => {
  const { data } = useDataStore();

  const memoizedData = useMemo(() => data, [data]);

  return (
    <Card className="my-6 shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Inventory Charts</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-1">
        <StatusChart data={memoizedData} />
        <FulfillmentCenterChart data={memoizedData} />
      </CardContent>
    </Card>
  );
};

export default memo(ChartsCard);
