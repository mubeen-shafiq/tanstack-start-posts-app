import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/posts/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/posts/"!</div>
}
