<template>
    <div class="accordion">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'bulma-accordion',
    props: {
        animation: {
            required: false,
            type: String,
            default: 'none',
            validator: (choice) => {
                const isValid =
                    choice === 'spin' ||
                    choice === 'none'
                return isValid
            },
        },
        accordion: {
            required: false,
            type: Boolean,
            default: false,
        },
    },
}
</script>

<style>
</style>
