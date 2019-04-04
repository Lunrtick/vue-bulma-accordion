<template>
  <div class="accordion">
    <slot></slot>
  </div>
</template>

<script>
export default {
    name: "bulma-accordion",
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
                timerFunc: "ease"
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
                timerFunc: "ease"
            }),
            validator: (config) => {
                const isValid =
                    typeof config.duration === "string" &&
                    typeof config.timerFunc === "string";
                return isValid;
            }
        }
    },
    mounted() {
        this.$on("child-registered", (child) => {
            const id = this.getNextId();
            child.setUniqueId(id);
            this.children_toggle_status[id] = false;
        });
        this.$on("child-clicked", this.handleChildClicked);
        this.$on("child-removed", (child_id) => {
            delete this.children_toggle_status[child_id];
        });
        this.$nextTick(() => {
            this.openInitialItems(this.$children.length);
        });
    },
    data() {
        return {
            next_id: 1,
            children_toggle_status: {}
        };
    },
    methods: {
        getNextId() {
            const v = this.next_id.toString(10);
            this.next_id += 1;
            return v;
        },
        handleChildClicked(child_id) {
            if (!this.dropdown) {
                for (const id in this.children_toggle_status) {
                    if (this.children_toggle_status[id] && id !== child_id) {
                        this.$emit("toggle-child", id);
                        this.children_toggle_status[id] = false;
                    }
                }
            }
            this.children_toggle_status[child_id] = !this
                .children_toggle_status[child_id];
            this.$emit("toggle-child", child_id);
        },
        openInitialItems(items_length) {
            const i = this.initialOpenItem;
            const is = this.initialOpenItems;
            if (i !== null) {
                this.openInitialItem(i, items_length);
            } else if (is !== null) {
                is.forEach((item, idx) => {
                    this.openInitialItem(item, items_length);
                });
            }
        },
        openInitialItem(item, items_length) {
            const num_item =
                typeof item === "number" ? item : parseInt(item, 10);
            if (num_item > 0 && num_item <= items_length) {
                this.handleChildClicked(String(num_item));
            } else {
                throw new Error(
                    `There are only ${items_length} AccordionItems, ${num_item} is out of bounds. [indexing from 1]`
                );
            }
        }
    }
};
</script>

<style>
</style>
