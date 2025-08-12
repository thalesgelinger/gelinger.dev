import * as z from "zod"

export const AppMobile = z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    icon: z.string().optional(),
    color: z.string().optional(),
    tags: z.array(z.string()).optional(),
    publised: z.string().optional(),
    type: z.enum(["post", "app"]).default("post")
})


export type AppType = z.infer<typeof AppMobile>


type PhoneStore = {
    moved: boolean
    initialized: boolean,
    isMobile: boolean,
    page: "" | "blog"
}

export const phoneStore = $state<PhoneStore>({
    moved: false,
    initialized: false,
    page: "",
    isMobile: false
})



