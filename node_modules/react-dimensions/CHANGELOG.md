# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]


## [1.3.0] - 2016-07-08
### Added
- Added a CHANGELOG.md
- Add option `className` for setting an optional class on the wrapper `<div>` ([#32](https://github.com/digidem/react-dimensions/pull/32))

## [1.2.0] - 2016-05-26
### Added
- `getWrappedInstance()` method ([#24](https://github.com/digidem/react-dimensions/pull/24))

## [1.1.1] - 2016-04-29
### Fixed
- Roll back accidental breaking change introduced in v1.1.0 by switching to babel v6 and changing default exports for CommonJS ([#23](https://github.com/digidem/react-dimensions/issues/23))

## [1.1.0] - 2016-04-28
### Added
- Update dimensions when an container element resizes without window resize (#4)
- Allow style of container `div` to be overridden with `containerStyle` option.
- `updateDimensions` function passed as prop passed to children to force a recalculation of dimensions.

### Changed
- Only update state if dimensions actually change (aa5fc1e9f1625f2195259c8fc7d7d041d5d53a66)
- Update to Babel 6
- Switch to documentationjs from doxme for README generation.

### Fixed
- Now works in popup windows and iframes with a different `window` context (#22)


[Unreleased]: https://github.com/digidem/react-dimensions/compare/v1.3.0...HEAD
[1.3.0]: https://github.com/digidem/react-dimensions/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/digidem/react-dimensions/compare/v1.1.1...v1.2.0
[1.1.1]: https://github.com/digidem/react-dimensions/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/digidem/react-dimensions/compare/v1.0.2...v1.1.0
