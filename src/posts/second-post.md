---
title: Interactive Apps
description: Building interactive apps with SvelteKit
date: '2023-4-16'
categories:
  - sveltekit
  - svelte
published: true
app:
  name: App Demo
  icon: 📱
  color: bg-gradient-to-br from-green-500 to-teal-500
  description: A demonstration of interactive app capabilities in SvelteKit
---

## Interactive Apps in SvelteKit

This post demonstrates how to build interactive applications using SvelteKit. The iPhone simulator on the right shows how we can create engaging user interfaces.

```svelte
<script>
  let count = 0
  
  function increment() {
    count++
  }
</script>

<button on:click={increment}>
  Count: {count}
</button>
```

