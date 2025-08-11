<script lang="ts">
    import { goto } from "$app/navigation";
    import IPhoneFrame from "./IPhoneFrame.svelte";
    import { type AppType } from "./stores.svelte";

    type Props = {
        posts: Array<AppType>;
    };

    let { posts }: Props = $props();

    let apps = $state<Array<AppType>>([
        {
            type: "app",
            slug: "theme",
            title: "Theme",
            description: "Switch dark and light theme",
        },
        ...posts,
    ]);

    function handleAppClick(app: AppType, e: MouseEvent) {
        e.stopPropagation();

        switch (app.type) {
            case "post":
                goto(`/blog/${app.slug}`);
                break;
            case "app":
                {
                    switch (app.slug) {
                        case "theme":
                            document.documentElement.classList.toggle("dark");
                            break;
                    }
                }
                break;
        }
    }
</script>

<IPhoneFrame>
    {#each apps as app (app.slug)}
        <div class="flex flex-col items-center">
            <button
                onclick={(e) => handleAppClick(app, e)}
                class="w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl ring-2 ring-white ring-opacity-50"
            >
                {app.icon}
            </button>
            <span
                class="text-white text-xs font-medium drop-shadow-sm mt-1 text-center"
            >
                {app.title}
            </span>
        </div>
    {/each}
</IPhoneFrame>

<style>
    @keyframes pulse {
        0%,
        100% {
            opacity: 0.7;
        }
        50% {
            opacity: 1;
        }
    }
</style>
