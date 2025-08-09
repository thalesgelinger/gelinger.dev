<script>
    import TerminalContent from "$lib/TerminalContent.svelte";
    import { phoneStore } from "$lib/stores.svelte";

    let title = "TITLE";
    let content = "WONRDERFULL CONTENT JUST BECAUSE";
</script>

{#if phoneStore.moved}
    <div class="p-8">
        <TerminalContent {title} {content} />
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
