.PHONY: default
default: draft

.PHONY: draft
draft:
	hugo -v --buildDrafts

.PHONY: build
build:
	hugo -v 

.PHONY: server
server: 
	nice hugo -v server --buildDrafts

.PHONY: watch
watch: 
	nice hugo -v server --watch --buildDrafts

.PHONY: dist
dist: theme build html_minify
	find public/ -type f -exec chmod 0644 {} \;
	find public/ -type d -exec chmod 0755 {} \;

.PHONY: publish
publish: dist
	cd public/ && \
	git pull && \
	git add -A && \
	git commit -m "Publishing build of `date`" && \
	git push origin master

.PHONY: deps
deps: $(HUGO)
	npm install

.PHONY: updeps
updeps:
	go get -v -u github.com/spf13/hugo
	npm update

.PHONY: clean
clean:
	rm -rf public/*
	rm -rf node_modules/

HUGO := $GOBIN/hugo
$(HUGO):
	go get -v github.com/spf13/hugo

GRUNT := node_modules/.bin/grunt
$(GRUNT): deps

BOOTLINT := node_modules/.bin/bootlint
$(BOOTLINT): deps

HTMLMINIFY := node_modules/.bin/html-minifier
$(HTMLMINIFY): deps

.PHONY: bootlint
bootlint: $(GRUNT)
	find public/ -type f -name '*.html' -exec $(BOOTLINT) {} \;

theme: $(GRUNT)
	$(GRUNT) theme

bwatch: $(GRUNT)
	$(GRUNT) watch

html_minify: $(HTMLMINIFY)
	@find public/ -type f -name '*.html' -print -exec \
		$(HTMLMINIFY) \
			--remove-comments \
			--collapse-whitespace \
			--conservative-collapse \
			--collapse-boolean-attributes \
			--remove-attribute-quotes \
			--remove-redundant-attributes \
			--use-short-doctype \
			--remove-empty-attributes \
			--remove-optional-tags \
			{} -o {}.min \;
	@find public/ -type f -name '*.html' -print -exec \
			mv {}.min {} \;

htmllint: draft html_minify
	$(GRUNT) htmllint

