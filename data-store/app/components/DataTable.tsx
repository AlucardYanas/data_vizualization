interface DataTableProps {
  data: any[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  if (!data.length) return null;

  const headers = Object.keys(data[0]);

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header} className="px-4 py-2">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {headers.map((header) => (
              <td key={header} className="border px-4 py-2">{row[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
