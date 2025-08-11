<script lang="ts">
    import { phoneStore } from "$lib/stores.svelte";
    import TerminalContent from "$lib/TerminalContent.svelte";
    import type { Snippet } from "svelte";
    import type { PageProps } from "../../$types";

    let { data }: PageProps = $props();
    const { title, content } = data as {
        title: string;
        content: Snippet;
    };
    $effect(() => {
        phoneStore.page = "blog";
    });
</script>

<div class="p-8">
    <TerminalContent {title}>
        {@render content()}
    </TerminalContent>
</div>
