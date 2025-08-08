<script lang="ts">
    import { onMount } from "svelte";
    import IPhoneSimulator from "$lib/IPhoneSimulator.svelte";
    import TerminalContent from "$lib/TerminalContent.svelte";
    import { themeStore, type AppType } from "$lib/stores";

    export type Theme = "dark" | "light";

    export type ThemeColors = {
        bg: string;
        text: string;
        accent: string;
        secondary: string;
        border: string;
        card: string;
        muted: string;
    };

    const themes: Record<Theme, ThemeColors> = {
        dark: {
            bg: "#1a1b26",
            text: "#c0caf5",
            accent: "#7aa2f7",
            secondary: "#bb9af7",
            border: "#414868",
            card: "#24283b",
            muted: "#565f89",
        },
        light: {
            bg: "#d5d6db",
            text: "#565a6e",
            accent: "#34548a",
            secondary: "#8839ef",
            border: "#9ca0b0",
            card: "#eff1f5",
            muted: "#6c6f85",
        },
    };

    const apps: AppType[] = [
        {
            id: "home",
            name: "Home",
            icon: "🏠",
            color: "bg-blue-500",
            content: {
                type: "home",
                title: "Welcome to My Digital Space",
                data: {
                    greeting: "Hello, World!",
                    description:
                        "I'm a developer who loves creating unique digital experiences.",
                    image: "/developer-workspace-multiple-monitors.png",
                    skills: [
                        "React",
                        "TypeScript",
                        "Node.js",
                        "Python",
                        "PostgreSQL",
                    ],
                },
            },
        },
        {
            id: "blog1",
            name: "Blog",
            icon: "📝",
            color: "bg-green-500",
            content: {
                type: "blog",
                title: "Building Creative Web Interfaces",
                data: {
                    date: "2024-01-15",
                    readTime: "5 min read",
                    image: "/creative-web-interface.png",
                    content: `In today's digital landscape, creating unique user experiences is more important than ever. This blog post explores how we can break conventional design patterns to create memorable interfaces.

## The Power of Metaphors

Using familiar metaphors like mobile interfaces can make complex navigation feel intuitive. By simulating an iPhone interface, we create a bridge between the familiar and the innovative.

## Technical Implementation

The key is combining modern web technologies:
- React for component architecture
- Tailwind CSS for styling
- TypeScript for type safety
- Creative state management for seamless transitions

## Conclusion

Sometimes the best interfaces are the ones that surprise and delight users while remaining functional and accessible.`,
                },
            },
        },
        {
            id: "blog2",
            name: "Terminal",
            icon: "⚡",
            color: "bg-purple-500",
            content: {
                type: "blog",
                title: "Why I Love Terminal Interfaces",
                data: {
                    date: "2024-01-10",
                    readTime: "3 min read",
                    image: "/terminal-with-code.png",
                    content: `There's something magical about the simplicity and power of terminal interfaces. They represent pure functionality without the distractions of modern UI design.

## Efficiency First

Terminal interfaces prioritize:
- Speed of interaction
- Keyboard-driven workflows  
- Minimal visual noise
- Maximum information density

## Aesthetic Appeal

The monospace fonts, green text on black backgrounds, and ASCII art create a distinctive aesthetic that many developers 
find appealing and nostalgic.

## Modern Applications

We can bring terminal aesthetics to modern web applications while maintaining usability and accessibility standards.`,
                },
            },
        },
        {
            id: "about",
            name: "About",
            icon: "👨‍💻",
            color: "bg-orange-500",
            content: {
                type: "about",
                title: "About Me",
                data: {
                    name: "John Developer",
                    role: "Full Stack Developer",
                    image: "/professional-developer-portrait.png",
                    bio: "I'm a passionate developer who loves creating unique digital experiences.",
                    skills: {
                        Frontend: [
                            "React",
                            "Next.js",
                            "TypeScript",
                            "Tailwind CSS",
                        ],
                        Backend: ["Node.js", "Python", "PostgreSQL", "Redis"],
                        Tools: ["Git", "Docker", "AWS", "Figma"],
                    },
                    experience:
                        "5+ years of experience building scalable web applications",
                },
            },
        },
        {
            id: "projects",
            name: "Projects",
            icon: "🚀",
            color: "bg-red-500",
            content: {
                type: "projects",
                title: "My Projects",
                data: {
                    projects: [
                        {
                            name: "Terminal Blog",
                            description:
                                "A unique blog interface combining terminal aesthetics with mobile navigation",
                            tech: [
                                "React",
                                "Next.js",
                                "TypeScript",
                                "Tailwind CSS",
                            ],
                            status: "Active",
                            image: "/terminal-blog-interface.png",
                        },
                        {
                            name: "Code Visualizer",
                            description:
                                "Interactive tool for visualizing code execution and data structures",
                            tech: ["D3.js", "React", "WebGL"],
                            status: "In Progress",
                            image: "/code-visualization-tool.png",
                        },
                        {
                            name: "Dev Tools Extension",
                            description:
                                "Browser extension for enhanced developer productivity",
                            tech: ["JavaScript", "Chrome APIs", "React"],
                            status: "Completed",
                            image: "/browser-extension-interface.png",
                        },
                    ],
                },
            },
        },
        {
            id: "contact",
            name: "Contact",
            icon: "📧",
            color: "bg-pink-500",
            content: {
                type: "contact",
                title: "Get In Touch",
                data: {
                    email: "hello@johndeveloper.dev",
                    github: "github.com/johndeveloper",
                    twitter: "@johndeveloper",
                    linkedin: "linkedin.com/in/johndeveloper",
                    message:
                        "Feel free to reach out for collaborations, questions, or just to say hi!",
                    image: "/contact-communication-icons.png",
                },
            },
        },
        {
            id: "settings",
            name: "Settings",
            icon: "⚙️",
            color: "bg-gray-500",
            content: {
                type: "settings",
                title: "Theme Settings",
                data: {
                    description:
                        "Customize the appearance of your terminal blog experience.",
                    features: [
                        "Tokyo Night Dark - Deep blue backgrounds with bright accents",
                        "Tokyo Night Light - Clean light backgrounds with muted colors",
                        "Smooth transitions between themes",
                        "Consistent color palette across all components",
                    ],
                },
            },
        },
    ];

    let currentApp: AppType = apps[0];
    let hasMovedPhone = false;
    let theme: Theme = "dark";

    $: colors = themes[theme];

    function handleAppSelect(app: AppType) {
        currentApp = app;
    }

    function handlePhoneMoved() {
        hasMovedPhone = true;
    }

    function toggleTheme() {
        theme = theme === "dark" ? "light" : "dark";
        themeStore.set({ theme, colors });
    }

    onMount(() => {
        themeStore.set({ theme, colors });
    });
</script>

<svelte:head>
    <title>Terminal Phone Blog</title>
    <meta
        name="description"
        content="A unique blog interface combining terminal aesthetics with mobile navigation"
    />
</svelte:head>

<div
    class="min-h-screen relative overflow-hidden transition-colors duration-500"
    style="background-color: {colors.bg}; color: {colors.text}"
>
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-5">
        <div
            class="absolute inset-0"
            style="background-image: radial-gradient(circle at 1px 1px, {colors.accent} 1px, transparent 0); background-size: 20px 20px"
        ></div>
    </div>

    <!-- Content Area -->
    <div
        class="relative z-10 transition-all duration-500 ease-out {hasMovedPhone
            ? 'pr-0 max-w-4xl mx-auto'
            : 'flex items-center justify-center min-h-screen'}"
    >
        {#if hasMovedPhone}
            <div class="p-8">
                <TerminalContent
                    app={currentApp}
                    {theme}
                    {colors}
                    {toggleTheme}
                />
            </div>
        {:else}
            <div class="text-center max-w-2xl mx-auto p-8">
                <div class="mb-8">
                    <h1
                        class="text-4xl font-bold mb-4"
                        style="color: {colors.accent}"
                    >
                        Welcome to My Terminal Blog
                    </h1>
                    <p class="text-lg mb-6" style="color: {colors.text}">
                        A unique blend of terminal aesthetics and mobile
                        navigation
                    </p>
                    <div class="text-sm opacity-75 mb-8">
                        <p>Drag the iPhone to start exploring →</p>
                    </div>
                </div>

                <!-- ASCII Art Welcome -->
                <div
                    class="font-mono text-xs mb-8"
                    style="color: {colors.secondary}"
                >
                    <pre>{`
    ╭─────────────────────────────────────╮
    │     Welcome to the Terminal Blog    │
    │                                     │
    │  ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐  │
    │  └─┘ └─┘ └─┘ └─┘ └─┘ └─┘ └─┘ └─┘  │
    │                                     │
    │    Navigate using the iPhone →      │
    ╰─────────────────────────────────────╯
                `}</pre>
                </div>
            </div>
        {/if}
    </div>

    <!-- iPhone Simulator -->
    <IPhoneSimulator
        {apps}
        {currentApp}
        onAppSelect={handleAppSelect}
        {hasMovedPhone}
        onPhoneMoved={handlePhoneMoved}
        {theme}
        {toggleTheme}
    />
</div>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        font-family: "Inter", sans-serif;
    }
</style>
