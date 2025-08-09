<script lang="ts">
    import { phoneStore } from "$lib/stores.svelte";
    import TerminalContent from "$lib/TerminalContent.svelte";
    import type { PageProps } from "../../$types";

    let { data }: PageProps = $props();
    const { title, content } = data as { title: string; content: string };
    $effect(() => {
        phoneStore.page = "blog";
    });
</script>

<div class="p-8">
    <TerminalContent {title} {content} />
</div>
