import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../shadcn/tabs";
import OptionTab from "./OptionTab";

const SetRoomOption = () => {
  return (
    <div className="flex w-full max-h-100 max-w-sm flex-col gap-6 SetRoomOption">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="count">문제 개수</TabsTrigger>
          <TabsTrigger value="category">카테고리</TabsTrigger>
          <TabsTrigger value="time">제한시간(초)</TabsTrigger>
        </TabsList>
        <TabsContent value="count">
          <OptionTab
            tableName={"count_master"}
            keyColumn={"seq"}
            valueColumn={"countName"}
          />
        </TabsContent>
        <TabsContent value="category">
          <OptionTab
            tableName={"category_master"}
            keyColumn={"categoryID"}
            valueColumn={"categoryName"}
          />
        </TabsContent>
        <TabsContent value="time">
          <OptionTab
            tableName={"time_master"}
            keyColumn={"seq"}
            valueColumn={"timeName"}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SetRoomOption;
