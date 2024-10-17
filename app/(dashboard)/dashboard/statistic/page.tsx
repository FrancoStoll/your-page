import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Statistic from "./statistic";
import { ThumbsUp } from "lucide-react";

export default function StatisticPage() {
  return (
    <div className="flex flex-wrap flex-row gap-2">
      <Statistic />
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">
            Interacciones con Contenido
          </CardTitle>
          <ThumbsUp className="h-8 w-8 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-bold text-red-600">3,721</div>
          <CardDescription className="text-sm text-gray-500 mt-2">
            Total de likes, comentarios y compartidos este mes
          </CardDescription>
          <div className="mt-4 flex items-center space-x-2">
            <div className="flex-1 h-2 bg-red-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500 rounded-full"
                style={{ width: "82%" }}
              ></div>
            </div>
            <span className="text-sm font-medium text-green-600">+22%</span>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">
            Interacciones con Contenido
          </CardTitle>
          <ThumbsUp className="h-8 w-8 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-bold text-green-600">3,721</div>
          <CardDescription className="text-sm text-gray-500 mt-2">
            Total de likes, comentarios y compartidos este mes
          </CardDescription>
          <div className="mt-4 flex items-center space-x-2">
            <div className="flex-1 h-2 bg-green-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{ width: "82%" }}
              ></div>
            </div>
            <span className="text-sm font-medium text-green-600">+22%</span>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">
            Interacciones con Contenido
          </CardTitle>
          <ThumbsUp className="h-8 w-8 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-bold text-blue-600">3,721</div>
          <CardDescription className="text-sm text-gray-500 mt-2">
            Total de likes, comentarios y compartidos este mes
          </CardDescription>
          <div className="mt-4 flex items-center space-x-2">
            <div className="flex-1 h-2 bg-blue-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: "82%" }}
              ></div>
            </div>
            <span className="text-sm font-medium text-blue-600">+22%</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
