<template>
    <div :class="card_classes">
        <div class="card-header" @click="toggleCollapsed">
            <p class="card-header-title">
                <slot name="title"></slot>
            </p>
            <p class="card-header-icon" aria-label="more options">
                <span class="icon">
                    <transition :name="animation" mode="out-in">
                        <i v-if="isOpen" key="up_arrow" class="fa fa-angle-up" aria-hidden="true"></i>
                        <i v-else key="down_arrow" class="fa fa-angle-down" aria-hidden="true"></i>
                    </transition>
                </span>
            </p>
        </div>
        <div class="accordion-body" :id="item_ids.body">
            <div class="card-content">
                <slot name="content"></slot>
            </div>
            <div class="card-footer">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>

<script>
import Velocity from 'velocity-animate'

export default {
    name: 'pro-bulma-accordion-item',
    data () {
        return {
            isOpen: false,
            animation: 'none',
            isAccordion: false,
        }
    },
    created () {
        this.animation = this.$parent.animation
        this.isAccordion = this.$parent.accordion
    },
    mounted () {
        this.$parent.$on('toggle', this.collapse)
    },
    destroyed () {
        this.$parent.$off('toggle')
    },
    watch: {
        isOpen (isOpen) {
            this.doTheSlide()
        },
    },
    methods: {
        collapse () {
            this.isOpen = false
        },
        toggleCollapsed () {
            if (!this.isOpen && this.isAccordion) this.$parent.$emit('toggle')
            this.isOpen = !this.isOpen
        },
        doTheSlide () {
            const element = document.getElementById(this.item_ids.body)
            if (this.isOpen === true) {
                Velocity(element, 'slideDown', {duration: 500})
            } else {
                Velocity(element, 'slideUp', {duration: 500})
            }
        },
    },
    computed: {
        dropdown_icon_classes () {
            return {
                'fa': true,
                'fa-angle-down': !this.isOpen,
                'fa-angle-up': this.isOpen,
            }
        },
        card_classes () {
            return {
                'card': true,
                'card-active': this.isOpen,
            }
        },
        item_ids () {
            return {
                head: 'h' + this._uid,
                body: 'b' + this._uid,
                footer: 'f' + this._uid,
            }
        },
    },
}
</script>

<style scoped>
.accordion-body {
    display: none;
}
/* Spin */
.spin-leave-active, .spin-enter-active {
    transition: transform .3s;
}
.spin-leave-to {
    transform: rotate(180deg);
}
.spin-enter {
    transform: scale(1.3);
}
</style>