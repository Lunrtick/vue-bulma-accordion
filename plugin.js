import BulmaAccordion from './BulmaAccordion'
import BulmaAccordionItem from './BulmaAccordionItem'

module.exports = {
    install: function (Vue, options) {
        Vue.component('bulma-accordion', BulmaAccordion);
        Vue.component('bulma-accordion-item', BulmaAccordionItem);
    }
};