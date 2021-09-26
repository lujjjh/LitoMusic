TARGET_DIR = $(CURDIR)/build/target
TARGET_DMG = $(CURDIR)/build/LitoMusic.dmg

all: package

build:
	xcodebuild -project LitoMusic/LitoMusic.xcodeproj -scheme LitoMusic -configuration Release -derivedDataPath build clean build

package: build
	rm -rf '$(TARGET_DIR)'
	mkdir -p '$(TARGET_DIR)'
	cp -a '$(CURDIR)/build/Build/Products/Release/Lito Music.app' '$(TARGET_DIR)'
	ln -s /Applications '$(TARGET_DIR)/'
	rm '${TARGET_DMG}'
	hdiutil create -fs HFS+ -srcfolder '$(TARGET_DIR)/' -volname 'Lito Music' '$(TARGET_DMG)'

.PHONY: all build package
