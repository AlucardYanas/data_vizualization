import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useDataStore } from '../store/dataStore';
import Stats from "./Stats";


const TableCard: React.FC = () => {
  const { data } = useDataStore();


  return (
    <Card className="my-6 shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Inventory Table</CardTitle>
      </CardHeader>
      <CardContent>
        <Stats data={data}/>
      </CardContent>
    </Card>
  );
};

export default TableCard;
