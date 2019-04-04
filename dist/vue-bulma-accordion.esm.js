//
//
//
//
//
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
            validator: function (items) { return Array.isArray(items) &&
                !items.some(function (n) { return typeof n !== "number"; }); }
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

        this.$on("child-registered", function (child) {
            var id = this$1.getNextId();
            child.setUniqueId(id);
            this$1.children_toggle_status[id] = false;
        });
        this.$on("child-clicked", this.handleChildClicked);
        this.$on("child-removed", function (child_id) {
            delete this$1.children_toggle_status[child_id];
        });
        this.$nextTick(function () {
            this$1.openInitialItems(this$1.$children.length);
        });
    },
    data: function data() {
        return {
            next_id: 1,
            children_toggle_status: {}
        };
    },
    methods: {
        getNextId: function getNextId() {
            var v = this.next_id.toString(10);
            this.next_id += 1;
            return v;
        },
        handleChildClicked: function handleChildClicked(child_id) {
            if (!this.dropdown) {
                for (var id in this.children_toggle_status) {
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
                this.handleChildClicked(String(num_item));
            } else {
                throw new Error(
                    ("There are only " + items_length + " AccordionItems, " + num_item + " is out of bounds. [indexing from 1]")
                );
            }
        }
    }
};

/* script */
            var __vue_script__ = script;
            
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
  /* component normalizer */
  function __vue_normalize__(
    template, style, script$$1,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    var component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "BulmaAccordion.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) { component.functional = true; }
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var BulmaAccordion = __vue_normalize__(
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

/* script */
            var __vue_script__$1 = script$1;
            
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
  /* component normalizer */
  function __vue_normalize__$1(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    var component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "PlusMinus.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) { component.functional = true; }
    }

    component._scopeId = scope;

    {
      var hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          var originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          var existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
    var isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) { return } // SSR styles are present.

      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        var code = css.source;
        var index = style.ids.length;

        style.ids.push(id);

        if (css.map) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
          // http://stackoverflow.com/a/26603875
          code +=
            '\n/*# sourceMappingURL=data:application/json;base64,' +
            btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
            ' */';
        }

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          var el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) { el.setAttribute('media', css.media); }
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          var textNode = document.createTextNode(code);
          var nodes = style.element.childNodes;
          if (nodes[index]) { style.element.removeChild(nodes[index]); }
          if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }
          else { style.element.appendChild(textNode); }
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var PlusMinus = __vue_normalize__$1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    __vue_create_injector__,
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
            return transitions[t]
        }
    }
    throw new Error('TransitionEnd event is not supported in this browser')
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

        this.$nextTick(function () {
            this$1.$parent.$emit("child-registered", this$1);
            this$1.$parent.$on("toggle-child", this$1.handleToggleRequest);

            var accordionBody = this$1.$refs.body;
            var eName = transitionEndEventName(accordionBody);
            accordionBody.addEventListener(eName, function (e) {
                if (accordionBody.style.height !== "0px") {
                    this$1.autoHeightStart(accordionBody);
                } else {
                    this$1.autoHeightStop();
                    this$1.showCardContent = false;
                }
            });
        });
    },
    beforeDestroy: function beforeDestroy() {
        this.$parent.$emit("child-removed", this.uniqueId);
    },
    watch: {
        isOpen: function isOpen(newStatus) {
            if (newStatus) {
                this.$emit("open");
            } else {
                this.$emit("close");
            }
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
                this.$parent.$emit("child-clicked", this.uniqueId);
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
            
/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.card_classes},[_c('div',{staticClass:"card-header",on:{"click":_vm.notifyOfClick}},[_c('p',{staticClass:"card-header-title"},[_vm._t("title")],2),_vm._v(" "),_c('p',{staticClass:"card-header-icon"},[(!_vm.usingCustomIcon)?_c('span',{staticClass:"icon"},[(_vm.showCaret)?_c('svg',{class:_vm.dropdownIconClasses,style:(_vm.iconStyle),attrs:{"version":"1.1","viewBox":"0 0 129 129","enable-background":"new 0 0 129 129"}},[_c('g',[_c('path',{attrs:{"d":"m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z"}})])]):_vm._e(),_vm._v(" "),(_vm.showPlus || _vm.showMinus)?_c('PlusMinus',{attrs:{"minus":_vm.showMinus}}):_vm._e()],1):_c('span',{staticClass:"icon"},[_vm._t("icon"),_vm._v(" "),(_vm.isOpen)?_vm._t("icon-open"):_vm._t("icon-closed")],2)])]),_vm._v(" "),_c('div',{ref:"body",staticClass:"accordion-body",style:(_vm.slideStyle)},[_c('div',{ref:"bodyContent",class:_vm.card_content_classes},[_vm._t("content")],2),_vm._v(" "),_c('div',{ref:"bodyFooter",class:_vm.footerClasses},[_vm._t("footer")],2)])])};
var __vue_staticRenderFns__$2 = [];

  /* style */
  var __vue_inject_styles__$2 = function (inject) {
    if (!inject) { return }
    inject("data-v-bc7d9a68_0", { source: ".accordion-body[data-v-bc7d9a68]{height:0;overflow:hidden}.caret-down[data-v-bc7d9a68]{transform:rotate(180deg)}.header-icon[data-v-bc7d9a68]{width:100%}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$2 = "data-v-bc7d9a68";
  /* module identifier */
  var __vue_module_identifier__$2 = undefined;
  /* functional template */
  var __vue_is_functional_template__$2 = false;
  /* component normalizer */
  function __vue_normalize__$2(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    var component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "BulmaAccordionItem.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) { component.functional = true; }
    }

    component._scopeId = scope;

    {
      var hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          var originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          var existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__$1() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styles = __vue_create_injector__$1.styles || (__vue_create_injector__$1.styles = {});
    var isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) { return } // SSR styles are present.

      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        var code = css.source;
        var index = style.ids.length;

        style.ids.push(id);

        if (css.map) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
          // http://stackoverflow.com/a/26603875
          code +=
            '\n/*# sourceMappingURL=data:application/json;base64,' +
            btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
            ' */';
        }

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          var el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) { el.setAttribute('media', css.media); }
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          var textNode = document.createTextNode(code);
          var nodes = style.element.childNodes;
          if (nodes[index]) { style.element.removeChild(nodes[index]); }
          if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }
          else { style.element.appendChild(textNode); }
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var BulmaAccordionItem = __vue_normalize__$2(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    __vue_create_injector__$1,
    undefined
  );



var components = /*#__PURE__*/Object.freeze({
    BulmaAccordion: BulmaAccordion,
    BulmaAccordionItem: BulmaAccordionItem
});

// Declare install function executed by Vue.use()
function install(Vue) {
    if (install.installed) { return }
    install.installed = true;
    Object.keys(components).forEach(function (componentName) {
        Vue.component(componentName, components[componentName]);
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

export { install, BulmaAccordion$1 as BulmaAccordion, BulmaAccordionItem$1 as BulmaAccordionItem };
