import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPosts } from "@/lib/actions/posts/posts.actions";
import {
  PanelsTopLeft,
  CheckCircle,
  DollarSign,
  BadgeDollarSign,
} from "lucide-react";

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="w-full h-[89vh] mx-auto p-4 space-y-4 overflow-y-scroll remove-scrollbar">
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <Card className="w-full" key={post.id}>
            <CardHeader>
              <CardTitle className="flex items-center text-base">
                <span className="text-orange-500 font-black">{post.title}</span>
              </CardTitle>
              <CardDescription>
                Creado el {new Date(post.createdAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <BadgeDollarSign className="mr-1 h-5 w-5 text-green-500" />
                  <span className="text-sm text-muted-foreground">
                    Precio de la publicación{" "}
                    <span className="text-normal font-bold text-orange-500">
                      {post.price}
                    </span>
                  </span>
                </div>
                <Badge variant="outline" className="bg-pink-100 text-pink-800">
                  www.nuestrodominio/tudominio.com
                </Badge>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                {post.description}
              </p>
            </CardContent>
          </Card>
        ))
      ) : (
        <p>No hay posts</p>
      )}

      <p className="h-full mt-10 font-light text-right">
        Proximamente publicaciones con imagenes...
      </p>
    </div>
  );
}
