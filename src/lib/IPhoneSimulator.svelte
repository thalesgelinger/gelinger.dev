<script lang="ts">
    import { goto } from "$app/navigation";
    import AppButton from "./AppButton.svelte";
    import IPhoneFrame from "./IPhoneFrame.svelte";
    import { type AppType } from "./stores.svelte";

    type Props = {
        posts: Array<AppType>;
        isMobile?: boolean;
    };

    let { posts, isMobile }: Props = $props();

    let apps = $state<Array<AppType>>([
        {
            type: "app",
            slug: "home",
            title: "Home",
            description: "Home page",
            icon: "🏠",
            color: "#8ACDEA",
        },
        ...posts,
        {
            type: "app",
            slug: "theme",
            title: "Theme",
            description: "Switch dark and light theme",
            color: "#dedede",
            icon: "☀️",
        },
    ]);

    let currentApp = $state(apps[0]);

    function handleAppClick(app: AppType, e: MouseEvent) {
        e.stopPropagation();

        if (app.slug !== "theme") {
            currentApp = app;
        }

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
                        case "home":
                            goto("/");
                            break;
                    }
                }
                break;
        }
    }
</script>

<IPhoneFrame
    title={currentApp.type === "post" ? "Post" : currentApp.title}
    color={currentApp.color ?? "#FFFFFF"}
    {isMobile}
>
    {#each apps as app (app.slug)}
        <AppButton
            title={app.title}
            icon={app.icon}
            color={app?.color ?? "#FFFFFF"}
            onclick={(e) => handleAppClick(app, e)}
        />
    {/each}
</IPhoneFrame>
