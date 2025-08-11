/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
        extend: {
            typography: () => ({
                tokyo: {
                    css: {
                        '--tw-prose-body': 'var(--color-text)',
                        '--tw-prose-headings': 'var(--color-text)',
                        '--tw-prose-lead': 'var(--color-muted)',
                        '--tw-prose-links': 'var(--color-accent)',
                        '--tw-prose-bold': 'var(--color-text)',
                        '--tw-prose-counters': 'var(--color-muted)',
                        '--tw-prose-bullets': 'var(--color-border)',
                        '--tw-prose-hr': 'var(--color-border)',
                        '--tw-prose-quotes': 'var(--color-text)',
                        '--tw-prose-quote-borders': 'var(--color-border)',
                        '--tw-prose-captions': 'var(--color-muted)',
                        '--tw-prose-code': 'var(--color-secondary)',
                        '--tw-prose-pre-code': 'var(--color-text)',
                        '--tw-prose-pre-bg': 'var(--color-card)',
                        '--tw-prose-th-borders': 'var(--color-border)',
                        '--tw-prose-td-borders': 'var(--color-border)',
                        // Invert variants (same as regular since CSS vars will switch automatically)
                        '--tw-prose-invert-body': 'var(--color-text)',
                        '--tw-prose-invert-headings': 'var(--color-text)',
                        '--tw-prose-invert-lead': 'var(--color-muted)',
                        '--tw-prose-invert-links': 'var(--color-accent)',
                        '--tw-prose-invert-bold': 'var(--color-text)',
                        '--tw-prose-invert-counters': 'var(--color-muted)',
                        '--tw-prose-invert-bullets': 'var(--color-border)',
                        '--tw-prose-invert-hr': 'var(--color-border)',
                        '--tw-prose-invert-quotes': 'var(--color-text)',
                        '--tw-prose-invert-quote-borders': 'var(--color-border)',
                        '--tw-prose-invert-captions': 'var(--color-muted)',
                        '--tw-prose-invert-code': 'var(--color-secondary)',
                        '--tw-prose-invert-pre-code': 'var(--color-text)',
                        '--tw-prose-invert-pre-bg': 'var(--color-card)',
                        '--tw-prose-invert-th-borders': 'var(--color-border)',
                        '--tw-prose-invert-td-borders': 'var(--color-border)',
                    },
                }
            }),
        },
    },
}
