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
            <div :class="card_content_classes" ref="bodyContent">
                <slot name="content"></slot>
            </div>
            <div :class="footerClasses" ref="bodyFooter">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>

<script>
import Caret from '../icons/caret.svg'
import PlusMinus from './PlusMinus.vue'

// got this from https://stackoverflow.com/a/9090128, tidied it up somewhat
function transitionEndEventName(el) {
    const transitions = {
        transition: 'transitionend',
        OTransition: 'otransitionend', // oTransitionEnd in very old Opera
        MozTransition: 'transitionend',
        WebkitTransition: 'webkitTransitionEnd'
    }
    for (const t in transitions) {
        if (transitions.hasOwnProperty(t) && el.style[t] !== undefined) {
            return transitions[t]
        }
    }
    throw new Error('TransitionEnd event is not supported in this browser')
}

export default {
    name: 'bulma-accordion-item',
    components: {
        Caret,
        PlusMinus
    },
    data() {
        return {
            isOpen: false,
            autoHeightInterval: null,
            showCardContent: false
        }
    },
    mounted() {
        this.$parent.$on('toggle', this.collapse)
        const accordionBody = this.$refs.body
        const eName = transitionEndEventName(accordionBody)
        accordionBody.addEventListener(eName, e => {
            if (accordionBody.style.height !== '0px') {
                this.autoHeightStart(accordionBody)
            } else {
                this.autoHeightStop()
                this.showCardContent = false
            }
        })
    },
    destroyed() {
        this.$parent.$off('toggle')
    },
    watch: {
        isOpen(isOpen) {
            this.doTheSlide()
        }
    },
    computed: {
        config() {
            const {
                caretAnimation: animation = {
                    duration: '450ms',
                    timerFunc: 'ease'
                },
                dropdown = false,
                icon = 'caret',
                slide = {
                    duration: '700ms',
                    timerFunc: 'ease'
                }
            } = this.$parent
            return {
                animation,
                dropdown,
                icon,
                slide
            }
        },
        dropdownIconClasses() {
            return {
                'header-icon': true,
                'caret-down': !this.isOpen
            }
        },
        card_classes() {
            return {
                card: true,
                'card-active': this.isOpen
            }
        },
        card_content_classes() {
            return {
                'card-content': true,
                'is-hidden': !this.showCardContent
            }
        },
        footerClasses() {
            return {
                'card-footer': true,
                'is-hidden': !this.$slots.footer
            }
        },
        usingCustomIcon() {
            return this.config.icon === 'custom'
        },
        showCaret() {
            return this.config.icon === 'caret'
        },
        showPlus() {
            return this.config.icon === 'plus-minus' && !this.isOpen
        },
        showMinus() {
            return this.config.icon === 'plus-minus' && this.isOpen
        },
        slideStyle() {
            const c = this.config.slide
            return {
                transition: `all ${c.duration} ${c.timerFunc}`
            }
        },
        iconStyle() {
            const c = this.config.animation
            if (c.none === true) {
                return {}
            }
            return {
                transition: `all ${c.duration} ${c.timerFunc}`
            }
        }
    },
    methods: {
        collapse() {
            this.isOpen = false
        },
        toggleCollapsed() {
            if (!this.isOpen && !this.config.dropdown) {
                this.$parent.$emit('toggle')
            }
            this.isOpen = !this.isOpen
        },
        doTheSlide() {
            const el = this.$refs.body
            if (this.isOpen === true) {
                this.showCardContent = true
                this.$nextTick().then(() => {
                    this.adjustHeight(el, el.scrollHeight)
                })
            } else {
                this.slideUp(el)
            }
        },
        adjustHeight(el, newHeight) {
            el.style.height = `${newHeight}px`
        },
        slideUp(el) {
            if (el.style.height === 'auto') {
                el.style.height = `${el.scrollHeight}px`
            }
            el.style.height = '0px'
        },
        autoHeightStart(el) {
            // clear running interval
            if (this.autoHeightInterval) this.autoHeightStop()
            this.autoHeightInterval = setInterval(() => {
                // set height for comparison to scrollHeight
                try {
                    const actualHeight =
                        this.$refs.bodyContent.scrollHeight +
                        this.$refs.bodyFooter.scrollHeight +
                        1
                    if (
                        el.style.height !== '0px' &&
                        actualHeight !== el.style.height &&
                        this.isOpen
                    ) {
                        this.adjustHeight(el, actualHeight)
                    }
                } catch (e) {
                    this.autoHeightStop()
                }
            }, 100)
        },
        autoHeightStop() {
            clearInterval(this.autoHeightInterval)
            this.autoHeightInterval = null
        }
    }
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
