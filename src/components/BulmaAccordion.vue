<template>
    <div class="accordion">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'bulma-accordion',
    props: {
        caretAnimation: {
            required: false,
            type: Object,
            default: () => ({
                duration: '750ms',
                timerFunc: 'ease',
            }),
            validator: (config) => {
                const isValid =
                    typeof config.duration === 'string' &&
                    typeof config.timerFunc === 'string'
                return isValid
            },
        },
        dropdown: {
            required: false,
            type: Boolean,
            default: false,
        },
        icon: {
            required: false,
            type: String,
            default: 'caret',
            validator: (choice) => {
                const isValid =
                    choice === 'caret' ||
                    choice === 'plus-minus' ||
                    choice === 'custom'
                return isValid
            },
        },
        slide: {
            required: false,
            type: Object,
            default: () => ({
                duration: '1000ms',
                timerFunc: 'ease',
            }),
            validator: (config) => {
                const isValid =
                    typeof config.duration === 'string' &&
                    typeof config.timerFunc === 'string'
                return isValid
            },
        },
    },
}
</script>

<style>
</style>
