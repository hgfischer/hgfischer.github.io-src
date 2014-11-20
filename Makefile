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

.PHONY: gulp
gulp:
	node_modules/gulp/bin/gulp.js

.PHONY: install
install:
	go get -v github.com/spf13/hugo
	npm install gulp 
	npm install gulp-uglify 
	npm install gulp-sass
	npm install gulp-minify-css 
	npm install gulp-concat 