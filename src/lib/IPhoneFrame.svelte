<script lang="ts">
    import type { Snippet } from "svelte";
    import { phoneStore } from "./stores.svelte";

    type Props = {
        title: string;
        color: string;
        children: Snippet;
        isMobile?: boolean;
    };

    let { title, color, children, isMobile }: Props = $props();

    let isDragging = $state(false);
    let phoneRef: HTMLDivElement | null = $state(null);
    let position = $state({
        x: 0,
        y: 0,
    });
    let dragStartRef = { x: 0, y: 0 };
    let initialCenterRef = { x: 0, y: 0 };
    let animationFrameId: number;

    const currentTime = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    $effect(() => {
        if (isMobile) {
            phoneStore.initialized = true;
            return;
        }

        const initializePosition = () => {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const centerX = (windowWidth - 320) / 2;
            const centerY = (windowHeight - 640) / 2;

            initialCenterRef = { x: centerX, y: centerY };

            if (!phoneStore.moved) {
                position = { x: centerX, y: centerY };
            }

            if (phoneStore.page === "blog") {
                phoneStore.moved = true;
                position = {
                    x: windowWidth - 320 - 50,
                    y: centerY - 20,
                };
            }

            phoneStore.initialized = true;

            return { x: centerX, y: centerY };
        };

        initialCenterRef = initializePosition();
        window.addEventListener("resize", initializePosition);
        return () => window.removeEventListener("resize", initializePosition);
    });

    function handleMouseDown(e: MouseEvent) {
        if (e.target === phoneRef || phoneRef?.contains(e.target as Node)) {
            isDragging = true;
            dragStartRef = {
                x: e.clientX - position.x,
                y: e.clientY - position.y,
            };
            e.preventDefault();
        }
    }

    function handleMouseMove(e: MouseEvent) {
        if (!isDragging) return;

        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }

        animationFrameId = requestAnimationFrame(() => {
            const newPosition = {
                x: e.clientX - dragStartRef.x,
                y: e.clientY - dragStartRef.y,
            };

            position = newPosition;

            // Check if phone has moved significantly (only once)
            if (!phoneStore.moved) {
                const distance = Math.sqrt(
                    Math.pow(newPosition.x - initialCenterRef.x, 2) +
                        Math.pow(newPosition.y - initialCenterRef.y, 2),
                );
                if (distance > 50) {
                    phoneStore.moved = true;
                }
            }
        });
    }

    function handleMouseUp() {
        isDragging = false;
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    }

    $effect(() => {
        document.addEventListener("mousemove", handleMouseMove, {
            passive: true,
        });
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    });
</script>

{#snippet screen()}
    <!-- Status Bar -->
    <div
        class="flex justify-between items-center px-6 py-2 text-white text-sm font-medium"
    >
        <span>{currentTime}</span>
        <div class="flex items-center gap-1">
            <div class="flex gap-1">
                <div class="w-1 h-1 bg-white rounded-full"></div>
                <div class="w-1 h-1 bg-white rounded-full"></div>
                <div class="w-1 h-1 bg-white rounded-full opacity-50"></div>
            </div>
            <span class="ml-2">100%</span>
            <div class="w-6 h-3 border border-white rounded-sm ml-1">
                <div class="w-full h-full bg-green-500 rounded-sm"></div>
            </div>
        </div>
    </div>

    <!-- Dynamic Island - Current App Indicator -->
    <div class="absolute top-12 left-1/2 transform -translate-x-1/2 z-10">
        <div
            class="inline-flex items-center gap-2 bg-black bg-opacity-60 rounded-full px-4 py-2 backdrop-blur-sm"
        >
            <div
                class="w-3 h-3 rounded-full"
                style="background-color: {color}"
            ></div>
            <span class="text-white text-sm font-medium">
                {title}
            </span>
        </div>
    </div>

    <!-- Wallpaper -->
    <div
        class="absolute inset-0 bg-gradient-to-br from-[#bb9af7] via-[#7aa2f7] to-[#1a1b26]"
    >
        <div
            class="absolute inset-0 bg-black mix-blend-multiply opacity-10 pointer-events-none"
        ></div>
    </div>

    <!-- Screen Content -->
    <div class="relative z-10 p-6 pt-16 h-full flex flex-col">
        {#if !phoneStore.moved}
            <!-- Onboarding Screen -->
            <div
                class="flex-1 flex flex-col items-center justify-center text-center"
            >
                <div class="mb-8">
                    <div class="text-6xl mb-4">📱</div>
                    <h2 class="text-white text-xl font-bold mb-2">
                        Drag Me Around!
                    </h2>
                    <p class="text-white text-sm opacity-80 mb-6">
                        Move this iPhone to start exploring the terminal blog
                    </p>
                </div>

                <div class="flex flex-col items-center gap-3">
                    <div class="flex items-center gap-2 text-white text-sm">
                        <span>👆</span>
                        <span>Click and drag to move</span>
                    </div>
                    <div class="flex items-center gap-2 text-white text-sm">
                        <span>🎯</span>
                        <span>Position anywhere you like</span>
                    </div>
                    <div class="flex items-center gap-2 text-white text-sm">
                        <span>📱</span>
                        <span>Then tap apps to navigate</span>
                    </div>
                </div>

                <div class="mt-8">
                    <div
                        class="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center"
                    >
                        <span class="text-white text-sm">↕</span>
                    </div>
                </div>
            </div>
        {:else}
            <!-- Normal Home Screen -->
            <!-- App Grid with Labels -->
            <div class="grid grid-cols-4 gap-4">
                {@render children()}
            </div>
        {/if}
    </div>

    <!-- Home Indicator -->
    <div class="absolute bottom-2 left-1/2 transform -translate-x-1/2">
        <div class="w-32 h-1 bg-white bg-opacity-60 rounded-full"></div>
    </div>
{/snippet}

{#if !isMobile && phoneStore.initialized}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
        bind:this={phoneRef}
        class={`z-50 select-none fixed
            ${isDragging ? "cursor-grabbing" : "cursor-grab"}
            ${!phoneStore.moved && !isDragging ? "animate-(--phone-bounce)" : "none"}
            ${isDragging ? "scale-[1.02] transition-none will-change-transform" : "scale-100 transition-transform duration-200 ease-in-out will-change-auto"}
            filter:drop-shadow(0_15px_30px_rgba(0,0,0,0.25))_drop-shadow(0_5px_15px_rgba(0,0,0,0.15))
            dark:filter:drop-shadow(0_15px_30px_rgba(255,255,255,0.08))_drop-shadow(0_5px_15px_rgba(255,255,255,0.05))
          `}
        style="
    left: {position.x}px;
    top: {position.y}px;
  "
        onmousedown={handleMouseDown}
    >
        <!-- iPhone Frame -->
        <div class="w-80 h-[640px] bg-black rounded-[3rem] p-2">
            <!-- Screen -->

            <div
                class="w-full h-full bg-gray-900 rounded-[2.5rem] overflow-hidden relative"
            >
                {@render screen()}
            </div>
        </div>

        <!-- iPhone Reflection - Reduced opacity -->
        <div
            class="absolute inset-0 bg-gradient-to-t from-transparent to-white opacity-5 rounded-[3rem] pointer-events-none"
        ></div>
    </div>
{:else}
    {@render screen()}
{/if}
