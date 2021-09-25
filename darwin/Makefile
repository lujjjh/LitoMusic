all: package

build:
	xcodebuild -project LitoMusic/LitoMusic.xcodeproj -scheme LitoMusic -configuration Release -derivedDataPath build clean build

package: build

.PHONY: all build package
