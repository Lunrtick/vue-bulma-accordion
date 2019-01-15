#!/usr/bin/env sh

set -e

cd docs
vuepress build
cd .vuepress/dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:Lunrtick/vue-bulma-accordion.git master:gh-pages