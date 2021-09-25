// https://github.com/victorchee/WebViewProxy/blob/95a610836a81dc2aa7034eef91fde920fa5d6f6c/WebViewProxy/WebViewProxy/WKWebView%2BHook.m
//
//  WKWebView+WKWebView_Hook.m
//  WebViewProxy
//
//  Created by VictorChee on 2021/3/16.
//

#import <WebKit/WebKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface WKWebView (Hook)

@end

NS_ASSUME_NONNULL_END
#import <objc/runtime.h>

@implementation WKWebView (Hook)

+ (void)load {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        Method origin = class_getClassMethod(self, @selector(handlesURLScheme:));
        Method hook = class_getClassMethod(self, @selector(my_handlesURLScheme:));
        method_exchangeImplementations(origin, hook);
    });
}

+ (BOOL)my_handlesURLScheme:(NSString *)urlScheme {
    if ([urlScheme isEqualToString:@"http"] || [urlScheme isEqualToString:@"https"]) {
        return NO;
    }
    return [self my_handlesURLScheme:urlScheme];
}

@end
