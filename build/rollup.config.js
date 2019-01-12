import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import minify from 'rollup-plugin-babel-minify'
export default [
    {
        input: 'src/wrapper.js',
        output: {
            name: 'BulmaAccordion',
            format: 'umd',
            file: 'dist/vue-bulma-accordion.umd.js',
            exports: 'named'
        },
        plugins: [
            vue({
                css: true
            }),
            minify({ comments: false })
        ],
        external: ['Vue', 'vue']
    },
    {
        input: 'src/wrapper.js',
        output: {
            name: 'BulmaAccordion',
            format: 'esm',
            file: 'dist/vue-bulma-accordion.mjs',
            exports: 'named'
        },
        plugins: [
            vue({
                css: true
            }),
            minify({ comments: false })
        ],
        external: ['vue', 'Vue']
    },
    {
        input: 'src/wrapper.js',
        output: {
            name: 'BulmaAccordion',
            format: 'iife',
            file: 'dist/vue-bulma-accordion.min.js',
            exports: 'named'
        },
        plugins: [
            vue({
                css: true
            }),
            buble(),
            minify({ comments: false })
        ],
        external: ['Vue', 'vue']
    }
]
