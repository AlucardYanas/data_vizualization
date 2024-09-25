import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import EditableTable from './EditableTable';
import { useDataStore } from '../store/dataStore';
import { useMemo } from 'react';

const TableCard: React.FC = () => {
  const { data, setData } = useDataStore();

  // Мемоизируем данные для таблицы
  const memoizedData = useMemo(() => data, [data]);

  // Передаем как data, так и setData для работы с обновлениями
  return (
    <Card className="my-6 shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Inventory Table</CardTitle>
      </CardHeader>
      <CardContent>
        <EditableTable data={memoizedData} setData={setData} />
      </CardContent>
    </Card>
  );
};

export default TableCard;
