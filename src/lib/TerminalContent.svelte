<script lang="ts">
    import { onDestroy, onMount } from "svelte";

    interface Props {
        title: string;
        content: string;
    }

    let { title, content }: Props = $props();

    let displayText = $state("");
    let showCursor = $state(true);
    let isTyping = $state(false);
    let typeInterval: number | undefined;
    let cursorInterval: number | undefined;

    function startTypingEffect() {
        displayText = "";
        isTyping = true;
        showCursor = true;
        let index = 0;

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
    onMount(() => {
        startTypingEffect();
    });

    onDestroy(() => {
        if (typeInterval) {
            clearInterval(typeInterval);
        }
        if (cursorInterval) {
            clearInterval(cursorInterval);
        }
    });
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
        {displayText}
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
