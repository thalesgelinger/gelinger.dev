<script lang="ts">
    import type { MouseEventHandler } from "svelte/elements";

    type Props = {
        title: string;
        icon?: string;
        onclick: MouseEventHandler<HTMLButtonElement> | null | undefined;
    };

    let { title, icon, onclick }: Props = $props();
</script>

<div class="flex flex-col items-center">
    <button
        {onclick}
        class="w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl ring-2 ring-white ring-opacity-50"
    >
        {icon}
    </button>
    <span
        class="text-white text-xs font-medium drop-shadow-sm mt-1 text-center"
    >
        {title}
    </span>
</div>
