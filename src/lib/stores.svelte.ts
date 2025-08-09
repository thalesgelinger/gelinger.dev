export type AppType = {
    id: string
    name: string
    icon: string
    color: string
    content?: string
    action?: () => {}
}

type PhoneStore = {
    moved: boolean
    initialized: boolean,
    page: "" | "blog"
}

export const phoneStore = $state<PhoneStore>({
    moved: false,
    initialized: false,
    page: ""
})

