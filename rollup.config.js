import {
	terser
} from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';
import globals from 'rollup-plugin-node-globals';
import resolve from 'rollup-plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';

const production = !process.env.ROLLUP_WATCH;

export default [{
		input: `src/content/main.js`,
		output: {
			file: `package/js/content.js`,
			format: 'iife',
			sourcemap: true,
		},
		plugins: [
			svelte({
				// enable run-time checks when not in production
				dev: !production,
				css: css => {
					css.write(`package/css/content.css`)
				},
				hydratable: true,
			}),
			// If you have external dependencies installed from
			// npm, you'll most likely need these plugins. In
			// some cases you'll need additional configuration —
			// consult the documentation for details:
			// https://github.com/rollup/rollup-plugin-commonjs
			resolve({
				browser: true,
				dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/'),
				preferBuiltins: true,
			}),
			commonjs(),
			globals(),
			// If we're building for production (npm run build
			// instead of npm run dev), minify
			production && terser(),
		],
	},
]