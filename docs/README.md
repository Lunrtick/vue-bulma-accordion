# Vue Bulma Accordion

[![npm](https://img.shields.io/npm/v/vue-bulma-accordion.svg) ![npm](https://img.shields.io/npm/dm/vue-bulma-accordion.svg) ![npm](https://img.shields.io/npm/dt/vue-bulma-accordion.svg)](https://www.npmjs.com/package/vue-bulma-accordion)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

A simple, easily configurable accordion or collapsible for Vue, styled with Bulma.

<iframe height='450' scrolling='no' title='Vue Bulma Accordion - Basic' src='//codepen.io/lunrtick/embed/jXdJWd/?height=265&theme-id=0&default-tab=result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/lunrtick/pen/jXdJWd/'>Vue Bulma Accordion - Basic</a> by Gabriel Soicher (<a href='https://codepen.io/lunrtick'>@lunrtick</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## New in 0.4.0

-   Bulma is now a peer dependency - you need to install it yourself (or define your own styles for the necessary css classes)
-   It's now possible to have items open initially

## Table of contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [Example](#example)

# Installation

```bash
$ npm install --save vue-bulma-accordion
$ yarn add vue-bulma-accordion
# Bulma is a peer dependency, you have to install it manually
$ yarn add bulma
$ npm install --save bulma
```

## Import

### Single File Component:

```javascript
import { BulmaAccordion, BulmaAccordionItem } from "vue-bulma-accordion";

export default {
    name: "cool-component",
    data() {
        return {};
    },
    components: {
        BulmaAccordion,
        BulmaAccordionItem
    }
};
```

### Browser:

```html
<div id="app">
    <bulma-accordion>
        <bulma-accordion-item> <p slot="title">Title</p> </bulma-accordion-item>
    </bulma-accordion>
</div>
<!-- Installation should happen automatically
    simply add the script tag after Vue -->
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.21/dist/vue.js"></script>
<script src="https://unpkg.com/vue-bulma-accordion"></script>
```

# Usage

Put a `<BulmaAccordion>` item on your page. There are a few options for the accordion, though they have sensible defaults if you dont want to change anything:

1.  dropdown
    -   Boolean
    -   If `true`, allows any number of items to be expanded simultaneously, rather than only 1 at a time
2.  initialOpenItem
    -   Number | String
    -   The index of the item you want to be open when the component is done rendering
    -   N.B. Indexing is 1 based - the first item is item 1
    -   This takes precedence over initialOpenItems if both are set
3.  initialOpenItems
    -   Number[]
    -   The indexes of the item you want to be open when the component is done rendering
    -   N.B. Indexing is 1 based - the first item is item 1
4.  icon
    -   String
    -   The icon on the right hand side of the title bar
    -   There are 3 options
        -   `'caret'`
        -   `'plus-minus'`
        -   `'custom'` - with this selected, you can provide your own icon in a slot, inside each accordion item. Either provide one icon in the `'icon'` slot, or a separate icon for when that accordion item is open or closed, in the `'icon-open'` and `'icon-closed'` slots
5.  caretAnimation
    -   Object
        -   duration: String - CSS valid duration, like `'450ms'`
        -   timerFunc: String - CSS valid timer function, like `'ease'`
        -   none: Boolean - set to false to disable animation
    -   If you select the 'caret' icon, this tunes the animation
        -   'none' - the default. The arrow simply switches instantly
        -   'spin' - the arrow rotates and expands slightly
6.  slide
    -   Object
        -   duration: String - CSS valid duration, like `'700ms'`
        -   timerFunc: String - CSS valid timer function, like `'ease'`
    -   Allows configuration of the slide animation for each accordion item

Fill the `<BulmaAccordion>` with as many `<BulmaAccordionItem>` components as you need. Each of the `<BulmaAccordionItem>` components has 3 slots, if you're not using a custom icon:

1.  `title` - I've found `<h4 class="title is-4 has-text-weight-normal" slot="title">The Title</h4>` to look quite nice
2.  `content`
3.  `footer`

There are a further 3 slots for custom icons:

1.  `icon` - when you just want 1 icon, DON'T USE WITH `icon-open` and `icon-closed`
2.  `icon-open` - the icon shown when the `<BulmaAccordionItem>` is open
3.  `icon-closed` - the icon shown when the `<BulmaAccordionItem>` is closed

# Examples

## Dropdown mode + plus-minus + 2 initial-open-items

<iframe height='450' scrolling='no' title='KbJLBB' src='//codepen.io/lunrtick/embed/KbJLBB/?height=265&theme-id=0&default-tab=result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/lunrtick/pen/KbJLBB/'>KbJLBB</a> by Gabriel Soicher (<a href='https://codepen.io/lunrtick'>@lunrtick</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Using custom icons

The icons used here are from https://material.io/icons/

<iframe height='450' scrolling='no' title='qLgGvO' src='//codepen.io/lunrtick/embed/qLgGvO/?height=265&theme-id=0&default-tab=result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/lunrtick/pen/qLgGvO/'>qLgGvO</a> by Gabriel Soicher (<a href='https://codepen.io/lunrtick'>@lunrtick</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## License

[MIT](http://opensource.org/licenses/MIT)
