<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import type { AppType, Theme, ThemeColors } from "./stores";

    interface Props {
        app: AppType;
        theme: Theme;
        colors: ThemeColors;
        toggleTheme: () => void;
    }

    let { app, theme, colors, toggleTheme }: Props = $props();

    let displayText = $state("");
    let showCursor = $state(true);
    let isTyping = $state(false);
    let typeInterval: number | undefined;
    let cursorInterval: number | undefined;
    let lastAppId = "";

    function startTypingEffect(content: string) {
        displayText = "";
        isTyping = true;
        showCursor = true;
        let index = 0;

        // Clear previous interval
        if (typeInterval) {
            clearInterval(typeInterval);
        }

        typeInterval = setInterval(() => {
            if (index < content.length) {
                displayText = content.slice(0, index + 1);
                index++;
            } else {
                clearInterval(typeInterval!);
                typeInterval = undefined;
                isTyping = false;
            }
        }, 5);
    }

    // Watch for app changes without using $effect
    function checkForAppChange() {
        if (app.id !== lastAppId) {
            lastAppId = app.id;
            const content = getContentText(app);
            startTypingEffect(content);
        }
    }

    onMount(() => {
        // Initial typing effect
        const content = getContentText(app);
        lastAppId = app.id;
        startTypingEffect(content);

        // Cursor blinking interval
        cursorInterval = setInterval(() => {
            if (!isTyping) {
                showCursor = !showCursor;
            }
        }, 500);

        // Check for app changes periodically
        const checkInterval = setInterval(checkForAppChange, 100);

        return () => {
            if (checkInterval) clearInterval(checkInterval);
        };
    });

    onDestroy(() => {
        if (typeInterval) {
            clearInterval(typeInterval);
        }
        if (cursorInterval) {
            clearInterval(cursorInterval);
        }
    });

    function getContentText(app: AppType): string {
        switch (app.content.type) {
            case "home":
                return `> whoami
${app.content.data.name || "John Developer"}

> cat welcome.txt
${app.content.data.greeting}

${app.content.data.description}

> ls skills/
${app.content.data.skills?.join("  ") || ""}

> echo "Navigate using the iPhone simulator →"`;

            case "blog":
                return `> cat blog/${app.id}.md

# ${app.content.title}

📅 ${app.content.data.date} • ⏱️ ${app.content.data.readTime}

${app.content.data.content}`;

            case "about":
                return `> cat about.json
{
  "name": "${app.content.data.name}",
  "role": "${app.content.data.role}",
  "experience": "${app.content.data.experience}",
  "bio": "${app.content.data.bio}"
}

> ls skills/
${Object.entries(app.content.data.skills)
    .map(([category, skills]) => `${category}/\n  ${skills.join("\n  ")}`)
    .join("\n\n")}`;

            case "projects":
                return `> ls projects/
${app.content.data.projects
    .map(
        (project: any, index: number) =>
            `${index + 1}. ${project.name}/
   ${project.description}
   Tech: ${project.tech.join(", ")}
   Status: ${project.status}`,
    )
    .join("\n\n")}`;

            case "contact":
                return `> cat contact.txt
${app.content.data.message}

> ls social/
📧 email     → ${app.content.data.email}
🐙 github    → ${app.content.data.github}
🐦 twitter   → ${app.content.data.twitter}
💼 linkedin  → ${app.content.data.linkedin}

> echo "Let's build something amazing together!"`;

            case "settings":
                return `> cat theme-settings.conf
# Terminal Blog Theme Configuration

current_theme="${theme}"
available_themes=["dark", "light"]

# Theme Features
${
    app.content.data.features
        ?.map(
            (feature: string, index: number) =>
                `feature_${index + 1}="${feature}"`,
        )
        .join("\n") || ""
}

> echo "Current theme: Tokyo Night ${theme === "dark" ? "Dark" : "Light"}"
> echo "Click the Settings app icon to toggle theme"

# Theme Colors (${theme})
background="${colors.bg}"
text="${colors.text}"
accent="${colors.accent}"
secondary="${colors.secondary}"

> echo "Theme switching available via iPhone Settings app"`;

            default:
                return `> file not found
bash: ${app.id}: No such file or directory`;
        }
    }

    function renderContent() {
        const lines = displayText.split("\n");

        return lines.map((line, index) => {
            if (line.startsWith("> ")) {
                return {
                    type: "command",
                    content: line.slice(2),
                    index,
                };
            } else if (line.startsWith("# ")) {
                return {
                    type: "h1",
                    content: line.slice(2),
                    index,
                };
            } else if (line.startsWith("## ")) {
                return {
                    type: "h2",
                    content: line.slice(3),
                    index,
                };
            } else if (line.startsWith("- ")) {
                return {
                    type: "list",
                    content: line.slice(2),
                    index,
                };
            } else if (line.includes("→")) {
                const [label, value] = line.split("→");
                return {
                    type: "arrow",
                    label: label.trim(),
                    value: value?.trim(),
                    index,
                };
            } else if (line.includes("=")) {
                const [key, ...valueParts] = line.split("=");
                const value = valueParts.join("=");
                return {
                    type: "equals",
                    key,
                    value,
                    index,
                };
            } else if (line.includes(":")) {
                const [key, ...valueParts] = line.split(":");
                const value = valueParts.join(":");
                return {
                    type: "colon",
                    key,
                    value,
                    index,
                };
            } else {
                return {
                    type: "text",
                    content: line,
                    index,
                };
            }
        });
    }

    // Derived state that updates when displayText changes
    let renderedContent = $derived(renderContent());
</script>

<div class="p-8 min-h-screen">
    <!-- Header -->
    <div class="mb-8">
        <div class="flex items-center gap-4 mb-4">
            <div class="flex gap-2">
                <div
                    class="w-3 h-3 rounded-full"
                    style="background-color: {theme === 'dark'
                        ? '#f7768e'
                        : '#d20f39'}"
                ></div>
                <div
                    class="w-3 h-3 rounded-full"
                    style="background-color: {theme === 'dark'
                        ? '#e0af68'
                        : '#fe640b'}"
                ></div>
                <div
                    class="w-3 h-3 rounded-full"
                    style="background-color: {theme === 'dark'
                        ? '#9ece6a'
                        : '#40a02b'}"
                ></div>
            </div>
            <span style="color: {colors.accent}" class="text-sm">
                ~/portfolio/{app.id}
            </span>
        </div>
    </div>

    <!-- Content -->
    <div class="text-sm leading-relaxed">
        {#each renderedContent as item}
            {#if item.type === "command"}
                <div class="flex items-center gap-2 mb-2">
                    <span style="color: {colors.secondary}">❯</span>
                    <span style="color: {colors.accent}">{item.content}</span>
                </div>
            {:else if item.type === "h1"}
                <h1
                    class="text-2xl font-bold mb-4 mt-6"
                    style="color: {theme === 'dark' ? '#ff9e64' : '#d20f39'}"
                >
                    {item.content}
                </h1>
            {:else if item.type === "h2"}
                <h2
                    class="text-xl font-bold mb-3 mt-4"
                    style="color: {theme === 'dark' ? '#e0af68' : '#fe640b'}"
                >
                    {item.content}
                </h2>
            {:else if item.type === "list"}
                <div class="flex items-center gap-2 mb-1 ml-4">
                    <span
                        style="color: {theme === 'dark'
                            ? '#9ece6a'
                            : '#40a02b'}">•</span
                    >
                    <span>{item.content}</span>
                </div>
            {:else if item.type === "arrow"}
                <div class="flex items-center gap-2 mb-1">
                    <span
                        style="color: {theme === 'dark'
                            ? '#9ece6a'
                            : '#40a02b'}">{item.label}</span
                    >
                    <span style="color: {colors.accent}">{item.value}</span>
                </div>
            {:else if item.type === "equals"}
                <div class="mb-1">
                    <span style="color: {colors.secondary}">{item.key}</span>
                    <span style="color: {colors.muted}">=</span>
                    <span style="color: {colors.accent}">{item.value}</span>
                </div>
            {:else if item.type === "colon"}
                <div class="mb-1">
                    <span style="color: {colors.secondary}">{item.key}:</span>
                    <span style="color: {colors.text}">{item.value}</span>
                </div>
            {:else}
                <div class="mb-1 leading-relaxed">
                    {item.content}
                </div>
            {/if}
        {/each}

        <!-- Fixed cursor that doesn't cause layout shifts -->
        <span
            class="ml-1 inline-block w-2 {showCursor || isTyping
                ? ''
                : 'opacity-0'}"
            style="
        background-color: {showCursor || isTyping
                ? colors.text
                : 'transparent'};
        color: {showCursor || isTyping ? colors.bg : 'transparent'};
      "
        >
            █
        </span>
    </div>

    <!-- Special Settings App Interface -->
    {#if app.content.type === "settings"}
        <div
            class="mt-8 p-6 rounded-lg"
            style="background-color: {colors.card}; border: 1px solid {colors.border}"
        >
            <h3 class="text-lg font-bold mb-4" style="color: {colors.accent}">
                Theme Control Panel
            </h3>
            <div class="flex items-center justify-between mb-4">
                <span style="color: {colors.text}">
                    Current Theme: Tokyo Night {theme === "dark"
                        ? "Dark"
                        : "Light"}
                </span>
                <button
                    onclick={toggleTheme}
                    class="px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
                    style="
            background-color: {colors.accent};
            color: {colors.bg};
          "
                >
                    Switch to {theme === "dark" ? "Light" : "Dark"} Mode
                </button>
            </div>
            <div class="text-sm" style="color: {colors.muted}">
                <p>
                    You can also toggle the theme by tapping the Settings app
                    icon in the iPhone.
                </p>
            </div>
        </div>
    {/if}

    <!-- Images for certain content types -->
    {#if app.content.data?.image}
        <div class="mt-8 mb-8">
            <img
                src={app.content.data.image || "/placeholder.svg"}
                alt={app.content.title}
                class="rounded-lg shadow-lg max-w-full h-auto"
                style="border: 1px solid {colors.border}"
            />
        </div>
    {/if}

    <!-- Project images -->
    {#if app.content.type === "projects"}
        <div class="mt-8 grid gap-6">
            {#each app.content.data.projects as project, index}
                <div
                    class="rounded-lg p-4"
                    style="
            border: 1px solid {colors.border};
            background-color: {colors.card};
          "
                >
                    <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.name}
                        class="w-full h-48 object-cover rounded mb-4"
                    />
                    <h3
                        class="font-bold mb-2"
                        style="color: {theme === 'dark'
                            ? '#ff9e64'
                            : '#d20f39'}"
                    >
                        {project.name}
                    </h3>
                    <p class="mb-2" style="color: {colors.text}">
                        {project.description}
                    </p>
                    <div class="flex flex-wrap gap-2">
                        {#each project.tech as tech}
                            <span
                                class="px-2 py-1 rounded text-xs"
                                style="
                  background-color: {colors.border};
                  color: {colors.accent};
                "
                            >
                                {tech}
                            </span>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>
