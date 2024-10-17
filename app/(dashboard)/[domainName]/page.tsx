import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Facebook, Instagram } from "lucide-react";

export default function DomainUserPage({
  params,
}: {
  params: { domainName: string };
}) {
  console.log(params);

  return (
    <main className="flex-grow max-w-7xl mx-auto py-8 px-4">
      <div className="md:flex md:space-x-8">
        <section className="md:w-2/3">
          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center space-x-4">
              <Avatar className="w-20 h-20 flex items-center justify-center">
                <AvatarImage
                  src="/assets/gifs/success.gif"
                  alt="Foto de perfil"
                />
              </Avatar>
              <div>
                <CardTitle className="text-2xl font-bold">
                  Nombre de Usuario
                </CardTitle>
                <p className="text-muted-foreground">@nombreusuario</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Breve descripción del usuario o biografía. Aquí puedes agregar
                información relevante sobre el perfil.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com/nombreusuario"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Facebook className="w-6 h-6" />
                  <span className="sr-only">Facebook</span>
                </a>
                <a
                  href="https://instagram.com/nombreusuario"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Instagram className="w-6 h-6" />
                  <span className="sr-only">Instagram</span>
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Publicaciones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                {
                  title: "Producto Increíble",
                  description:
                    "Este es un producto asombroso que cambiará tu vida. Tiene características únicas y un diseño innovador.",
                  price: 99.99,
                  category: "Tecnología",
                },
                {
                  title: "Oferta Especial",
                  description:
                    "No te pierdas esta oferta por tiempo limitado. Un producto de alta calidad a un precio inmejorable.",
                  price: 49.99,
                  category: "Hogar",
                },
              ].map((publicacion, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3 bg-muted">
                      <img
                        src={`/assets/images/placeholder-product.png`}
                        alt={`Imagen de ${publicacion.title}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <h3 className="text-xl font-semibold mb-2">
                        {publicacion.title}
                      </h3>
                      <Badge className="mb-2">{publicacion.category}</Badge>
                      <p className="text-muted-foreground mb-4">
                        {publicacion.description}
                      </p>
                      <p className="text-lg font-bold text-primary">
                        ${publicacion.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </section>

        <aside className="md:w-1/3 mt-8 md:mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Información Adicional</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Aquí puedes agregar contenido adicional, widgets, o cualquier
                otra información relevante para tu sitio.
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </main>
  );
}
