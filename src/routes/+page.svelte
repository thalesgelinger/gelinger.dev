<script lang="ts">
    import TerminalContent from "$lib/TerminalContent.svelte";
    import { phoneStore } from "$lib/stores.svelte";

    let title = "home";
</script>

{#if phoneStore.moved}
    <div class="p-8">
        <TerminalContent {title}>
            <div class="flex gap-9">
                <img
                    src="/me.jpeg"
                    alt="Thales Gelinger"
                    class="rounded-full h-20"
                />
                <h2>Hey, i’m Thales Gelinger</h2>
            </div>
            <p>
                I build cool stuff, write about it, and repeat, take a look in
                my posts, you may find something interesting, i also do some
                youtube videos sometimes
            </p>
            <iframe
                height="405"
                class="w-full"
                src="https://www.youtube.com/embed/sHI-_jbSuZY"
                title="I&#39;m tired of JS so i started a new mobile framework using lua and rust"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
            ></iframe>

            <div class="flex w-full justify-end">
                <img src="/tails-running.gif" alt="Tails" class="h-20" />
            </div>
        </TerminalContent>
    </div>
{:else}
    <div class="text-center max-w-2xl mx-auto p-8">
        <div class="mb-8">
            <h1 class="text-4xl font-bold mb-4 text-accent">
                Welcome to My Terminal Blog
            </h1>
            <p class="text-lg mb-6 text-text">
                A unique blend of terminal aesthetics and mobile navigation
            </p>
            <div class="text-sm opacity-75 mb-8">
                <p>Drag the iPhone to start exploring →</p>
            </div>
        </div>

        <!-- ASCII Art Welcome -->
        <div class="font-mono text-xs mb-8 text-secondary">
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
