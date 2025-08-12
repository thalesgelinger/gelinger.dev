<script lang="ts">
    import { type Snippet } from "svelte";

    interface Props {
        title: string;
        children: Snippet<[]>;
    }

    let { title, children }: Props = $props();

    let showCursor = $state(true);
    let isTyping = $state(false);
</script>

<div class="p-8 min-h-screen">
    <div class="mb-8">
        <div class="flex items-center gap-4 mb-4">
            <div class="flex gap-2">
                <div class="w-3 h-3 rounded-full bg-icon-left"></div>
                <div class="w-3 h-3 rounded-full bg-icon-mid"></div>
                <div class="w-3 h-3 rounded-full bg-icon-right"></div>
            </div>
            <span class="text-sm text-accent">
                ~/portfolio/{title}
            </span>
        </div>
    </div>

    <div class="text-sm leading-relaxed">
        <!-- {displayText} -->
        <div class="prose prose-tokyo lg:prose-xl dark:prose-invert">
            {@render children()}
        </div>
        <span
            class="ml-1 inline-block w-2
                {showCursor || isTyping ? '' : 'opacity-0'}
                {showCursor || isTyping ? 'bg-text' : 'bg-transparent'}
                {showCursor || isTyping ? 'text-text' : 'text-transparent'}
            "
        >
            █
        </span>
    </div>
</div>
