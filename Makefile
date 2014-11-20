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