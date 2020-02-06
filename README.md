# vue-bulma-accordion

[![npm](https://img.shields.io/npm/v/vue-bulma-accordion.svg) ![npm](https://img.shields.io/npm/dm/vue-bulma-accordion.svg) ![npm](https://img.shields.io/npm/dt/vue-bulma-accordion.svg)](https://www.npmjs.com/package/vue-bulma-accordion)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

A simple, easily configurable accordion or collapsible for Vue, styled with Bulma.

Full docs [here](https://lunrtick.github.io/vue-bulma-accordion/)

## New in 0.5

-   SSR Support!

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

Single File Component:

```javascript
import { BulmaAccordion, BulmaAccordionItem } from 'vue-bulma-accordion'

export default {
    name: 'cool-component',
    data() {
        return {}
    },
    components: {
        BulmaAccordion,
        BulmaAccordionItem
    }
}
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

## Using built in icons

```vue
<BulmaAccordion
    dropdown
    :icon="'caret'"
    :caretAnimation="{
        duration: '.6s',
        timerFunc: 'ease-in-out'
    }"
    :slide="{
        duration: '.9s',
        timerFunc: 'ease'
    }"
>
    <!-- The wrapper component for all the items -->
    <BulmaAccordionItem>
        <h4 slot="title">Just a title</h4>
    </BulmaAccordionItem>
    <!-- add as many of these items as you need - fill them with content via the slots -->
    <BulmaAccordionItem>
        <h4 slot="title">A title with content</h4>
        <p slot="content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus eos
            illo expedita asperiores rem iure aliquid dolore, pariatur
            dignissimos, minima inventore? Minima voluptatum nulla, error omnis
            laboriosam voluptatibus rem aperiam.
        </p>
    </BulmaAccordionItem>
    <BulmaAccordionItem>
        <h4 slot="title">All of it</h4>
        <p slot="content">boo</p>
        <button class="button is-primary" slot="footer">Click Me!</button>
    </BulmaAccordionItem>
</BulmaAccordion>
```

## Using custom icons

The icons used here are from https://material.io/icons/

```vue
<BulmaAccordion :dropdown="false" :icon="'custom'">
    <!-- The wrapper component for all the items -->
    <BulmaAccordionItem>
        <p class="title is-4 has-text-weight-normal" slot="title">Title</p>
        <i slot="icon" class="material-icons">more_vert</i>
        <div class="high" slot="content"><p>This is a div with content</p></div>
        <button class="button is-primary" slot="footer">Click Me!</button>
    </BulmaAccordionItem>
    <!-- add as many of these items as you need - fill them with content via the slots -->
    <BulmaAccordionItem>
        <h4 slot="title">A title with content</h4>
        <i slot="icon-closed" class="material-icons">flight_takeoff</i>
        <i slot="icon-open" class="material-icons">flight_land</i>
        <p slot="content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus eos
            illo expedita asperiores rem iure aliquid dolore, pariatur
            dignissimos, minima inventore? Minima voluptatum nulla, error omnis
            laboriosam voluptatibus rem aperiam.
        </p>
    </BulmaAccordionItem>
</BulmaAccordion>
```

## License

[MIT](http://opensource.org/licenses/MIT)
