import BulmaAccordion from './components/BulmaAccordion.vue'
import BulmaAccordionItem from './components/BulmaAccordionItem.vue'

// Declare install function executed by Vue.use()
export function install(Vue) {
    if (install.installed) return
    install.installed = true
    Vue.component('bulma-accordion', BulmaAccordion)
    Vue.component('bulma-accordion-item', BulmaAccordionItem)
}

export { BulmaAccordion, BulmaAccordionItem }

const plugin = {
    install
}

let GlobalVue = null
if (typeof window !== 'undefined') {
    GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue
}
if (GlobalVue) {
    GlobalVue.use(plugin)
}
export default plugin
