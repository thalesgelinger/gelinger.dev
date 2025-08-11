import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ params }) => {

    const blog = await import(`../../../posts/${params.slug}.md`)
    console.log({ ...blog })

    console.log("THIS IS A TEST", params.slug)
    return {
        title: blog.metadata.title,
        content: blog.default,
        slug: params.slug
    }
}
