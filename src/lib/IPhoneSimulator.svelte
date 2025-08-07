<script lang="ts">
    import { onMount } from "svelte";
    import type { AppType, Theme } from "./stores";

    export let apps: AppType[];
    export let currentApp: AppType;
    export let onAppSelect: (app: AppType) => void;
    export let hasMovedPhone: boolean;
    export let onPhoneMoved: () => void;
    export let theme: Theme;
    export let toggleTheme: () => void;

    let position = { x: 0, y: 0 };
    let isDragging = false;
    let isInitialized = false;
    let phoneRef: HTMLDivElement;
    let dragStartRef = { x: 0, y: 0 };
    let initialCenterRef = { x: 0, y: 0 };
    let animationFrameId: number;

    const currentTime = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    // Initialize position immediately to prevent glitching
    onMount(() => {
        const initializePosition = () => {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const centerX = (windowWidth - 320) / 2; // 320px is phone width
            const centerY = (windowHeight - 640) / 2; // 640px is phone height

            initialCenterRef = { x: centerX, y: centerY };

            if (!hasMovedPhone) {
                position = { x: centerX, y: centerY };
            }
            isInitialized = true;
        };

        initializePosition();
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
            if (!hasMovedPhone) {
                const distance = Math.sqrt(
                    Math.pow(newPosition.x - initialCenterRef.x, 2) +
                        Math.pow(newPosition.y - initialCenterRef.y, 2),
                );
                if (distance > 50) {
                    onPhoneMoved();
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

    onMount(() => {
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

    function handleAppClick(app: AppType, e: MouseEvent) {
        e.stopPropagation();

        // If it's the settings app, only toggle theme without changing content
        if (app.id === "settings") {
            toggleTheme();
            // Don't call onAppSelect for settings - just toggle theme
        } else {
            onAppSelect(app);
        }
    }
</script>

{#if isInitialized}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
        bind:this={phoneRef}
        class={`fixed z-50 select-none 
            ${isDragging ? "cursor-grabbing" : "cursor-grab"}
            ${!hasMovedPhone && !isDragging ? "animate-(--phone-bounce)" : "none"}
        `}
        style="
      left: {position.x}px;
      top: {position.y}px;
      transform: {isDragging ? 'scale(1.02)' : 'scale(1)'};
      transition: {isDragging ? 'none' : 'transform 0.2s ease'};
      will-change: {isDragging ? 'transform' : 'auto'};
      filter: {theme === 'dark'
            ? 'drop-shadow(0 15px 30px rgba(255, 255, 255, 0.08)) drop-shadow(0 5px 15px rgba(255, 255, 255, 0.05))'
            : 'drop-shadow(0 15px 30px rgba(0, 0, 0, 0.25)) drop-shadow(0 5px 15px rgba(0, 0, 0, 0.15))'};
    "
        on:mousedown={handleMouseDown}
    >
        <!-- iPhone Frame -->
        <div class="w-80 h-[640px] bg-black rounded-[3rem] p-2">
            <!-- Screen -->
            <div
                class="w-full h-full bg-gray-900 rounded-[2.5rem] overflow-hidden relative"
            >
                <!-- Status Bar -->
                <div
                    class="flex justify-between items-center px-6 py-2 text-white text-sm font-medium"
                >
                    <span>{currentTime}</span>
                    <div class="flex items-center gap-1">
                        <div class="flex gap-1">
                            <div class="w-1 h-1 bg-white rounded-full"></div>
                            <div class="w-1 h-1 bg-white rounded-full"></div>
                            <div
                                class="w-1 h-1 bg-white rounded-full opacity-50"
                            ></div>
                        </div>
                        <span class="ml-2">100%</span>
                        <div
                            class="w-6 h-3 border border-white rounded-sm ml-1"
                        >
                            <div
                                class="w-full h-full bg-green-500 rounded-sm"
                            ></div>
                        </div>
                    </div>
                </div>

                <!-- Dynamic Island - Current App Indicator -->
                <div
                    class="absolute top-12 left-1/2 transform -translate-x-1/2 z-20"
                >
                    <div
                        class="inline-flex items-center gap-2 bg-black bg-opacity-60 rounded-full px-4 py-2 backdrop-blur-sm"
                    >
                        <div
                            class="w-3 h-3 rounded-full {currentApp.color}"
                        ></div>
                        <span class="text-white text-sm font-medium">
                            {currentApp.name}
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
                    {#if !hasMovedPhone}
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
                                    Move this iPhone to start exploring the
                                    terminal blog
                                </p>
                            </div>

                            <div class="flex flex-col items-center gap-3">
                                <div
                                    class="flex items-center gap-2 text-white text-sm"
                                >
                                    <span>👆</span>
                                    <span>Click and drag to move</span>
                                </div>
                                <div
                                    class="flex items-center gap-2 text-white text-sm"
                                >
                                    <span>🎯</span>
                                    <span>Position anywhere you like</span>
                                </div>
                                <div
                                    class="flex items-center gap-2 text-white text-sm"
                                >
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
                            {#each apps as app (app.id)}
                                <div class="flex flex-col items-center">
                                    <button
                                        on:click={(e) => handleAppClick(app, e)}
                                        class="
                      w-14 h-14 rounded-xl flex items-center justify-center text-2xl
                      transition-all duration-200 hover:scale-110 active:scale-95
                      {app.color} {currentApp.id === app.id
                                            ? 'ring-2 ring-white ring-opacity-50'
                                            : ''}
                      shadow-lg hover:shadow-xl
                    "
                                    >
                                        {app.id === "settings"
                                            ? theme === "dark"
                                                ? "☀️"
                                                : "🌙"
                                            : app.icon}
                                    </button>
                                    <span
                                        class="text-white text-xs font-medium drop-shadow-sm mt-1 text-center"
                                    >
                                        {app.name}
                                    </span>
                                </div>
                            {/each}
                        </div>
                    {/if}
                </div>

                <!-- Home Indicator -->
                <div
                    class="absolute bottom-2 left-1/2 transform -translate-x-1/2"
                >
                    <div
                        class="w-32 h-1 bg-white bg-opacity-60 rounded-full"
                    ></div>
                </div>
            </div>
        </div>

        <!-- iPhone Reflection - Reduced opacity -->
        <div
            class="absolute inset-0 bg-gradient-to-t from-transparent to-white opacity-5 rounded-[3rem] pointer-events-none"
        ></div>
    </div>
{/if}

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
