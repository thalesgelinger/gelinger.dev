
import { AppMobile } from "$lib/stores.svelte"
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {

    const postsData = import.meta.glob("../posts/*.md", { eager: true })

    const posts = Object.entries(postsData).map(([s, p]) => AppMobile.parse({
        ...(p as any).metadata,
        slug: s.split("/").at(-1)!.replace(".md", "")
    }))


    return { posts }
}
