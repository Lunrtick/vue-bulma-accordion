<template>
    <div class="accordion">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "pro-bulma-accordion",
    props: {
        animation: {
            required: false,
            type: String,
            default: 'none',
            validator: (choice) => {
                const is_valid = 
                    choice === 'flip' ||
                    choice === 'none';
                return  is_valid;
            }
        },
        accordion: {
            required: false,
            type: Boolean,
            default: false
        }
    }
}
</script>

<style>
</style>
