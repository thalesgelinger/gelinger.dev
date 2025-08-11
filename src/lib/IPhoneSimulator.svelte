<script lang="ts">
    import { goto } from "$app/navigation";
    import AppButton from "./AppButton.svelte";
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
        <AppButton
            title={app.title}
            icon={app.icon}
            onclick={(e) => handleAppClick(app, e)}
        />
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
