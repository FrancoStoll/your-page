import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getDomainByName } from "@/lib/actions/profile/profile.action";
import { getUser } from "@/lib/db/queries";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Facebook, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function DomainUserPage({
  params,
}: {
  params: { domainName: string };
}) {
  const domain = await getDomainByName(params.domainName);

  if (!domain) return notFound();
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
                  {domain.profiles?.fullName}{" "}
                </CardTitle>
                <p className="text-muted-foreground">
                  @{domain.profiles?.fullName}{" "}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{domain.profiles?.description}</p>
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
              {domain.posts.map((post, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="md:flex relative">
                    <div className="md:w-1/3 bg-muted flex justify-center">
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={`Imagen de ${post.title}`}
                          className="w-full h-full"
                          width={1000}
                          height={1000}
                        />
                      ) : (
                        <Image
                          src={`/assets/images/placeholder-product.png`}
                          alt={`Imagen de ${post.title}`}
                          className="w-full h-full object-contain"
                          width={200}
                          height={200}
                        />
                      )}
                    </div>
                    <div className="md:w-2/3 p-6">
                      <h3 className="text-xl font-semibold mb-2">
                        {post.title}
                      </h3>
                      <Badge className="mb-2">Nuevo</Badge>
                      <p className="text-muted-foreground mb-4">
                        {post.description}
                      </p>
                      <p className="text-lg font-bold text-primary">
                        ${post.price!.toFixed(2)}
                      </p>
                    </div>
                    <Link
                      href="https://wa.me/3454473489?text=Hola%20quiero%20más%20información"
                      className="absolute bottom-4 right-4 bg-black px-4 py-2 text-white rounded-md"

                    >
                      Pedir mas información
                    </Link>
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
