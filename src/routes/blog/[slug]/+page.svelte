<script lang="ts">
    import BottomSheet from "$lib/BottomSheet.svelte";
    import { phoneStore } from "$lib/stores.svelte";
    import TerminalContent from "$lib/TerminalContent.svelte";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
    let { content, slug: title } = $derived(data);
    $effect(() => {
        phoneStore.page = "blog";
    });
</script>

{#if phoneStore.isMobile}
    {#key title}
        <BottomSheet>
            <div class="md:p-8 bg-bg text-text">
                <TerminalContent {title}>
                    {@render content()}
                </TerminalContent>
            </div>
        </BottomSheet>
    {/key}
{:else}
    <div class="md:p-8">
        <TerminalContent {title}>
            {@render content()}
        </TerminalContent>
    </div>
{/if}
