DRAFTS := true
FUTURE := true
CMD    := -v --verboseLog --log --buildDrafts=$(DRAFTS) --buildFuture=$(FUTURE)

.PHONY: default
default: build

.PHONY: build
build:
	hugo -v $(CMD)

.PHONY: watch
watch:
	hugo -v server --watch $(CMD)

.PHONY: install
install:
	go get -v github.com/spf13/hugo

.PHONY: clean
clean:
	rm -rf public/*

.PHONY: setup_grunt
setup_grunt:
	npm install --save-dev

.PHONY: grunt
grunt:
	./node_modules/grunt-cli/bin/grunt

.PHONY: bootlint
bootlint:
	find public/ -type f -name '*.html' -exec node_modules/.bin/bootlint {} \;