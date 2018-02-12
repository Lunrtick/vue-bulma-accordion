<template>
    <div :class="card_classes">
        <div class="card-header" @click="toggleCollapsed">
            <p class="card-header-title">
                <slot name="title"></slot>
            </p>
            <p class="card-header-icon">
                <span v-if="!usingCustomIcon" class="icon">
                    <Caret v-if="showCaret" :class="dropdownIconClasses" :style="iconStyle"/>
                    <PlusMinus v-if="showPlus || showMinus" :minus="showMinus"/>
                </span>
                <span v-else class="icon">
                    <slot name="icon"></slot>
                    <slot v-if="isOpen" name="icon-open"></slot>
                    <slot v-else name="icon-closed"></slot>
                </span>
            </p>
        </div>
        <div class="accordion-body" ref="body" :style="slideStyle">
            <div class="card-content">
                <slot name="content"></slot>
            </div>
            <div :class="footerClasses">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>

<script>
import Caret from '../icons/caret.svg'
import PlusMinus from './PlusMinus.vue'
export default {
    name: 'bulma-accordion-item',
    components: {
        Caret,
        PlusMinus,
    },
    data () {
        return {
            isOpen: false,
        }
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
            if (!this.isOpen && !this.isDropdown) this.$parent.$emit('toggle')
            this.isOpen = !this.isOpen
        },
        doTheSlide () {
            const element = this.$refs.body
            if (this.isOpen === true) {
                this.slideDown(element)
            } else {
                this.slideUp(element)
            }
        },
        slideDown (el) {
            el.style.height = `${el.scrollHeight}px`
        },
        slideUp (el) {
            el.style.height = '0px'
        },
    },
    computed: {
        config () {
            const {
                caretAnimation: animation = {
                    duration: '450ms',
                    timerFunc: 'ease',
                },
                dropdown = false,
                icon = 'caret',
                slide = {
                    duration: '700ms',
                    timerFunc: 'ease',
                },
            } = this.$parent
            return {
                animation,
                dropdown,
                icon,
                slide,
            }
        },
        dropdownIconClasses () {
            return {
                'header-icon': true,
                'caret-down': !this.isOpen,
            }
        },
        card_classes () {
            return {
                'card': true,
                'card-active': this.isOpen,
            }
        },
        footerClasses () {
            return {
                'card-footer': true,
                'is-hidden': !this.$slots.footer,
            }
        },
        usingCustomIcon () {
            return this.config.icon === 'custom'
        },
        showCaret () {
            return this.config.icon === 'caret'
        },
        showPlus () {
            return this.config.icon === 'plus-minus' && !this.isOpen
        },
        showMinus () {
            return this.config.icon === 'plus-minus' && this.isOpen
        },
        slideStyle () {
            const c = this.config.slide
            return {
                'transition': `all ${c.duration} ${c.timerFunc}`,
            }
        },
        iconStyle () {
            const c = this.config.animation
            if (c.none === true) {
                return {}
            }
            return {
                'transition': `all ${c.duration} ${c.timerFunc}`,
            }
        },
    },
}
</script>

<style scoped>
.accordion-body {
    height: 0px;
    overflow: hidden;
}
.caret-down {
    transform: rotate(180deg);
}
.header-icon {
    width: 100%;
}
</style>