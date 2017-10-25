# vue-bulma-accordion

[![npm](https://img.shields.io/npm/v/vue-bulma-accordion.svg) ![npm](https://img.shields.io/npm/dm/vue-bulma-accordion.svg)](https://www.npmjs.com/package/vue-bulma-accordion)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

A simple accordion or collapsible styled with Bulma, animated by Velocity and sprinkled with Font Awesome.

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Example](#example)

# Installation

```
npm install --save vue-bulma-accordion 
```

## Import
Single File Component:

```javascript
import { BulmaAccordion, BulmaAccordionItem } from 'vue-bulma-accordion'

export default {
    name: 'cool-component',
    data () {
        return {
        }
    },
    components: {
        BulmaAccordion,
        BulmaAccordionItem,
    },
}
```
## Browser

```html
<link rel="stylesheet" href="vue-bulma-accordion/dist/vue-bulma-accordion.css"/>

<script src="vue.js"></script>
<script src="vue-bulma-accordion/dist/vue-bulma-accordion.browser.js"></script>
```

The plugin should be auto-installed. If not, you can install it manually with the instructions below.

Install all the components:

```javascript
Vue.use(VueBulmaAccordion)
```

Use specific components:

```javascript
Vue.component('bulma-accordion', VueBulmaAccordion.BulmaAccordion)
Vue.component('bulma-accordion-item', VueBulmaAccordion.BulmaAccordionItem)
```

# Usage

Put a `<BulmaAccordion>` item on your page. There are currently two options for the accordion, though neither are required: 
1. accordion
    * Boolean
    * If true, collapses the open tab when another is selected, i.e. allows only one tab to be open at any time
2. animation
    * String
    * Currently you have 2 choices
        * 'none' - the default. The arrow simply switches instantly
        * 'spin' - the arrow rotates and expands slightly

Fill it with as many `<BulmaAccordionItem>` components as you need. Each of the `<BulmaAccordionItem>` components has 3 slots:
1. title - I've found `<h4 class="title is-4 has-text-weight-normal" slot="title">The Title</h4>` to look quite nice
2. content
3. footer

# Example

```html
<BulmaAccordion
accordion
animation="spin"
> <!-- The wrapper component for all the items -->
    <BulmaAccordionItem>
        <h4 slot="title">Just a title</h4>
    </BulmaAccordionItem> <!-- add as many of these items as you need - fill them with content via the slots -->
    <BulmaAccordionItem>
        <h4 slot="title">A title with content</h4>
        <p slot="content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus eos illo expedita asperiores rem iure aliquid dolore, pariatur dignissimos, minima inventore? Minima voluptatum nulla, error omnis laboriosam voluptatibus rem aperiam.</p>
    </BulmaAccordionItem>
    <BulmaAccordionItem>
        <h4 slot="title">All of it</h4>
        <p slot="content">boo</p>
        <button class="button is-primary" slot="footer">Click Me!</button>
    </BulmaAccordionItem>
</BulmaAccordion>
```

---

# Plugin Development

## Installation

The first time you create or clone your plugin, you need to install the default dependencies:

```
npm install
```

## Watch and compile

This will run webpack in watching mode and output the compiled files in the `dist` folder.

```
npm run dev
```

## Use it in another project

While developping, you can follow the install instructions of your plugin and link it into the project that uses it.

In the plugin folder:

```
npm link
```

In the other project folder:

```
npm link vue-bulma-accordion
```

This will install it in the dependencies as a symlink, so that it gets any modifications made to the plugin.

## Manual build

This will build the plugin into the `dist` folder in production mode.

```
npm run build
```

---

## License

[MIT](http://opensource.org/licenses/MIT)
