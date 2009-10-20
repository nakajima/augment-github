# Augment GitHub

Adds follower and fork counts to your repos on your dashboard page.

## Install it

See installation info here: [http://nakajima.github.com/augment-github](http://nakajima.github.com/augment-github/)

## Building it

I use this snippet, but there are probably better ways:

    ruby -e "require 'cgi'; puts CGI.escapeHTML(File.read('augment-github.js').gsub(/(\s*\n\s*)*/, ''))" | pbcopy

Use it in good health.