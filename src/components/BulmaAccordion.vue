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
                duration: '450ms',
                timerFunc: 'ease'
            }),
            validator: config => {
                const isValid =
                    (typeof config.duration === 'string' &&
                        typeof config.timerFunc === 'string') ||
                    config.none === true
                return isValid
            }
        },
        dropdown: {
            required: false,
            type: Boolean,
            default: false
        },
        icon: {
            required: false,
            type: String,
            default: 'caret',
            validator: choice => {
                const isValid =
                    choice === 'caret' ||
                    choice === 'plus-minus' ||
                    choice === 'custom'
                return isValid
            }
        },
        slide: {
            required: false,
            type: Object,
            default: () => ({
                duration: '700ms',
                timerFunc: 'ease'
            }),
            validator: config => {
                const isValid =
                    typeof config.duration === 'string' &&
                    typeof config.timerFunc === 'string'
                return isValid
            }
        }
    }
}
</script>

<style>
</style>
