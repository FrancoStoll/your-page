"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

const visitData = [
  { name: "Ene", visitas: 4000 },
  { name: "Feb", visitas: 3000 },
  { name: "Mar", visitas: 5000 },
  { name: "Abr", visitas: 4500 },
  { name: "May", visitas: 6000 },
  { name: "Jun", visitas: 5500 },
]

const deviceData = [
  { name: "Desktop", value: 60 },
  { name: "Mobile", value: 30 },
  { name: "Tablet", value: 10 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

const bounceRateData = [
  { name: "Ene", rate: 40 },
  { name: "Feb", rate: 35 },
  { name: "Mar", rate: 38 },
  { name: "Abr", rate: 32 },
  { name: "May", rate: 30 },
  { name: "Jun", rate: 28 },
]

export default function Statistic() {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Estadísticas de tu página</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Visitas mensuales</CardTitle>
            <CardDescription>Número de visitas en los últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ visitas: { label: "Visitas", color: "hsl(var(--chart-1))" } }} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={visitData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="visitas" fill="var(--color-visitas)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribución por dispositivo</CardTitle>
            <CardDescription>Porcentaje de visitas por tipo de dispositivo</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Tasa de rebote</CardTitle>
            <CardDescription>Porcentaje de visitantes que abandonan después de ver una sola página</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ rate: { label: "Tasa de rebote", color: "hsl(var(--chart-2))" } }} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={bounceRateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="rate" stroke="var(--color-rate)" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}