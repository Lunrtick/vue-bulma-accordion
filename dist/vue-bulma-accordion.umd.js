(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = global || self, factory(global.BulmaAccordion = {}, global.Vue));
}(this, function (exports, Vue) { 'use strict';

    Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

    var EventBus = new Vue();

    //
    var script = {
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
                validator: function (items) { return Array.isArray(items) && !items.some(function (n) { return typeof n !== "number"; }); }
            },
            caretAnimation: {
                required: false,
                type: Object,
                default: function () { return ({
                    duration: "450ms",
                    timerFunc: "ease"
                }); },
                validator: function (config) {
                    var isValid =
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
                validator: function (choice) {
                    var isValid =
                        choice === "caret" ||
                        choice === "plus-minus" ||
                        choice === "custom";
                    return isValid;
                }
            },
            slide: {
                required: false,
                type: Object,
                default: function () { return ({
                    duration: "700ms",
                    timerFunc: "ease"
                }); },
                validator: function (config) {
                    var isValid =
                        typeof config.duration === "string" &&
                        typeof config.timerFunc === "string";
                    return isValid;
                }
            }
        },
        mounted: function mounted() {
            var this$1 = this;

            EventBus.$on("click", this.handleChildClicked);
            this.$nextTick(function () {
                this$1.$children.forEach(function (child, idx) {
                    var id = String(idx);
                    child.setUniqueId(id);
                    this$1.children_toggle_status[id] = false;
                });
                this$1.openInitialItems(this$1.$children.length);
            });
        },
        data: function data() {
            return {
                children_toggle_status: {}
            };
        },
        methods: {
            handleChildClicked: function handleChildClicked(child_id) {
                if (!this.dropdown) {
                    for (var id in this.children_toggle_status) {
                        if (this.children_toggle_status[id] && id !== child_id) {
                            EventBus.$emit("toggle", id);
                            this.children_toggle_status[id] = false;
                        }
                    }
                }
                this.children_toggle_status[child_id] = !this
                    .children_toggle_status[child_id];
                EventBus.$emit("toggle", child_id);
            },
            openInitialItems: function openInitialItems(items_length) {
                var this$1 = this;

                var i = this.initialOpenItem;
                var is = this.initialOpenItems;
                if (i !== null) {
                    this.openInitialItem(i, items_length);
                } else if (is !== null) {
                    is.forEach(function (item, idx) {
                        this$1.openInitialItem(item, items_length);
                    });
                }
            },
            openInitialItem: function openInitialItem(item, items_length) {
                var num_item =
                    typeof item === "number" ? item : parseInt(item, 10);
                if (num_item > 0 && num_item <= items_length) {
                    this.handleChildClicked(String(num_item - 1));
                } else {
                    throw new Error(
                        ("There are only " + items_length + " AccordionItems, " + num_item + " is out of bounds. [indexing from 1]")
                    );
                }
            }
        }
    };

    function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
    /* server only */
    , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
      } // Vue.extend constructor export interop.


      var options = typeof script === 'function' ? script.options : script; // render functions

      if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true; // functional template

        if (isFunctionalTemplate) {
          options.functional = true;
        }
      } // scopedId


      if (scopeId) {
        options._scopeId = scopeId;
      }

      var hook;

      if (moduleIdentifier) {
        // server build
        hook = function hook(context) {
          // 2.3 injection
          context = context || // cached call
          this.$vnode && this.$vnode.ssrContext || // stateful
          this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
          // 2.2 with runInNewContext: true

          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          } // inject component styles


          if (style) {
            style.call(this, createInjectorSSR(context));
          } // register component module identifier for async chunk inference


          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        }; // used by ssr in case component is cached and beforeCreate
        // never gets called


        options._ssrRegister = hook;
      } else if (style) {
        hook = shadowMode ? function () {
          style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
        } : function (context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook) {
        if (options.functional) {
          // register for functional component in vue file
          var originalRender = options.render;

          options.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          // inject component registration as beforeCreate hook
          var existing = options.beforeCreate;
          options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }

      return script;
    }

    var normalizeComponent_1 = normalizeComponent;

    /* script */
    var __vue_script__ = script;
    // For security concerns, we use only base name in production mode. See https://github.com/vuejs/rollup-plugin-vue/issues/258
    script.__file = "BulmaAccordion.vue";

    /* template */
    var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"accordion"},[_vm._t("default")],2)};
    var __vue_staticRenderFns__ = [];

      /* style */
      var __vue_inject_styles__ = undefined;
      /* scoped */
      var __vue_scope_id__ = undefined;
      /* module identifier */
      var __vue_module_identifier__ = undefined;
      /* functional template */
      var __vue_is_functional_template__ = false;
      /* style inject */
      
      /* style inject SSR */
      

      
      var BulmaAccordion = normalizeComponent_1(
        { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
        __vue_inject_styles__,
        __vue_script__,
        __vue_scope_id__,
        __vue_is_functional_template__,
        __vue_module_identifier__,
        undefined,
        undefined
      );

    //
    //
    //
    //
    //
    //
    //

    var script$1 = {
        props: {
            minus: {
                required: true,
                type: Boolean
            }
        },
        computed: {
            verticalClasses: function verticalClasses() {
                return {
                    vertical: true,
                    "vertical-rotated": this.minus
                };
            }
        }
    };

    var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    function createInjector(context) {
      return function (id, style) {
        return addStyle(id, style);
      };
    }
    var HEAD = document.head || document.getElementsByTagName('head')[0];
    var styles = {};

    function addStyle(id, css) {
      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = {
        ids: new Set(),
        styles: []
      });

      if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;

        if (css.map) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

          code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
        }

        if (!style.element) {
          style.element = document.createElement('style');
          style.element.type = 'text/css';
          if (css.media) { style.element.setAttribute('media', css.media); }
          HEAD.appendChild(style.element);
        }

        if ('styleSheet' in style.element) {
          style.styles.push(code);
          style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
        } else {
          var index = style.ids.size - 1;
          var textNode = document.createTextNode(code);
          var nodes = style.element.childNodes;
          if (nodes[index]) { style.element.removeChild(nodes[index]); }
          if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }else { style.element.appendChild(textNode); }
        }
      }
    }

    var browser = createInjector;

    /* script */
    var __vue_script__$1 = script$1;
    // For security concerns, we use only base name in production mode. See https://github.com/vuejs/rollup-plugin-vue/issues/258
    script$1.__file = "PlusMinus.vue";

    /* template */
    var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"plus-minus"},[_c('div',{staticClass:"horizontal"}),_vm._v(" "),_c('div',{class:_vm.verticalClasses})])};
    var __vue_staticRenderFns__$1 = [];

      /* style */
      var __vue_inject_styles__$1 = function (inject) {
        if (!inject) { return }
        inject("data-v-6b0c21ae_0", { source: ".horizontal[data-v-6b0c21ae],.vertical[data-v-6b0c21ae]{position:absolute;border-radius:3px;background:#646464;transform:rotate(0);transition:.4s all ease-out}.horizontal[data-v-6b0c21ae]{top:45%;left:10%;right:10%;height:10%}.vertical[data-v-6b0c21ae]{top:10%;bottom:10%;left:45%;width:10%}.vertical-rotated[data-v-6b0c21ae]{transform:rotate(90deg)}.plus-minus[data-v-6b0c21ae]{position:relative;display:block;width:100%;height:100%}", map: undefined, media: undefined });

      };
      /* scoped */
      var __vue_scope_id__$1 = "data-v-6b0c21ae";
      /* module identifier */
      var __vue_module_identifier__$1 = undefined;
      /* functional template */
      var __vue_is_functional_template__$1 = false;
      /* style inject SSR */
      

      
      var PlusMinus = normalizeComponent_1(
        { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
        __vue_inject_styles__$1,
        __vue_script__$1,
        __vue_scope_id__$1,
        __vue_is_functional_template__$1,
        __vue_module_identifier__$1,
        browser,
        undefined
      );

    // got this from https://stackoverflow.com/a/9090128, tidied it up somewhat
    function transitionEndEventName(el) {
        var transitions = {
            transition: 'transitionend',
            OTransition: 'otransitionend', // oTransitionEnd in very old Opera
            MozTransition: 'transitionend',
            WebkitTransition: 'webkitTransitionEnd'
        };
        for (var t in transitions) {
            if (transitions.hasOwnProperty(t) && el.style[t] !== undefined) {
                return transitions[t];
            }
        }
        throw new Error('TransitionEnd event is not supported in this browser');
    }

    //
    var script$2 = {
        name: "bulma-accordion-item",
        components: {
            PlusMinus: PlusMinus
        },
        data: function data() {
            return {
                isOpen: false,
                autoHeightInterval: null,
                showCardContent: false,
                uniqueId: null
            };
        },
        mounted: function mounted() {
            var this$1 = this;

            EventBus.$on("toggle", this.handleToggleRequest);

            var accordionBody = this.$refs.body;
            var eName = transitionEndEventName(accordionBody);
            accordionBody.addEventListener(eName, function (e) {
                if (accordionBody.style.height !== "0px") {
                    this$1.autoHeightStart(accordionBody);
                } else {
                    this$1.autoHeightStop();
                    this$1.showCardContent = false;
                }
            });
        },
        destroyed: function destroyed() {
            EventBus.$off("toggle");
        },
        watch: {
            isOpen: function isOpen(isOpen$1) {
                this.doTheSlide();
            }
        },
        computed: {
            config: function config() {
                var ref = this.$parent;
                var animation = ref.caretAnimation; if ( animation === void 0 ) animation = {
                        duration: "450ms",
                        timerFunc: "ease"
                    };
                var dropdown = ref.dropdown; if ( dropdown === void 0 ) dropdown = false;
                var icon = ref.icon; if ( icon === void 0 ) icon = "caret";
                var slide = ref.slide; if ( slide === void 0 ) slide = {
                        duration: "700ms",
                        timerFunc: "ease"
                    };
                return {
                    animation: animation,
                    dropdown: dropdown,
                    icon: icon,
                    slide: slide
                };
            },
            dropdownIconClasses: function dropdownIconClasses() {
                return {
                    "header-icon": true,
                    "caret-down": !this.isOpen
                };
            },
            card_classes: function card_classes() {
                return {
                    card: true,
                    "card-active": this.isOpen
                };
            },
            card_content_classes: function card_content_classes() {
                return {
                    "card-content": true,
                    "is-hidden": !this.showCardContent
                };
            },
            footerClasses: function footerClasses() {
                return {
                    "card-footer": true,
                    "is-hidden": !this.$slots.footer
                };
            },
            usingCustomIcon: function usingCustomIcon() {
                return this.config.icon === "custom";
            },
            showCaret: function showCaret() {
                return this.config.icon === "caret";
            },
            showPlus: function showPlus() {
                return this.config.icon === "plus-minus" && !this.isOpen;
            },
            showMinus: function showMinus() {
                return this.config.icon === "plus-minus" && this.isOpen;
            },
            slideStyle: function slideStyle() {
                var c = this.config.slide;
                return {
                    transition: ("all " + (c.duration) + " " + (c.timerFunc))
                };
            },
            iconStyle: function iconStyle() {
                var c = this.config.animation;
                if (c.none === true) {
                    return {};
                }
                return {
                    transition: ("all " + (c.duration) + " " + (c.timerFunc))
                };
            }
        },
        methods: {
            handleToggleRequest: function handleToggleRequest(toggleId) {
                if (toggleId === this.uniqueId) {
                    this.toggleCollapsed();
                }
            },
            setUniqueId: function setUniqueId(id) {
                this.uniqueId = id;
            },
            notifyOfClick: function notifyOfClick() {
                if (this.uniqueId) {
                    EventBus.$emit("click", this.uniqueId);
                }
            },
            collapse: function collapse() {
                this.isOpen = false;
            },
            toggleCollapsed: function toggleCollapsed() {
                this.isOpen = !this.isOpen;
            },
            doTheSlide: function doTheSlide() {
                var this$1 = this;

                var el = this.$refs.body;
                if (this.isOpen === true) {
                    this.showCardContent = true;
                    this.$nextTick().then(function () {
                        this$1.adjustHeight(el, el.scrollHeight);
                    });
                } else {
                    this.slideUp(el);
                }
            },
            adjustHeight: function adjustHeight(el, newHeight) {
                el.style.height = newHeight + "px";
            },
            slideUp: function slideUp(el) {
                if (el.style.height === "auto") {
                    el.style.height = (el.scrollHeight) + "px";
                }
                el.style.height = "0px";
            },
            autoHeightStart: function autoHeightStart(el) {
                var this$1 = this;

                // clear running interval
                if (this.autoHeightInterval) { this.autoHeightStop(); }
                this.autoHeightInterval = setInterval(function () {
                    // set height for comparison to scrollHeight
                    try {
                        var actualHeight =
                            this$1.$refs.bodyContent.scrollHeight +
                            this$1.$refs.bodyFooter.scrollHeight +
                            1;
                        if (
                            el.style.height !== "0px" &&
                            actualHeight !== el.style.height &&
                            this$1.isOpen
                        ) {
                            this$1.adjustHeight(el, actualHeight);
                        }
                    } catch (e) {
                        this$1.autoHeightStop();
                    }
                }, 100);
            },
            autoHeightStop: function autoHeightStop() {
                clearInterval(this.autoHeightInterval);
                this.autoHeightInterval = null;
            }
        }
    };

    /* script */
    var __vue_script__$2 = script$2;
    // For security concerns, we use only base name in production mode. See https://github.com/vuejs/rollup-plugin-vue/issues/258
    script$2.__file = "BulmaAccordionItem.vue";

    /* template */
    var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.card_classes},[_c('div',{staticClass:"card-header",on:{"click":_vm.notifyOfClick}},[_c('p',{staticClass:"card-header-title"},[_vm._t("title")],2),_vm._v(" "),_c('p',{staticClass:"card-header-icon"},[(!_vm.usingCustomIcon)?_c('span',{staticClass:"icon"},[(_vm.showCaret)?_c('svg',{class:_vm.dropdownIconClasses,style:(_vm.iconStyle),attrs:{"version":"1.1","viewBox":"0 0 129 129","enable-background":"new 0 0 129 129"}},[_c('g',[_c('path',{attrs:{"d":"m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z"}})])]):_vm._e(),_vm._v(" "),(_vm.showPlus || _vm.showMinus)?_c('PlusMinus',{attrs:{"minus":_vm.showMinus}}):_vm._e()],1):_c('span',{staticClass:"icon"},[_vm._t("icon"),_vm._v(" "),(_vm.isOpen)?_vm._t("icon-open"):_vm._t("icon-closed")],2)])]),_vm._v(" "),_c('div',{ref:"body",staticClass:"accordion-body",style:(_vm.slideStyle)},[_c('div',{ref:"bodyContent",class:_vm.card_content_classes},[_vm._t("content")],2),_vm._v(" "),_c('div',{ref:"bodyFooter",class:_vm.footerClasses},[_vm._t("footer")],2)])])};
    var __vue_staticRenderFns__$2 = [];

      /* style */
      var __vue_inject_styles__$2 = function (inject) {
        if (!inject) { return }
        inject("data-v-118bda53_0", { source: ".accordion-body[data-v-118bda53]{height:0;overflow:hidden}.caret-down[data-v-118bda53]{transform:rotate(180deg)}.header-icon[data-v-118bda53]{width:100%}", map: undefined, media: undefined });

      };
      /* scoped */
      var __vue_scope_id__$2 = "data-v-118bda53";
      /* module identifier */
      var __vue_module_identifier__$2 = undefined;
      /* functional template */
      var __vue_is_functional_template__$2 = false;
      /* style inject SSR */
      

      
      var BulmaAccordionItem = normalizeComponent_1(
        { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
        __vue_inject_styles__$2,
        __vue_script__$2,
        __vue_scope_id__$2,
        __vue_is_functional_template__$2,
        __vue_module_identifier__$2,
        browser,
        undefined
      );



    var components = /*#__PURE__*/Object.freeze({
        BulmaAccordion: BulmaAccordion,
        BulmaAccordionItem: BulmaAccordionItem
    });

    // Declare install function executed by Vue.use()
    function install(Vue$$1) {
        if (install.installed) { return; }
        install.installed = true;
        Object.keys(components).forEach(function (componentName) {
            Vue$$1.component(componentName, components[componentName]);
        });
    }

    var plugin = {
        install: install
    };

    var GlobalVue = null;
    if (typeof window !== 'undefined') {
        GlobalVue = window.Vue;
    } else if (typeof global !== 'undefined') {
        GlobalVue = global.Vue;
    }
    if (GlobalVue) {
        GlobalVue.use(plugin);
    }

    var BulmaAccordion$1 = BulmaAccordion;
    var BulmaAccordionItem$1 = BulmaAccordionItem;

    exports.install = install;
    exports.BulmaAccordion = BulmaAccordion$1;
    exports.BulmaAccordionItem = BulmaAccordionItem$1;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
