import { ActionsPosts } from "@/components/ActionsPosts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPosts, postAndImages } from "@/lib/actions/posts/posts.actions";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Dashboard - Publicaciones",
  description: "Publicaciones de tu dominio",
};

export default async function PostsPage() {
  const posts = await getPosts();
  const postWithImages = await postAndImages(posts!);

  return (
    <div className="w-full h-[89vh] mx-auto p-4 space-y-4 overflow-y-scroll remove-scrollbar">
      {postWithImages && postWithImages.length > 0 ? (
        postWithImages.map((post) => (
          <Card
            className="w-full grid md:grid-cols-2 gap-5 relative"
            key={post.id}
          >
            <CardHeader>
              <CardTitle className="flex items-center text-base">
                <span className="text-blue-500 font-black">{post.title}</span>
              </CardTitle>
              <span>
                Creado el {new Date(post.createdAt).toLocaleDateString()}
              </span>
              <span>
                Precio de la publicación{" "}
                <span className="text-normal font-bold text-green-500">
                  ${post.price}
                </span>
              </span>
              <CardDescription className="">
                <span className="text-base py-2 text-wrap break-words">
                  {post.description}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full md:pt-5">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={`Imagen de ${post.title}`}
                    className="w-[90%] h-[90%] object-contain"
                    width={500}
                    height={500}
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
            </CardContent>
            <ActionsPosts postId={post.id} />
          </Card>
        ))
      ) : (
        <p>No hay posts</p>
      )}

      <p className="h-full mt-10 font-light text-right"></p>
    </div>
  );
}
