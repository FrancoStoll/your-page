import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus, Globe, Upload, BarChart2 } from "lucide-react"

const features = [
  {
    icon: <UserPlus className="h-8 w-8 text-primary" />,
    title: "Creación de Usuario",
    description: "Regístrate fácilmente y comienza a construir tu presencia en línea en minutos."
  },
  {
    icon: <Globe className="h-8 w-8 text-primary" />,
    title: "Dominio Personalizado",
    description: "Obtén tu propio subdominio único dentro de nuestra plataforma para destacar tu marca."
  },
  {
    icon: <Upload className="h-8 w-8 text-primary" />,
    title: "Gestión de Contenido",
    description: "Sube y administra fácilmente información sobre tus productos o servicios."
  },
  {
    icon: <BarChart2 className="h-8 w-8 text-primary" />,
    title: "Estadísticas Detalladas",
    description: "Accede a análisis en tiempo real para tomar decisiones informadas sobre tu negocio."
  }
]

export default function FeaturesSection() {
  return (
    <section className="py-16 px-4 bg-gray-50 max-w-7xl mx-auto">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Características Principales</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col items-center text-center">
              <CardHeader>
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}