<template>
    <div class="plus-minus">
        <div class="horizontal"></div>
        <div :class="verticalClasses"></div>
    </div>
</template>

<script>
export default {
    props: {
        minus: {
            required: true,
            type: Boolean
        }
    },
    computed: {
        verticalClasses() {
            return {
                vertical: true,
                'vertical-rotated': this.minus
            }
        }
    }
}
</script>

<style>
.horizontal,
.vertical {
    position: absolute;
    border-radius: 3px;
    background: rgb(100, 100, 100);
    transform: rotate(0deg);
    transition: 400ms all ease-out;
}

.horizontal {
    top: 45%;
    left: 10%;
    right: 10%;
    height: 10%;
}

.vertical {
    top: 10%;
    bottom: 10%;
    left: 45%;
    width: 10%;
}
.vertical-rotated {
    transform: rotate(90deg);
}
.plus-minus {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
}
</style>
