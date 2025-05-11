import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

type Post = {
  id: string;
  title: string;
  body: string;
  userId: string;
};

async function getPostsApi() {
  const results = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!results.ok) throw new Error("Unable to fetch posts!");

  const data = (await results.json()) as Post[];
  return data;
}

const getPosts = createServerFn({
  method: "GET",
}).handler(getPostsApi);

export const Route = createFileRoute("/")({
  component: Home,
  pendingComponent: () => <p>Loading...</p>,
  loader: async () => await getPosts(),
});

function Home() {
  const state = Route.useLoaderData();

  return (
    <div>
      {state.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
}
