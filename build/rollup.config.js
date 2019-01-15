// rollup.config.js
import vue from 'rollup-plugin-vue';
import buble from 'rollup-plugin-buble';
import replace from 'rollup-plugin-replace';
import { terser } from "rollup-plugin-terser";
import minimist from 'minimist';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

const argv = minimist(process.argv.slice(2));

const config = {
    input: 'src/entry.js',
    output: {
        name: 'BulmaAccordion',
        globals: {
            'vue': 'Vue'
        },
    },
    external: ['vue'],
    plugins: [
        replace({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        vue({
            css: true,
            compileTemplate: true,
            template: {
                isProduction: true
            }
        }),
        buble(),
        resolve(),
        commonjs({'../src/entry.js': ['BulmaAccordion', 'BulmaAccordionItem']})
    ]
};

// Only minify browser (iife) version
if (argv.format === 'iife') {
    config.plugins.push(terser());
}

export default config;
