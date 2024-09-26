import { Card, CardHeader, CardTitle, CardContent } from '@/components/card';
import EditableTable from './EditableTable';

const TableCard: React.FC = () => {
  return (
    <Card className="my-6 shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Inventory Table</CardTitle>
      </CardHeader>
      <CardContent>
        <EditableTable />
      </CardContent>
    </Card>
  );
};

export default TableCard;
