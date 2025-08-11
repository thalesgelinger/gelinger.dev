<script lang="ts">
    import { phoneStore } from "$lib/stores.svelte";
    import TerminalContent from "$lib/TerminalContent.svelte";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
    let { content, slug: title } = $derived(data);
    $effect(() => {
        phoneStore.page = "blog";
    });
</script>

<div class="p-8">
    <TerminalContent {title}>
        {@render content()}
    </TerminalContent>
</div>
