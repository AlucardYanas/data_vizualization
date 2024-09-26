import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { parseData } from '../utils/dataParcer'; // Импорт функции для парсинга данных
import { ProductData } from "../types/dataTypes";

interface NavbarProps {
  onFileUpload: (parsedData: ProductData[]) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onFileUpload }) => {
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const parsedData = await parseData(file); 
        onFileUpload(parsedData); 
      } catch (error) {
        console.error('Error parsing file:', error);
      }
    }
  };

  return (
    <div className="bg-gray-900 text-white py-4 gap-10">
      <NavigationMenu>
        <NavigationMenuList className="gap-10">
          <NavigationMenuItem>
            <span className="text-2xl font-bold ml-6">Inventory Dashboard</span>
          </NavigationMenuItem>
          <NavigationMenuItem className="ml-auto mr-6">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold">
              <label>
                Upload File
                <input
                  type="file"
                  accept=".csv,.xlsx"
                  onChange={handleFileChange} 
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
