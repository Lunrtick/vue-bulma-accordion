<template>
    <div class="accordion">
        <slot></slot>
    </div>
</template>

<script>
import { AccordionItemController } from "../AccordionItemController";
import config from "../SharedConfig";
const aic = new AccordionItemController(config);
export default {
    name: "bulma-accordion",
    provide: {
        AccordionItemController: aic,
        AccordionItemConfig: config
    },
    props: {
        initialOpenItem: {
            required: false,
            type: [Number, String],
            default: null
        },
        initialOpenItems: {
            required: false,
            type: Array,
            default: null,
            validator: (items) =>
                Array.isArray(items) &&
                !items.some((n) => typeof n !== "number")
        },
        caretAnimation: {
            required: false,
            type: Object,
            default: () => ({
                duration: "450ms",
                timerFunc: "ease 0s"
            }),
            validator: (config) => {
                const isValid =
                    (typeof config.duration === "string" &&
                        typeof config.timerFunc === "string") ||
                    config.none === true;
                return isValid;
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
            default: "caret",
            validator: (choice) => {
                const isValid =
                    choice === "caret" ||
                    choice === "plus-minus" ||
                    choice === "custom";
                return isValid;
            }
        },
        slide: {
            required: false,
            type: Object,
            default: () => ({
                duration: "700ms",
                timerFunc: "ease 0s"
            }),
            validator: (config) => {
                const isValid =
                    typeof config.duration === "string" &&
                    typeof config.timerFunc === "string";
                return isValid;
            }
        }
    },
    beforeMount() {
        config.caretAnimation = this.caretAnimation;
        config.dropdown = this.dropdown;
        config.icon = this.icon;
        config.slide = this.slide;
        aic.setInitiallyOpen(this.initialOpenItem || this.initialOpenItems);
    },
    data() {
        return {
            AccordionItemController: aic
        };
    },
    methods: {}
};
</script>

<style>
</style>
