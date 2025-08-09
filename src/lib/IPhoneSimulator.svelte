<script lang="ts">
    import { type AppType, phoneStore } from "./stores.svelte";

    let apps: AppType[] = $state([
        {
            id: "theme",
            name: "Theme",
            icon: "",
            color: "bg-grey200",
            action: () => {
                console.log("BATATA");

                document.documentElement.classList.toggle("dark");
            },
        },
    ]);

    let isDragging = $state(false);
    let phoneRef: HTMLDivElement | null = $state(null);
    let dragStartRef = { x: 0, y: 0 };
    let initialCenterRef = { x: 0, y: 0 };
    let animationFrameId: number;

    const currentTime = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    $effect(() => {
        const initializePosition = () => {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const centerX = (windowWidth - 320) / 2;
            const centerY = (windowHeight - 640) / 2;

            initialCenterRef = { x: centerX, y: centerY };

            if (!phoneStore.moved) {
                phoneStore.position = { x: centerX, y: centerY };
            }

            if (phoneStore.page === "blog") {
                phoneStore.moved = true;
                phoneStore.position = {
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
                x: e.clientX - phoneStore.position.x,
                y: e.clientY - phoneStore.position.y,
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

            phoneStore.position = newPosition;

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

    function handleAppClick(app: AppType, e: MouseEvent) {
        e.stopPropagation();

        app.action?.();
    }
</script>

{#if phoneStore.initialized}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
        bind:this={phoneRef}
        class={`z-50 select-none absolute
            ${isDragging ? "cursor-grabbing" : "cursor-grab"}
            ${!phoneStore.moved && !isDragging ? "animate-(--phone-bounce)" : "none"}
            ${isDragging ? "scale-[1.02] transition-none will-change-transform" : "scale-100 transition-transform duration-200 ease-in-out will-change-auto"}
            filter:drop-shadow(0_15px_30px_rgba(0,0,0,0.25))_drop-shadow(0_5px_15px_rgba(0,0,0,0.15))
            dark:filter:drop-shadow(0_15px_30px_rgba(255,255,255,0.08))_drop-shadow(0_5px_15px_rgba(255,255,255,0.05))
          `}
        style="
    left: {phoneStore.position.x}px;
    top: {phoneStore.position.y}px;
  "
        onmousedown={handleMouseDown}
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
                        <div class="w-3 h-3 rounded-full"></div>
                        <span class="text-white text-sm font-medium">
                            <!-- {currentApp.name} -->
                            CURRENT APP
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
                                        onclick={(e) => handleAppClick(app, e)}
                                        class="
                      w-14 h-14 rounded-xl flex items-center justify-center text-2xl
                      transition-all duration-200 hover:scale-110 active:scale-95
                      shadow-lg hover:shadow-xl ring-2 ring-white ring-opacity-50
                      {app.color} 
                    "
                                    >
                                        {app.icon}
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
