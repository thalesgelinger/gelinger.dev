import adapter from "@sveltejs/adapter-cloudflare";
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: [mdsvex({
        extensions: ['.md']
    })],
    kit: {
        adapter: adapter(),
    },
    extensions: ['.svelte', '.svx', '.md']
};

export default config;
