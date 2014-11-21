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

.PHONY: deps
deps: 
	go get -v github.com/spf13/hugo
	npm install

.PHONY: updeps
updeps:
	go get -v -u github.com/spf13/hugo
	npm update

.PHONY: clean
clean:
	rm -rf public/*
	rm -rf node_modules/

GRUNT := node_modules/grunt-cli/bin/grunt
$(GRUNT): deps

BOOTLINT := node_modules/bootlint/bin/bootlint
$(BOOTLINT): deps

.PHONY: bootlint
bootlint: $(GRUNT)
	find public/ -type f -name '*.html' -exec $(BOOTLINT) {} \;

theme: $(GRUNT)
	$(GRUNT) theme

bwatch: $(GRUNT)
	$(GRUNT) watch