import "./SetRoomOption.css";

import { Card } from "../shadcn/card";
import { Input } from "../shadcn/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../shadcn/tabs";
import { BadgePlus, Trash2 } from "lucide-react";
import { Badge } from "../shadcn/badge";

const countData = [
  { id: 5, value: "5개" },
  { id: 10, value: "10개" },
  { id: 15, value: "15개" },
  { id: 20, value: "20개" },
  { id: 30, value: "30개" },
];

const categoryData = [
  { id: "comic", value: "만화" },
  { id: "drama", value: "드라마" },
  { id: "emoji", value: "이모지" },
  { id: "meme", value: "요즘 밈" },
  { id: "memory", value: "추억" },
  { id: "movie", value: "영화" },
  { id: "nonsense", value: "넌센스" },
  { id: "random", value: "랜덤" },
  { id: "slang", value: "신조어" },
];

const timeData = [
  { id: 5, value: "5초" },
  { id: 10, value: "10초" },
  { id: 15, value: "15초" },
  { id: 20, value: "20초" },
  { id: 30, value: "30초" },
];

const SetRoomOption = () => {
  return (
    <div className="flex w-full max-h-100 truncate overflow-auto max-w-sm flex-col gap-6 SetRoomOption">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="count">문제 개수</TabsTrigger>
          <TabsTrigger value="category">카테고리</TabsTrigger>
          <TabsTrigger value="time">제한시간(초)</TabsTrigger>
        </TabsList>
        <TabsContent value="count">
          <Card className="flex flex-col gap-3 justify-center items-center">
            {countData.map((data) => (
              <div key={data.id} className="content-wrapper">
                <label className="key text-center">🗝️ {data.id}</label>
                <Input className="value" value={data.value} />
                <Trash2 className="cursor-pointer w-5" />
              </div>
            ))}
            <Badge variant="secondary" className="w-20 h-8 cursor-pointer">
              <BadgePlus />
              옵션 추가
            </Badge>
          </Card>
        </TabsContent>
        <TabsContent value="category">
          <Card className="flex flex-col gap-3 justify-center items-center">
            {categoryData.map((data) => (
              <div key={data.id} className="content-wrapper">
                <label className="key">🗝️ {data.id}</label>
                <Input className="value" value={data.value} />
                <Trash2 className="cursor-pointer w-5" />
              </div>
            ))}
            <Badge variant="secondary" className="w-20 h-8 cursor-pointer">
              <BadgePlus />
              옵션 추가
            </Badge>
          </Card>
        </TabsContent>
        <TabsContent value="time">
          <Card className="flex flex-col gap-3 justify-center items-center">
            {timeData.map((data) => (
              <div key={data.id} className="content-wrapper">
                <label className="key text-center">🗝️ {data.id}</label>
                <Input className="value" value={data.value} />
                <Trash2 className="cursor-pointer w-5" />
              </div>
            ))}
            <Badge variant="secondary" className="w-20 h-8 cursor-pointer">
              <BadgePlus />
              옵션 추가
            </Badge>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SetRoomOption;
