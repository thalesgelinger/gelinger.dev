export type AppType = {
    id: string
    name: string
    icon: string
    color: string
    content?: string
    action?: () => {}
}

export const phoneStore = $state({
    moved: false
})
