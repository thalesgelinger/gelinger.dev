<script lang="ts">
	import BottomSheet from '$lib/BottomSheet.svelte';
	import TerminalContent from '$lib/TerminalContent.svelte';
	import { phoneStore } from '$lib/stores.svelte';

	let title = 'home';
</script>

{#snippet terminalHome()}
	<TerminalContent {title}>
		<div class="flex gap-9">
			<img src="/me.jpeg" alt="Thales Gelinger" class="h-20 rounded-full" />
			<h2>Hey, i’m Thales Gelinger</h2>
		</div>
		<p>
			I build cool stuff, write about it, and repeat, take a look in my posts, you may find
			something interesting, i also do some youtube videos sometimes
		</p>
		<iframe
			height="405"
			class="w-full"
			src="https://www.youtube.com/embed/sHI-_jbSuZY"
			title="I'm tired of JS so i started a new mobile framework using lua and rust"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerpolicy="strict-origin-when-cross-origin"
			allowfullscreen
		></iframe>

		<div class="flex w-full justify-end">
			<img src="/tails-running.gif" alt="Tails" class="h-20" />
		</div>
	</TerminalContent>
{/snippet}

{#if phoneStore.isMobile}
	<BottomSheet delay={300}>
		<div class="md:p-8 bg-bg text-text">
			{@render terminalHome()}
		</div>
	</BottomSheet>
{:else if phoneStore.moved}
	<div class="md:p-8">
		{@render terminalHome()}
	</div>
{:else}
	<div class="mx-auto max-w-2xl p-8 text-center">
		<div class="mb-8">
			<h1 class="mb-4 text-4xl font-bold text-accent">Welcome to My Terminal Blog</h1>
			<p class="mb-6 text-lg text-text">
				A unique blend of terminal aesthetics and mobile navigation
			</p>
			<div class="mb-8 text-sm opacity-75">
				<p>Drag the iPhone to start exploring →</p>
			</div>
		</div>

		<!-- ASCII Art Welcome -->
		<div class="font-mono mb-8 text-xs text-secondary">
			<pre>{`
╭─────────────────────────────────────╮
│     Welcome to the Terminal Blog    │
│                                     │
│  ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐  │
│  └─┘ └─┘ └─┘ └─┘ └─┘ └─┘ └─┘ └─┘  │
│                                     │
│    Navigate using the iPhone →      │
╰─────────────────────────────────────╯
        `}</pre>
		</div>
	</div>
{/if}
