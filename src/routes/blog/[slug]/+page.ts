import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ params }) => {
    console.log("THIS IS A TEST", params.slug)
    return {
        title: params.slug,
        content: "Ex adipisicing aute deserunt qui aute excepteur incididunt aute amet magna non sit excepteur minim. Deserunt ipsum incididunt culpa tempor veniam fugiat. Qui nulla irure officia labore cupidatat velit sunt aliqua sit. Nisi est consectetur velit Lorem et. Enim amet et exercitation amet Lorem irure eiusmod ex id sit esse cillum. Reprehenderit fugiat duis sunt dolore quis qui id.",
    }
}
