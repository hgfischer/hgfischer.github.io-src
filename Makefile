THEME      := 
DRAFTS     := true
FUTURE     := true
CMD_THEME  := 
CMD_DRAFTS := "--buildDrafts=$(DRAFTS)"
CMD_FUTURE := "--buildFuture=$(FUTURE)"

.PHONY: default
default: build

.PHONY: build
build:
	hugo $(CMD_THEME) $(CMD_DRAFTS) $(CMD_FUTURE)

.PHONY: watch
watch:
	hugo server --watch $(CMD_THEME) $(CMD_DRAFTS) $(CMD_FUTURE)

.PHONY: install
install:
	go get -v github.com/spf13/hugo