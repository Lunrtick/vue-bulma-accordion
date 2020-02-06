<template>
    <div :class="card_classes">
        <div class="card-header" @click="handleClick">
            <p class="card-header-title">
                <slot name="title"></slot>
            </p>
            <p class="card-header-icon">
                <span v-if="!usingCustomIcon" class="icon">
                    <span v-if="showCaret" :class="dropdownIconClasses" :style="iconStyle">
                        <svg
                            version="1.1"
                            viewBox="0 0 129 129"
                            enable-background="new 0 0 129 129"
                        >
                            <g>
                                <path
                                    d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z"
                                />
                            </g>
                        </svg>
                    </span>
                    <PlusMinus v-if="showPlus || showMinus" :minus="showMinus" />
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
import PlusMinus from "./PlusMinus.vue";
import { transitionEndEventName } from "../utils/index.js";
import config from "../SharedConfig";
export default {
    name: "bulma-accordion-item",
    components: {
        PlusMinus
    },
    inject: ["AccordionItemController", "AccordionItemConfig"],
    mounted() {
        this.uniqueId = this.AccordionItemController.register();
        this.$nextTick(() => {
            const accordionBody = this.$refs.body;
            const eName = transitionEndEventName(accordionBody);
            accordionBody.addEventListener(eName, (e) => {
                if (accordionBody.style.height !== "0px") {
                    this.autoHeightStart(accordionBody);
                } else {
                    this.autoHeightStop();
                    this.showCardContent = false;
                }
            });
        });
    },
    beforeDestroy() {
        this.autoHeightStop();
    },
    data() {
        return {
            autoHeightInterval: null,
            showCardContent: false,
            uniqueId: null
        };
    },
    watch: {
        isOpen(newStatus) {
            if (newStatus) {
                this.$emit("open");
            } else {
                this.$emit("close");
            }
            this.doTheSlide();
        }
    },
    computed: {
        config() {
            return this.AccordionItemConfig || config;
        },
        dropdownIconClasses() {
            return {
                "header-icon": true,
                "caret-down": this.isOpen
            };
        },
        card_classes() {
            return {
                card: true,
                "card-active": this.isOpen
            };
        },
        card_content_classes() {
            return {
                "card-content": true,
                "is-hidden": !this.showCardContent
            };
        },
        footerClasses() {
            return {
                "card-footer": true,
                "is-hidden": !this.$slots.footer
            };
        },
        usingCustomIcon() {
            return this.config.icon === "custom";
        },
        showCaret() {
            return this.config.icon === "caret";
        },
        showPlus() {
            return this.config.icon === "plus-minus" && !this.isOpen;
        },
        showMinus() {
            return this.config.icon === "plus-minus" && this.isOpen;
        },
        slideStyle() {
            const c = this.config.slide;
            return {
                transition: `all ${c.duration} ${c.timerFunc}`
            };
        },
        iconStyle() {
            const c = this.config.caretAnimation;
            if (c.none === true) {
                return {};
            }
            return {
                transition: `all ${c.duration} ${c.timerFunc}`
            };
        },
        isOpen() {
            return this.AccordionItemController.isOpen(this.uniqueId);
        }
    },
    methods: {
        setUniqueId(id) {
            this.uniqueId = id;
        },
        handleClick() {
            if (this.uniqueId) {
                this.AccordionItemController.toggleOpen(this.uniqueId);
            }
        },
        collapse() {
            this.AccordionItemController.setOpen(this.uniqueId, false);
        },
        toggleCollapsed() {
            this.AccordionItemController.toggleOpen(this.uniqueId);
        },
        doTheSlide() {
            const el = this.$refs.body;
            if (this.isOpen === true) {
                this.showCardContent = true;
                this.$nextTick().then(() => {
                    this.adjustHeight(el, el.scrollHeight);
                });
            } else {
                this.slideUp(el);
            }
        },
        adjustHeight(el, newHeight) {
            el.style.height = `${newHeight}px`;
        },
        slideUp(el) {
            if (el.style.height === "auto") {
                el.style.height = `${el.scrollHeight}px`;
            }
            el.style.height = "0px";
        },
        autoHeightStart(el) {
            // clear running interval
            if (this.autoHeightInterval) this.autoHeightStop();
            this.autoHeightInterval = setInterval(() => {
                // set height for comparison to scrollHeight
                try {
                    const actualHeight =
                        this.$refs.bodyContent.scrollHeight +
                        this.$refs.bodyFooter.scrollHeight +
                        1;
                    if (
                        el.style.height !== "0px" &&
                        actualHeight !== el.style.height &&
                        this.isOpen
                    ) {
                        this.adjustHeight(el, actualHeight);
                    }
                } catch (e) {
                    this.autoHeightStop();
                }
            }, 100);
        },
        autoHeightStop() {
            clearInterval(this.autoHeightInterval);
            this.autoHeightInterval = null;
        }
    }
};
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
