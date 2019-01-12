module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: ['standard', 'prettier/standard'],
    // required to lint *.vue files
    plugins: ['html'],
    env: {
        browser: true
    },
    // add your custom rules here
    rules: {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        indent: ['error', 4],
        // trailing comma
        'comma-dangle': ['error'],
        'space-before-function-paren': 0
    }
}
