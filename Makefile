.PHONY: default
default: build

.PHONY: build
build:
	hugo -v --buildDrafts

.PHONY: watch
watch: 
	nice hugo -v server --watch --buildDrafts

.PHONY: dist
dist: theme
	hugo -v 

.PHONY: install
install:
	go get -v github.com/spf13/hugo

.PHONY: clean
clean:
	rm -rf public/*
	rm -rf node_modules/

npm_install:
	npm install

GRUNT := node_modules/grunt-cli/bin/grunt
$(GRUNT): npm_install

BOOTLINT := node_modules/bootlint/bin/bootlint
$(BOOTLINT): npm_install

.PHONY: bootlint
bootlint: $(GRUNT)
	find public/ -type f -name '*.html' -exec $(BOOTLINT) {} \;

theme: $(GRUNT)
	$(GRUNT) theme

bwatch: $(GRUNT)
	$(GRUNT) watch