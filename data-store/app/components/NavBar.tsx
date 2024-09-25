import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { parseData } from '../utils/dataParcer'; // Импорт функции для парсинга данных

interface NavbarProps {
  onFileUpload: (parsedData: any[]) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onFileUpload }) => {
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const parsedData = await parseData(file); // Используем функцию parseData
        onFileUpload(parsedData); // Передаем распарсенные данные в HomePage через пропс
      } catch (error) {
        console.error('Error parsing file:', error);
      }
    }
  };

  return (
    <div className="bg-gray-900 text-white py-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <span className="text-2xl font-bold ml-6">Inventory Dashboard</span>
          </NavigationMenuItem>
          <NavigationMenuItem className="ml-auto mr-6">
            <Button>
              <label>
                Upload File
                <input
                  type="file"
                  accept=".csv,.xlsx"
                  onChange={handleFileChange} // Обрабатываем загрузку файла
                  className="hidden"
                />
              </label>
            </Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Navbar;
