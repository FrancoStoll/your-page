import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const pricingPlans = [
  {
    name: "Básico",
    price: "$9.99",
    description: "Perfecto para empezar",
    features: [
      "1 usuario",
      "10 proyectos",
      "2GB de almacenamiento",
      "Soporte por email"
    ]
  },
  {
    name: "Pro",
    price: "$19.99",
    description: "Ideal para profesionales",
    features: [
      "5 usuarios",
      "50 proyectos",
      "10GB de almacenamiento",
      "Soporte prioritario",
      "Acceso a funciones avanzadas"
    ]
  },
  {
    name: "Empresarial",
    price: "$49.99",
    description: "Para grandes equipos",
    features: [
      "Usuarios ilimitados",
      "Proyectos ilimitados",
      "100GB de almacenamiento",
      "Soporte 24/7",
      "Funciones personalizadas",
      "Integración con APIs"
    ]
  }
]

export default function PricingSection() {
  return (
    <section className="py-16 px-4 bg-gray-50 max-w-7xl mx-auto">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Planes de Precios</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <Card key={index} className={`flex flex-col ${index === 1 ? 'border-primary shadow-lg' : ''}`}>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-4xl font-bold mb-4">{plan.price}<span className="text-sm font-normal">/mes</span></p>
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={index === 1 ? "default" : "outline"}>
                  Elegir Plan
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}