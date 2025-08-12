<script lang="ts">
    import "../app.css";

    import IPhoneSimulator from "$lib/IPhoneSimulator.svelte";
    import { phoneStore } from "$lib/stores.svelte";

    let { children, data } = $props();
    const posts = data.posts;

    let isMobile = $state(false);

    $effect(() => {
        const mq = window.matchMedia("(max-width: 768px)");
        isMobile = mq.matches;
        console.log({ isMobile });

        // Optional: update if screen resizes
        mq.addEventListener("change", (e) => {
            isMobile = e.matches;
        });
    });
</script>

<svelte:head>
    <title>Terminal Phone Blog</title>
    <meta
        name="description"
        content="A unique blog interface combining terminal aesthetics with mobile navigation"
    />
</svelte:head>

{#if !isMobile}
    <div
        class="min-h-screen relative overflow-hidden transition-colors duration-500 bg-bg text-text"
    >
        <div class="absolute inset-0 opacity-5">
            <div
                class="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_var(--colors-accent)_1px,_transparent_0)] bg-[20px_20px]"
            ></div>
        </div>

        <div
            class="relative z-10 transition-all duration-500 ease-out {phoneStore.moved
                ? 'pr-0 max-w-4xl mx-auto'
                : 'border-2 flex items-center justify-center min-h-screen'}"
        >
            {@render children?.()}
        </div>

        <IPhoneSimulator {posts} />
    </div>
{:else}
    <IPhoneSimulator {isMobile} {posts} />
{/if}
