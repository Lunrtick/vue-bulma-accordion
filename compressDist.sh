#!/bin/bash

cd dist
gzip -k main.js
gzip -k main.css
cd -