import { writable } from 'svelte/store'

export type AppType = {
    id: string
    name: string
    icon: string
    color: string
    content: {
        type: 'home' | 'blog' | 'about' | 'projects' | 'contact' | 'settings'
        title: string
        data?: any
    }
}

export type Theme = 'dark' | 'light'

export type ThemeColors = {
    bg: string
    text: string
    accent: string
    secondary: string
    border: string
    card: string
    muted: string
}

export const themeStore = writable<{ theme: Theme; colors: ThemeColors }>({
    theme: 'dark',
    colors: {
        bg: '#1a1b26',
        text: '#c0caf5',
        accent: '#7aa2f7',
        secondary: '#bb9af7',
        border: '#414868',
        card: '#24283b',
        muted: '#565f89'
    }
})
