export type Categories = 'sveltekit' | 'svelte'

export type AppMetadata = {
    name: string
    icon: string
    color: string
    description: string
}

export type Post = {
    title: string
    slug: string
    description: string
    date: string
    categories: Categories[]
    published: boolean
    app: AppMetadata
    content: string
}

