<script lang="ts">
    import type { MouseEventHandler } from "svelte/elements";

    type Props = {
        title: string;
        icon?: string;
        color: string;
        onclick: MouseEventHandler<HTMLButtonElement> | null | undefined;
    };

    let { title, icon, color, onclick }: Props = $props();
</script>

<div class="flex flex-col items-center relative group">
    <button
        {onclick}
        class="w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl ring-2 ring-white ring-opacity-50 text-white"
        style="background-color: {color};"
    >
        {@html icon}
    </button>

    <span
        class="truncate w-14 text-white text-xs font-medium drop-shadow-sm mt-1 text-center"
    >
        {title}
    </span>

    <!-- Tooltip -->
    <div
        class="absolute bottom-full mb-2 hidden group-hover:block px-2 py-1 text-xs text-white bg-gray-800 rounded shadow-lg whitespace-nowrap left-1/2 -translate-x-1/2 z-[99]"
    >
        {title}
    </div>
</div>
