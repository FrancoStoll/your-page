import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CreditCard,
  Database,
  Github,
  Star,
  Twitter,
} from "lucide-react";
import { Terminal } from "./terminal";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Content */}
      <div className="">
        {/* Main Content */}
        <main className="flex-grow container mx-auto px-4 py-8 mt-20">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-black">
              Bienvenido a PerfilYa!
            </h2>
            <p className="text-xl mb-8 text-black">
              Explora, crea y comparte contenido increíble
            </p>
            <div className="flex justify-center space-x-4">
              <Input
                className="max-w-xs bg-white"
                placeholder="www.perfilya/tunombre.com"
              />
              <a href="/dashboard">
                <Button className="bg-white text-blue-600 hover:bg-gray-100">
                  Reclama tu página <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center text-black">
              Lo que dicen nuestros usuarios
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Ana García",
                  role: "Diseñadora Gráfica",
                  content:
                    "Esta plataforma ha revolucionado la forma en que comparto mi portafolio. ¡Increíblemente fácil de usar!",
                },
                {
                  name: "Carlos Rodríguez",
                  role: "Desarrollador Web",
                  content:
                    "La flexibilidad y las herramientas que ofrece son exactamente lo que necesitaba para mostrar mis proyectos.",
                },
                {
                  name: "Laura Martínez",
                  role: "Fotógrafa",
                  content:
                    "Desde que uso esta plataforma, he conseguido más clientes y mayor visibilidad para mi trabajo.",
                },
              ].map((testimonial, index) => (
                <Card key={index} className="bg-white bg-opacity-90 shadow-lg">
                  <CardContent className="p-6">
                    <p className="text-gray-600 mb-4">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center">
                      <div className="rounded-full bg-blue-500 w-10 h-10 flex items-center justify-center text-white font-bold mr-3">
                        {testimonial.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 bg-opacity-75 text-white p-8">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">Sobre Nosotros</h4>
              <p>
                Somos una plataforma dedicada a ayudarte a crear y compartir
                contenido increíble.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Documentación
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Recursos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Síguenos</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-300">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="hover:text-gray-300">
                  <Github className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
