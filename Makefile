DRAFTS       := true
FUTURE       := true
CMD          := -v --verboseLog --log --buildDrafts=$(DRAFTS) --buildFuture=$(FUTURE)

.PHONY: default
default: theme build

.PHONY: build
build: 
	hugo -v $(CMD)

.PHONY: watch
watch: theme
	$(GRUNT) watch &
	hugo -v server --watch $(CMD)

.PHONY: install
install:
	go get -v github.com/spf13/hugo

.PHONY: clean
clean:
	rm -rf public/*
	rm -rf node_modules/

npm_install:
	npm install --save-dev

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