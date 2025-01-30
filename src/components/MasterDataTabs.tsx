import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UrusanTable from "./tables/UrusanTable";
import ProgramTable from "./tables/ProgramTable";

const MasterDataTabs = () => {
  return (
    <div className="w-full h-full bg-background p-6">
      <h1 className="text-2xl font-bold mb-6">Master Data Management</h1>
      <Tabs defaultValue="urusan" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="urusan">Urusan</TabsTrigger>
          <TabsTrigger value="program">Program</TabsTrigger>
        </TabsList>
        <TabsContent value="urusan">
          <UrusanTable />
        </TabsContent>
        <TabsContent value="program">
          <ProgramTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MasterDataTabs;
