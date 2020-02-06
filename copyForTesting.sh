#!/bin/bash
yarn run build:parcel
cp ./dist/entry.js /home/gabe/Dev/Test/ssr-test/node_modules/vue-bulma-accordion/index.js
cp ./dist/entry.js.map /home/gabe/Dev/Test/ssr-test/node_modules/vue-bulma-accordion
cp ./dist/entry.css /home/gabe/Dev/Test/ssr-test/node_modules/vue-bulma-accordion/index.css
echo "diddit"