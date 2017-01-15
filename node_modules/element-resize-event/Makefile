BIN = ./node_modules/.bin

release-patch:
	@$(call release,patch)

release-minor:
	@$(call release,minor)

release-major:
	@$(call release,major)

build:
	@$(bin)browserify example/index.js -o example/bundle.js

publish:
	git push --tags origin HEAD:master
	npm publish

define release
	npm version $(1)
endef
