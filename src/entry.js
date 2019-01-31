import * as components from './components';

// Declare install function executed by Vue.use()
export function install(Vue) {
    if (install.installed) return;
    install.installed = true;
    Object.keys(components).forEach(componentName => {
        Vue.component(componentName, components[componentName]);
    });
}

const plugin = {
    install
};

let GlobalVue = null;
if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
}
if (GlobalVue) {
    GlobalVue.use(plugin);
}

export * from './components';

export const BulmaAccordion = components.BulmaAccordion
export const BulmaAccordionItem = components.BulmaAccordionItem
