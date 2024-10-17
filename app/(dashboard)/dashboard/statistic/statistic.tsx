import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"

export default function Component() {
  return (
    <div className="w-full max-w-md">
      <Card className="bg-white shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Visitas a Publicaciones</CardTitle>
          <Users className="h-8 w-8 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-bold text-orange-600">1,234</div>
          <CardDescription className="text-sm text-gray-500 mt-2">
            Usuarios únicos que visitaron tus publicaciones esta semana
          </CardDescription>
          <div className="mt-4 flex items-center space-x-2">
            <div className="flex-1 h-2 bg-blue-100 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <span className="text-sm font-medium text-orange-600">+15%</span>
          </div>
        </CardContent>
      </Card>


     
    </div>
  )
}