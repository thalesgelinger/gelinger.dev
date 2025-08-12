<script lang="ts">
	import { quintOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { phoneStore } from './stores.svelte';

	let { delay = 0 }: { delay?: number } = $props();

	let sheetElement: HTMLElement;
	let contentElement: HTMLElement;
	let dragging = false;
	let startY: number;
	let height = tweened(100, { duration: 300, easing: quintOut });

	function handleTouchStart(e: TouchEvent) {
		const target = e.target as HTMLElement;
		if (!target.closest('.handle')) return;
		dragging = true;
		startY = e.touches[0].clientY;
	}

	function handleTouchMove(e: TouchEvent) {
		if (!dragging) return;
		const newHeight = window.innerHeight - e.touches[0].clientY;
		if (newHeight > 50 && newHeight < window.innerHeight - 20) {
			height.set(newHeight, { duration: 0 });
		}
	}

	function handleTouchEnd() {
		dragging = false;
		const currentHeight = $height;
		const snapPoint = window.innerHeight * 0.4;

		if (currentHeight < snapPoint) {
			height.set(100);
			phoneStore.isSheetOpen = false;
		} else {
			height.set(window.innerHeight - 20);
			phoneStore.isSheetOpen = true;
		}
	}

	function handleMouseDown(e: MouseEvent) {
		const target = e.target as HTMLElement;
		if (!target.closest('.handle')) return;
		dragging = true;
		startY = e.clientY;
	}

	function handleMouseMove(e: MouseEvent) {
		if (!dragging) return;
		const newHeight = window.innerHeight - e.clientY;
		if (newHeight > 50 && newHeight < window.innerHeight - 20) {
			height.set(newHeight, { duration: 0 });
		}
	}

	function handleMouseUp() {
		if (!dragging) return;
		dragging = false;
		const currentHeight = $height;
		const snapPoint = window.innerHeight * 0.4;

		if (currentHeight < snapPoint) {
			height.set(100);
			phoneStore.isSheetOpen = false;
		} else {
			height.set(window.innerHeight - 20);
			phoneStore.isSheetOpen = true;
		}
	}

	$effect(() => {
		const timeoutId = setTimeout(() => {
			height.set(window.innerHeight - 20);
			phoneStore.isSheetOpen = true;
		}, delay);

		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);

		return () => {
			clearTimeout(timeoutId);
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		};
	});

	$effect(() => {
		if (phoneStore.sheetCommand === 'close') {
			height.set(100);
			phoneStore.isSheetOpen = false;
			phoneStore.sheetCommand = ''; // Reset command
		}
	});
</script>

<div
	bind:this={sheetElement}
	class="fixed bottom-0 left-0 right-0 bg-bg-secondary rounded-t-2xl shadow-lg z-50"
	style="height: {$height}px; overscroll-behavior-y: contain;"
	on:touchstart={handleTouchStart}
	on:touchmove={handleTouchMove}
	on:touchend={handleTouchEnd}
	on:mousedown={handleMouseDown}
>
	<div class="handle cursor-grab h-8 flex items-center justify-center" style="touch-action: none;">
		<div class="w-12 h-1.5 bg-gray-500 rounded-full" />
	</div>
	<div bind:this={contentElement} class="overflow-y-auto" style="height: calc(100% - 2rem);">
		<slot />
	</div>
</div>
