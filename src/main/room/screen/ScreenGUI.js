// Copyright 2015 by Paulo Augusto Peccin. See license.txt distributed with this file.

wmsx.ScreenGUI = wmsx.Util.isMobileDevice()
    ? {
        BAR_HEIGHT: 29,
        BAR_MENU_WIDTH: 150,
        BAR_MENU_ITEM_HEIGHT: 33,
        BAR_MENU_ITEM_FONT_SIZE: 14,
        LOGO_SCREEN_WIDTH: 597,
        LOGO_SCREEN_HEIGHT: 455,
        TOUCH_CONTROLS_LEFT_WIDTH: 119,
        TOUCH_CONTROLS_RIGHT_WIDTH: 80,
        TOUCH_CONTROLS_TOTAL_WIDTH: 119 + 80
    }
    : {
        BAR_HEIGHT: 29,
        BAR_MENU_WIDTH: 140,
        BAR_MENU_ITEM_HEIGHT: 29,
        BAR_MENU_ITEM_FONT_SIZE: 13,
        LOGO_SCREEN_WIDTH: 597,
        LOGO_SCREEN_HEIGHT: 455,
        TOUCH_CONTROLS_LEFT_WIDTH: 119,
        TOUCH_CONTROLS_RIGHT_WIDTH: 80,
        TOUCH_CONTROLS_TOTAL_WIDTH: 119 + 80
    };

wmsx.ScreenGUI.html = function() {
    return `<div id="wmsx-screen-fs" tabindex="0">
            <div id="wmsx-screen-fs-center" tabindex="-1">
                <div id="wmsx-screen-canvas-outer">
                    <canvas id="wmsx-screen-canvas" tabindex="-1"></canvas>
                    <img id="wmsx-canvas-loading-icon" draggable="false" src="` + wmsx.Images.urls.loading + `">
                    <div id="wmsx-logo">
                        <div id="wmsx-logo-center">
                            <img id="wmsx-logo-image" draggable="false" src="` + wmsx.Images.urls.logo + `">
                            <img id="wmsx-logo-loading-icon" draggable="false" src="` + wmsx.Images.urls.loading + `">
                            <div id="wmsx-logo-message">
                                <div id="wmsx-logo-message-text"></div>
                                <div id="wmsx-logo-message-ok">
                                    <div id="wmsx-logo-message-ok-text"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="wmsx-osd"></div>
                </div>
                <div id="wmsx-bar">
                    <div id="wmsx-bar-inner"></div>
                </div>
            </div>
            <div id="wmsx-screen-scroll-message">
                Swipe up/down on the Screen <br>to hide the browser bars!
            </div>
        </div>`;
};

wmsx.ScreenGUI.css = function() {
    return `html.wmsx-full-screen-scroll-hack body {
    position: absolute;
    width: 100%;
    height: ` + Math.max(1280, (Math.max(screen.width, screen.height) * 1.4) | 0) + `px;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    border: none;
    overflow-x: hidden;
    overflow-y: auto;
}

#wmsx-screen-fs, #wmsx-screen-fs div, #wmsx-screen-fs canvas {
    outline: none;
}

#` + WMSX.SCREEN_ELEMENT_ID + ` {
    display: inline-block;
    visibility: hidden;
    font-family: sans-serif;
    font-weight: normal;
    margin: 0;
    padding: 0;
    border: 1px solid black;
    background: black;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
    touch-callout: none;
    -webkit-tap-highlight-color: transparent;
    tap-highlight-color: transparent;
    -webkit-text-size-adjust: none;
    -moz-text-size-adjust: none;
    text-size-adjust: none;
}
html.wmsx-full-screen #` + WMSX.SCREEN_ELEMENT_ID + ` {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    box-shadow: none;
    z-index: 2147483646;    /* one behind fsElement */
}
html.wmsx-started #` + WMSX.SCREEN_ELEMENT_ID + ` {
    visibility: visible;
}

#wmsx-screen-scroll-message {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -50%;
    width: 0;
    height: 0;
    padding: 0;
    margin: 0 auto;
    font-size: 16px;
    line-height: 28px;
    color: hsl(0, 0%, 4%);
    white-space: nowrap;
    background: hsl(0, 0%, 92%);
    border-radius: 15px;
    box-shadow: 2px 2px 9px rgba(0, 0, 0, 0.7);
    transition: all 1.7s step-end, opacity 1.6s linear;
    opacity: 0;
    z-index: -1;
}
html.wmsx-full-screen-scroll-hack #wmsx-screen-fs.wmsx-scroll-message #wmsx-screen-scroll-message {
    opacity: 1;
    bottom: 23%;
    width: 215px;
    height: 56px;
    padding: 13px 20px;
    z-index: 10;
    transition: none;
}

#wmsx-screen-fs {
    position: relative;
    background: black;
    text-align: center;
    overflow: hidden;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    tap-highlight-color: rgba(0,0,0,0)
}
html.wmsx-full-screen #wmsx-screen-fs {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 2147483647;
}
html.wmsx-full-screen-scroll-hack #wmsx-screen-fs {
    position: fixed;
    bottom: 0;
    height: 100vh;
}

html.wmsx-full-screen #wmsx-screen-fs-center {      /* Used to center and move things horizontally in Landscape Full Screen */
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

#wmsx-screen-canvas-outer {
    display: inline-block;
    position: relative;
    vertical-align: top;
    line-height: 1px;
    z-index: 3;
}

#wmsx-screen-canvas {
    display: block;
}

#wmsx-bar {
    position: relative;
    left: 0;
    right: 0;
    height: ` + this.BAR_HEIGHT + `px;
    margin: 0 auto;
    border-top: 1px solid black;
    background: hsl(0, 0%, 16%);
    overflow: visible;                    /* for the Menu to show through */
    box-sizing: content-box;
    z-index: 5;

}
#wmsx-bar-inner {
    position: absolute;
    overflow: hidden;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: left;
}

html.wmsx-bar-auto-hide #wmsx-bar, html.wmsx-full-screen #wmsx-bar {
    position: absolute;
    bottom: 0;
    transition: height 0.08s ease-in-out;
}
html.wmsx-bar-auto-hide #wmsx-bar.wmsx-hidden {
    transition: height 0.5s ease-in-out;
    height: 0;
    bottom: -1px;
}
@media only screen and (orientation: landscape) {
    html.wmsx-full-screen #wmsx-bar.wmsx-hidden {
        transition: height 0.5s ease-in-out;
        height: 0;
        bottom: -1px;
    }
}

#wmsx-bar.wmsx-narrow .wmsx-narrow-hidden {
    display: none;
}

.wmsx-bar-button {
    display: inline-block;
    width: 24px;
    height: 28px;
    margin: 0 1px;
    background-image: url("` + wmsx.Images.urls.sprites + `");
    background-repeat: no-repeat;
    background-size: 296px 81px;
    cursor: pointer;
}
/*
.wmsx-bar-button {
    border: 1px solid yellow;
    background-origin: border-box;
    box-sizing: border-box;
}
*/

#wmsx-bar-power {
    margin: 0 12px 0 6px;
}
#wmsx-bar-settings, #wmsx-bar-full-screen, #wmsx-bar-scale-plus, #wmsx-bar-scale-minus {
    float: right;
    margin: 0;
}
#wmsx-bar-settings {
    margin-right: 5px;
}
#wmsx-bar-full-screen.wmsx-mobile {
    margin: 0 6px;
}
#wmsx-bar-scale-plus {
    width: 21px;
}
#wmsx-bar-scale-minus {
    width: 18px;
}
#wmsx-bar-text {
    float: right;
    width: 32px;
}
#wmsx-bar-text.wmsx-mobile {
    margin: 0 0 0 6px;
}
#wmsx-bar-keyboard {
    position: absolute;
    left: 0; right: 0;
    width: 37px;
    margin: 0 auto;
}
#wmsx-bar.wmsx-narrow #wmsx-bar-keyboard {
    position: static;
    float: right;
}
#wmsx-bar-logo {
    position: absolute;
    left: 0; right: 0;
    width: 52px;
    margin: 0 auto;
}


#wmsx-bar-menu {
    position: absolute;
    display: none;
    bottom: ` + this.BAR_HEIGHT + `px;
    font-size: ` + this.BAR_MENU_ITEM_FONT_SIZE + `px;
    line-height: 1px;
    overflow: hidden;
    transform-origin: bottom center;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
#wmsx-bar-menu-inner {
    display: inline-block;
    padding-bottom: 2px;
    border: 1px solid black;
    background: hsl(0, 0%, 16%);
}
.wmsx-bar-menu-item, #wmsx-bar-menu-title {
    position: relative;
    display: none;
    width: ` + this.BAR_MENU_WIDTH + `px;
    height: ` + this.BAR_MENU_ITEM_HEIGHT + `px;
    color: rgb(205, 205, 205);
    border: none;
    padding: 0;
    line-height: ` + this.BAR_MENU_ITEM_HEIGHT + `px;
    text-shadow: 1px 1px 1px black;
    background: transparent;
    outline: none;
    overflow: hidden;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    cursor: pointer;
    box-sizing: border-box;
}
#wmsx-bar-menu-title {
    display: block;
    color: white;
    font-weight: bold;
    border-bottom: 1px solid black;
    margin-bottom: 1px;
    text-align: center;
    background: rgb(70, 70, 70);
    cursor: auto;
}
.wmsx-bar-menu-item.wmsx-hover:not(.wmsx-bar-menu-item-disabled):not(.wmsx-bar-menu-item-divider) {
    color: white;
    background: hsl(358, 67%, 46%);
}
.wmsx-bar-menu-item-disabled {
    color: rgb(110, 110, 110);
}
.wmsx-bar-menu-item-divider {
    height: 1px;
    margin: 1px 0;
    background: black;
}
.wmsx-bar-menu-item-toggle {
    text-align: left;
    padding-left: 30px;
}
.wmsx-bar-menu-item-toggle::after {
    content: "";
    position: absolute;
    width: 6px;
    height: 19px;
    top: ` + (((this.BAR_MENU_ITEM_HEIGHT - 21) / 2) | 0) + `px;
    left: 10px;
    background: rgb(70, 70, 70);
    box-shadow: black 1px 1px 1px;
}

.wmsx-bar-menu-item-toggle.wmsx-bar-menu-item-toggle-checked {
    color: white;
}
.wmsx-bar-menu-item-toggle.wmsx-bar-menu-item-toggle-checked::after {
    background: rgb(248, 33, 28);
}

#wmsx-screen-fs .wmsx-select-dialog {
    position: absolute;
    overflow: hidden;
    display: none;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 540px;
    max-width: 92%;
    height: 297px;
    margin: auto;
    color: white;
    font-size: 18px;
    background: hsl(0, 0%, 16%);
    padding: 14px 0 0;
    text-align: center;
    border: 1px solid black;
    box-sizing: initial;
    text-shadow: 1px 1px 1px black;
    box-shadow: 3px 3px 15px 2px rgba(0, 0, 0, .4);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    cursor: auto;
    z-index: 4;
}
#wmsx-screen-fs .wmsx-select-dialog.wmsx-show {
    display: block;
}
#wmsx-screen-fs .wmsx-select-dialog .wmsx-footer {
    position: absolute;
    width: 100%;
    bottom: 6px;
    font-size: 13px;
    text-align: center;
    color: rgb(170, 170, 170);
}
#wmsx-screen-fs .wmsx-select-dialog ul {
    position: relative;
    width: 88%;
    top: 7px;
    margin: auto;
    padding: 0;
    list-style: none;
    font-size: 14px;
    color: hsl(0, 0%, 88%);
}
#wmsx-screen-fs .wmsx-select-dialog li {
    display: none;
    overflow: hidden;
    height: 26px;
    background: rgb(70, 70, 70);
    margin: 7px 0;
    padding: 2px 10px;
    line-height: 18px;
    text-align: left;
    text-overflow: ellipsis;
    border: 2px dashed transparent;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, .5);
    white-space: nowrap;
    box-sizing: border-box;
    cursor: pointer;
}
#wmsx-screen-fs .wmsx-select-dialog li.wmsx-visible {
    display: block;
}
#wmsx-screen-fs .wmsx-select-dialog li.wmsx-selected {
    color: white;
    background: hsl(358, 67%, 46%);
}
#wmsx-screen-fs .wmsx-select-dialog li.wmsx-droptarget {
    color: white;
    border-color: lightgray;
}

#wmsx-logo {
    position: absolute;
    display: none;
    top: 0; bottom: 0;
    left: 0; right: 0;
    background: black;
}
#wmsx-logo.wmsx-show {
    display: block;
}

#wmsx-logo-center {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 598px;
    height: 456px;
    transform: translate(-50%, -50%);
}
#wmsx-screen-fs:not(.wmsx-logo-message-active) #wmsx-logo-center {
    max-width: 100%;
    max-height: 100%;
}

#wmsx-logo-image {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 334px;
    max-width: 57%;
    transform: translate(-50%, -50%);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
html.wmsx-full-screen #wmsx-logo-image {
    max-width: 67%;
}
#wmsx-screen-fs.wmsx-logo-message-active #wmsx-logo-image {
    top: 138px;
    max-width: initial;
}

#wmsx-logo-loading-icon, #wmsx-canvas-loading-icon {
    display: none;
    position: absolute;
    top: 62%;
    left: 0; right: 0;
    width: 14%;
    height: 3%;
    margin: 0 auto;
    background-color: rgba(0, 0, 0, .8);
    border: solid transparent;
    border-width: 12px 30px;
    border-radius: 3px;
    box-sizing: content-box;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
#wmsx-screen-fs.wmsx-logo-message-active #wmsx-logo-loading-icon {
    top: 190px;
}

#wmsx-logo-message {
    display: none;
    position: absolute;
    top: 224px;
    width: 100%;
    color: hsl(0, 0%, 97%);
    font-size: 29px;
    line-height: 34px;
}
#wmsx-screen-fs.wmsx-logo-message-active #wmsx-logo-message {
    display: block;
}

#wmsx-logo-message-ok {
    display: block;
    position: absolute;
    top: 91px;
    left: 193px;
    width: 214px;
    height: 130px;
}
#wmsx-logo-message-ok.wmsx-higher {
    top: 74px;
}
#wmsx-logo-message-ok-text {
    position: absolute;
    top: 49%;
    left: 50%;
    width: 120px;
    height: 47px;
    font-size: 23px;
    line-height: 47px;
    background: hsl(358, 67%, 46%);
    border-radius: 6px;
    color: white;
    transform: translate(-50%, -50%);
}

#wmsx-osd {
    position: absolute;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    top: -29px;
    right: 18px;
    height: 29px;
    max-width: 92%;
    padding: 0 12px;
    margin: 0;
    font-weight: bold;
    font-size: 15px;
    line-height: 29px;
    color: rgb(0, 255, 0);
    background: rgba(0, 0, 0, 0.7);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    opacity: 0;
}

#wmsx-copy-texarea {
    position: absolute;
    width: 50px;
    height: 0;
    bottom: 0;
    z-index: -10;
    opacity: 0;
}

#wmsx-paste-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 340px;
    height: 136px;
    margin: auto;
    border-radius: 20px;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1;
}
#wmsx-paste-cover.wmsx-show {
    display: block;
}

#wmsx-paste-box {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 270px;
    height: 66px;
    margin: auto;
    background: rgba(255, 40, 40, 0.75);
    font-weight: bold;
    font-size: 26px;
    text-align: center;
    color: transparent;
    border: 2px dashed rgba(240, 240, 240, 0.70);
    box-sizing: initial;
    border-radius: 10px;
    text-shadow: 0 0 0 rgb(240, 240, 240);
    padding: 0;
    outline: none;
}


#wmsx-text-entry-dialog {
    display: none;
    position: absolute;
    top: 25px;
    left: 0; right: 0;
    width: 96%;
    max-width: 540px;
    height: 47%;
    max-height: 450px;
    margin: 0 auto;
    color: white;
    font-size: 19px;
    line-height: 23px;
    background: hsl(0, 0%, 16%);
    text-align: center;
    border: 1px solid black;
    box-sizing: initial;
    text-shadow: 1px 1px 1px black;
    box-shadow: 3px 3px 15px 2px rgba(0, 0, 0, .4);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    cursor: auto;
    z-index: 4;
}
#wmsx-text-entry-dialog.wmsx-show {
    display: block;
}

#wmsx-text-entry-dialog-bar {
    position: absolute;
    height: 40px;
    width: 100%;
    line-height: 40px;
    background: inherit;
    overflow: hidden;
}
#wmsx-text-entry-dialog-bar::before {
    content: "Input Text";
}

#wmsx-text-entry-dialog-ok, #wmsx-text-entry-dialog-cancel {
    display: inline-block;
    float: right;
    width: 70px;
    height: 22px;
    margin-right: 15px;
    border: 9px solid hsl(0, 0%, 16%);
    border-left: none;
    border-right: none;
    font-size: 14px;
    line-height: 22px;
    background: hsl(358, 67%, 46%);
    cursor: pointer;
}
#wmsx-text-entry-dialog-cancel {
    color: hsl(0, 0%, 90%);
    background: hsl(0, 0%, 30%);
}
#wmsx-text-entry-dialog-ok::before {
    content: "OK";
}
#wmsx-text-entry-dialog-cancel::before {
    content: "CANCEL";
}

#wmsx-text-entry-input {
    position: absolute;
    top: 15px;
    left: 15px;
    width: calc(100% - 30px);
    height: calc(100% - 30px);
    padding: 29px 6px 4px;
    font-size: 16px;
    border: none;
    border-radius: 0;
    background: hsl(0, 0%, 90%);
    box-sizing: border-box;
    resize: none;
    outline: none;
    -webkit-touch-callout: default;
    touch-callout: default;
}


.wmsx-arrow-up, .wmsx-arrow-down, .wmsx-arrow-left, .wmsx-arrow-right {
    border: 0px solid transparent;
    box-sizing: border-box;
}
.wmsx-arrow-up    { border-bottom-color: inherit; }
.wmsx-arrow-down  { border-top-color: inherit; }
.wmsx-arrow-left  { border-right-color: inherit; }
.wmsx-arrow-right { border-left-color: inherit; }


.wmsx-keyboard-key {
    position: absolute;
    height: 25px;
    padding: 4px 0;
    overflow: hidden;
    font-weight: normal;
    font-size: 10px;
    line-height: 11px;
    text-align: center;
    vertical-align: top;
    color: white;
    background: hsl(0, 0%, 66%);
    border: 3px solid hsl(0, 0%, 50%);
    border-top: 1px solid hsl(0, 0%, 54%);
    border-bottom: 5px solid hsl(0, 0%, 33%);
    border-radius: 3px 3px 0 0;
    box-shadow: 0 1px 0 1px rgb(0, 0, 0);
    box-sizing: border-box;
    cursor: pointer;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.wmsx-keyboard-key.wmsx-keyboard-key-dark {
    background: hsl(0, 0%, 46%);
    border-color: hsl(0, 0%, 36%);
    border-top-color: hsl(0, 0%, 40%);
    border-bottom-color: hsl(0, 0%, 24%);
}
.wmsx-keyboard-key.wmsx-keyboard-key-unmapped {
    color: rgb(30, 30, 30);
    font-weight: bold;
    -webkit-font-smoothing: initial;
    -moz-osx-font-smoothing: initial;
}
.wmsx-keyboard-alpha, .wmsx-keyboard-num, .wmsx-keyboard-arrows {
    position: absolute;
}
.wmsx-keyboard-alpha > div, .wmsx-keyboard-num > div, .wmsx-keyboard-arrows > div {
    position: absolute;
}
.wmsx-keyboard-num {
    left: 416px;
}
.wmsx-keyboard-arrows {
    top: 104px;
    left: 416px;
}
.wmsx-keyboard-f1, .wmsx-keyboard-f2, .wmsx-keyboard-f3, .wmsx-keyboard-f4, .wmsx-keyboard-f5,
.wmsx-keyboard-stop, .wmsx-keyboard-select, .wmsx-keyboard-home, .wmsx-keyboard-insert, .wmsx-keyboard-delete {
    height: 18px;
    padding: 2px 0;
    font-size: 9px;
    line-height: 9px;
    border-width: 1px 2px 4px;
}
.wmsx-keyboard-stop {
    margin-left: 10px;
    background: hsl(0, 70%, 54%);
    border-color: hsl(0, 70%, 36%);
    border-top-color: hsl(0, 70%, 40%);
    border-bottom-color: hsl(0, 70%, 28%);
}
.wmsx-keyboard-enter {
    border-radius: 2px 3px 0 0;
    border-top: none;
    box-shadow: none;
}
.wmsx-keyboard-enter_x1 {
    border-radius: 2px 0 0 0;
    border-width: 1px;
    border-right: none;
    box-shadow: -1px 1px 0 0 black;
}
.wmsx-keyboard-enter_x2 {
    overflow: visible;
    padding: 0;
    border: none;
    border-radius: 0 3px 0 0;
    box-shadow: none;
    box-shadow: 1px 1px 0 0 black;
}
.wmsx-keyboard-enter_x2::after {
    content: "";
    display: block;
    width: 30px;
    height: 50px;
    background: inherit;
    border: 3px solid hsl(0, 0%, 36%);
    border-top: 1px solid hsl(0, 0%, 40%);
    border-bottom: 5px solid hsl(0, 0%, 24%);
    border-radius: 0 3px 0 0;
    box-shadow: 1px 2px 0 0 black, 1px 0 0 0 black;
    box-sizing: border-box;
}
.wmsx-keyboard-capslock {
    margin-left: 16px;
}
.wmsx-keyboard-num .wmsx-keyboard-key {
    height: 23px;
    line-height: 9px;
}
.wmsx-keyboard-arrows .wmsx-keyboard-key {
    font-size: 8px;
    line-height: 9px;
    background: rgb(70, 85, 180);
    border-width: 1px 2px 4px;
    border-radius: 2px 2px 0 0;
    border-color: hsl(232, 44%, 37%);
    border-top-color: hsl(232, 44%, 40%);
    border-bottom-color: hsl(232, 44%, 24%);
}
.wmsx-keyboard-left, .wmsx-keyboard-right {
    top: 5px;
    left: 1px;
    width: 25px;
    height: 35px;
    padding: 11px 0 0 6px;
}
.wmsx-keyboard-up, .wmsx-keyboard-down {
    left: 27px;
    width: 39px;
    height: 23px;
    padding: 5px 0 0 13px;
}
.wmsx-keyboard-down {
    top: 23px;
    padding-top: 7px;
}
.wmsx-keyboard-right {
    left: 67px;
    padding-left: 9px;
}

.wmsx-keyboard-up::after, .wmsx-keyboard-down::after, .wmsx-keyboard-left::after, .wmsx-keyboard-right::after {
    content: "";
    display: block;
    border: 4px solid transparent;
    width: 6px;
    height: 6px;
    box-sizing: border-box;
}
.wmsx-keyboard-up::after {
    border-bottom: 5px solid white;
    border-top-width: 0;
}
.wmsx-keyboard-down::after {
    border-top: 5px solid white;
    border-bottom-width: 0;
}
.wmsx-keyboard-left::after {
    border-right: 5px solid white;
    border-left-width: 0;
}
.wmsx-keyboard-right::after {
    border-left: 5px solid white;
    border-right-width: 0;
}


#wmsx-virtual-keyboard {
    display: none;
    position: absolute;
    left: 50%;
    bottom: ` + ( this.BAR_HEIGHT + 2) + `px;
    overflow: hidden;
    margin: 0 auto;
    padding: 5px 0 0 4px;
    width: 518px;
    height: 161px;
    background: hsl(0, 0%, 16%);
    box-sizing: border-box;
    transform: translateX(-50%);
    transform-origin: center bottom;
    transition: height 0.3s ease-in-out;
    text-align: left;
    z-index: 2;
}
html.wmsx-full-screen.wmsx-virtual-keyboard-active #wmsx-virtual-keyboard {
    display: block;
}


.wmsx-quick-options-list {
    margin-top: 16px;
    padding: 0;
    list-style: none;
    color: hsl(0, 0%, 88%);
}
.wmsx-quick-options-list li {
    margin-top: 9px;
    line-height: 1px;
    text-align: left;
}
.wmsx-quick-options-list li div {
    display: inline-block;
    overflow: hidden;
    height: 26px;
    font-size: 14px;
    line-height: 25px;
    text-overflow: ellipsis;
    white-space: nowrap;
    box-sizing: border-box;
}
.wmsx-quick-options-list .wmsx-control {
    float: right;
    width: 86px;
    font-size: 15px;
    color: hsl(0, 0%, 70%);
    background: black;
    text-align: center;
    cursor: pointer;
}
.wmsx-quick-options-list .wmsx-control.wmsx-selected {
    color: white;
    background: hsl(358, 67%, 46%);
    box-shadow: 1px 1px 1px rgba(0, 0, 0, .5);
}
.wmsx-quick-options-list .wmsx-control.wmsx-selected.wmsx-inactive {
    line-height: 21px;
    border: 2px dashed hsl(358, 67%, 46%);
    background: black;
}


#wmsx-quick-options {
    display: none;
    position: absolute;
    top: 0; bottom: 0;
    left: 0; right: 0;
    width: 188px;
    height: 182px;
    margin: auto;
    padding: 14px 16px 0;
    color: white;
    font-size: 18px;
    line-height: 22px;
    background: hsl(0, 0%, 16%);
    text-align: center;
    border: 1px solid black;
    box-sizing: initial;
    text-shadow: 1px 1px 1px black;
    box-shadow: 3px 3px 15px 2px rgba(0, 0, 0, .4);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    cursor: auto;
    z-index: 3;
}
#wmsx-quick-options.wmsx-show {
    display: block;
}
#wmsx-quick-options::before {
    content: "Quick Options";
    display: block;
}

#wmsx-touch-config {
    display: none;
    position: absolute;
    top: 0; bottom: 0;
    left: 0; right: 0;
    width: 220px;
    height: 212px;
    margin: auto;
    padding: 0 16px;
    color: white;
    font-size: 18px;
    line-height: 22px;
    background: hsl(0, 0%, 16%);
    text-align: center;
    border: 1px solid black;
    box-sizing: border-box;
    text-shadow: 1px 1px 1px black;
    box-shadow: 3px 3px 15px 2px rgba(0, 0, 0, .4);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    cursor: auto;
    z-index: 3;
}
#wmsx-screen-fs.wmsx-touch-config-active #wmsx-touch-config {
    display: block;
}
#wmsx-touch-config::after {
    content: "Tap Control to Setup";
    position: absolute;
    display: block;
    top: 14px;
    left: 0;
    width: 100%;
}
#wmsx-touch-config::before {
    content: "";
    display: block;
    margin-top: 50px;
    height: 76px;
    background: black;
}

#wmsx-touch-config-minus, #wmsx-touch-config-plus {
    position: absolute;
    top: 50px;
    width: 60px;
    height: 76px;
    cursor: pointer;
}
#wmsx-touch-config-minus {
    left: 16px;
}
#wmsx-touch-config-plus {
    right: 16px;
}

#wmsx-touch-config-minus::after, #wmsx-touch-config-plus::after {
    content: "";
    position: absolute;
    top: 26px;
    border: 12px solid transparent;
}
#wmsx-touch-config-minus::after {
    left: 0;
    border-right: 23px solid hsl(0, 0%, 80%);
}
#wmsx-touch-config-minus.wmsx-disabled::after {
    border-right-color: hsl(0, 0%, 40%);
}
#wmsx-touch-config-plus::after {
    right: 0;
    border-left: 23px solid hsl(0, 0%, 80%);
}
#wmsx-touch-config-plus.wmsx-disabled::after {
    border-left-color: hsl(0, 0%, 40%);
}

#wmsx-touch-config-dir {
    display: none;
    position: absolute;
    top: 24px;
    left: 45px;
    transform: scale(.75);
}
#wmsx-touch-config-dir.wmsx-show {
    display: block;
}
#wmsx-touch-config-dir::before {
    display: none;
}

#wmsx-touch-config-button {
    display: none;
    position: absolute;
    top: 54px;
    left: 74px;
    text-shadow: none;
}
#wmsx-touch-config-button.wmsx-show {
    display: block;
}

#wmsx-touch-config .wmsx-quick-options-list {
    margin-top: 11px;
}
#wmsx-touch-config .wmsx-control {
    width: 63px;
}


#wmsx-touch-left, #wmsx-touch-right {
    display: none;
    position: absolute;
    z-index: 1;
}

html.wmsx-full-screen.wmsx-touch-active #wmsx-touch-left, html.wmsx-full-screen.wmsx-touch-active #wmsx-touch-right {
    display: block;
}

.wmsx-touch-dir {
    width: 130px;
    height: 130px;
    color: hsl(0, 0%, 75%);
    border-radius: 100%;
}
.wmsx-touch-dir::before {
    content: "";
    position: absolute;
    top: 14px; left: 14px;
    right: 14px; bottom: 14px;
    border: 1px solid hsl(0, 0%, 26%);
    border-radius: 100%;
}

.wmsx-touch-dir-joy .wmsx-touch-dir-up, .wmsx-touch-dir-joy .wmsx-touch-dir-left {
    position: absolute;
    background: hsl(0, 0%, 31%);
    border-radius: 2px 2px 0 0;
    box-shadow: inset 1px 2px 0px hsl(0, 0%, 43%), inset -1px -1px hsl(0, 0%, 19%), 0 3px 0 1px hsl(0, 0%, 21%);
}
.wmsx-touch-dir-joy .wmsx-touch-dir-up {
    width: 26px;
    height: 78px;
    top: 24px;
    left: 52px;
}
.wmsx-touch-dir-joy .wmsx-touch-dir-left {
    width: 78px;
    height: 25px;
    top: 51px;
    left: 26px;
}
.wmsx-touch-dir-joy .wmsx-touch-dir-left::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 23px;
    width: 33px;
    height: 22px;
    background: inherit;
    z-index: 1;
}
.wmsx-touch-dir-joy .wmsx-touch-dir-left::after {
    content: "";
    position: absolute;
    top: 4px;
    left: 30px;
    height: 17px;
    width: 17px;
    border-radius: 100%;
    box-shadow:  inset 0 0 2px hsl(0, 0%, 22%), inset 1px 2px 3px 1px hsl(0, 0%, 26%), inset -1px -2px 1px hsl(0, 0%, 64%);
    z-index: 2;
}


.wmsx-touch-dir-key .wmsx-touch-dir-up, .wmsx-touch-dir-key .wmsx-touch-dir-left, .wmsx-touch-dir-key .wmsx-touch-dir-down, .wmsx-touch-dir-key .wmsx-touch-dir-right {
    position: absolute;
    background: rgb(70, 85, 180);
    border: 0 solid hsl(232, 44%, 37%);
    border-width: 1px 2px 4px;
    border-top-color: hsl(232, 44%, 40%);
    border-bottom-color: hsl(232, 44%, 24%);
    border-radius: 2px 2px 0 0;
    box-sizing: border-box;
}
.wmsx-touch-dir-key .wmsx-touch-dir-up, .wmsx-touch-dir-key .wmsx-touch-dir-down {
    left: 50px;
    width: 30px;
}
.wmsx-touch-dir-key .wmsx-touch-dir-up {
    top: 26px;
    height: 25px;
    border-bottom-width: 2px;
}
.wmsx-touch-dir-key .wmsx-touch-dir-down {
    bottom: 26px;
    height: 27px;
}
.wmsx-touch-dir-key .wmsx-touch-dir-left, .wmsx-touch-dir-key .wmsx-touch-dir-right {
    top: 47px;
    width: 25px;
    height: 36px;
}
.wmsx-touch-dir-key .wmsx-touch-dir-left {
    left: 24px;
}
.wmsx-touch-dir-key .wmsx-touch-dir-right {
    right: 24px;
}
.wmsx-touch-dir-key .wmsx-touch-dir-up::after {
content: "";
    position: absolute;
    top: 26px;
    left: -1px;
    width: 28px;
    height: 22px;
    background: hsl(0, 0%, 20%);
}

.wmsx-touch-dir .wmsx-arrow-up, .wmsx-touch-dir .wmsx-arrow-down, .wmsx-touch-dir .wmsx-arrow-left, .wmsx-touch-dir .wmsx-arrow-right {
    position: absolute;
    border-width: 5px;
    z-index: 2;
}
.wmsx-touch-dir .wmsx-arrow-up {
    top: 26px;
    left: 60px;
    border-bottom-width: 11px;
}
.wmsx-touch-dir .wmsx-arrow-down {
    bottom: 29px;
    left: 60px;
    border-top-width: 11px;
}
.wmsx-touch-dir .wmsx-arrow-left {
    top: 58px;
    left: 26px;
    border-right-width: 11px;
}
.wmsx-touch-dir .wmsx-arrow-right {
    top: 58px;
    right: 26px;
    border-left-width: 11px;
}

.wmsx-touch-button {
    position: relative;
    display: block;
    width: 72px;
    height: 72px;
    font-size: 20px;
    line-height: 67px;
    color: hsl(0, 0%, 79%);
    border-radius: 100%;
    cursor: default;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    z-index: 0;
}

.wmsx-touch-button::before {
    content: "";
    position: absolute;
    box-sizing: border-box;
    z-index: -1;
}

.wmsx-touch-button-joy::before, .wmsx-touch-button-none::before {
    width: 50px;
    height: 48px;
    top: 9px;
    left: 11px;
    border-radius: 100%;
}
#wmsx-screen-fs.wmsx-touch-config-active .wmsx-touch-button-none::before {
    border: 2px solid hsl(0, 0%, 30%);
}

.wmsx-touch-button-joy.wmsx-touch-button-joy-A::before {
    border: none;
    background: hsl(120, 76%, 32%);
    box-shadow: inset 0 2px hsl(120, 76%, 41%), 0 4px 0 1px hsl(120, 76%, 20%);
}
.wmsx-touch-button-joy.wmsx-touch-button-joy-B::before {
    border: none;
    background: hsl(0, 60%, 37%);
    box-shadow: inset 0 2px hsl(0, 60%, 48%), 0 4px 0 1px hsl(0, 60%, 27%);
}
.wmsx-touch-button-joy.wmsx-touch-button-joy-AB::before {
    border: none;
    background: hsl(240, 50%, 48%);
    box-shadow: inset 0 2px hsl(240, 50%, 60%), 0 4px 0 1px hsl(240, 50%, 31%);
}

.wmsx-touch-button-key {
    font-size: 16px;
    line-height: 69px;
}
.wmsx-touch-button-key::before {
    width: 48px;
    height: 46px;
    top: 13px;
    left: 12px;
    background: hsl(0, 0%, 44%);
    border: 4px solid hsl(0, 0%, 31%);
    border-top: 2px solid hsl(0, 0%, 54%);
    border-bottom: 6px solid hsl(0, 0%, 22%);
    border-radius: 3px 3px 1px 1px;
}

#wmsx-touch-T_A { z-index: 7 }
#wmsx-touch-T_B { z-index: 6 }
#wmsx-touch-T_C { z-index: 5 }
#wmsx-touch-T_D { z-index: 4 }
#wmsx-touch-T_E { z-index: 3 }
#wmsx-touch-T_F { z-index: 2 }
#wmsx-touch-T_G { z-index: 1 }

#wmsx-touch-pause, #wmsx-touch-fast {
    float: left;
    width: 46px;
    height: 48px;
    border-color: hsl(0, 0%, 70%);
}
#wmsx-touch-pause::after, #wmsx-touch-fast::before, #wmsx-touch-fast::after {
    content: "";
    display: inline-block;
    border: 0 solid transparent;
    box-sizing: border-box;
}
#wmsx-touch-pause::after {
    margin-top: 16px;
    width: 14px;
    height: 16px;
    border-width: 0;
    border-left-width: 4px;
    border-left-color: inherit;
    border-right-width: 4px;
    border-right-color: inherit;
}
#wmsx-touch-fast::before, #wmsx-touch-fast::after {
    margin-top: 16px;
    width: 12px;
    height: 16px;
    border-width: 8px;
    border-left-width: 12px;
    border-left-color: inherit;
    border-right-width: 0;
}
#wmsx-touch-speed.wmsx-paused #wmsx-touch-pause::after, #wmsx-touch-speed.wmsx-poweroff #wmsx-touch-pause::after {
    margin-top: 14px;
    width: 17px;
    height: 20px;
    border-width: 10px;
    border-left-width: 17px;
    border-right-width: 0;
}
#wmsx-touch-speed.wmsx-paused  #wmsx-touch-fast::after {
    width: 7px;
    border-width: 0;
    border-left-width: 3px;
}
#wmsx-touch-speed.wmsx-poweroff #wmsx-touch-fast {
    display: none;
}


@media only screen and (orientation: landscape) {    /* Landscape */
    #wmsx-touch-left {
        left: calc(-6px - ` + this.TOUCH_CONTROLS_LEFT_WIDTH + `px);
        bottom: 50%;
        transform: translateY(50%);
    }
    #wmsx-touch-right {
        right: calc(5px - ` + this.TOUCH_CONTROLS_RIGHT_WIDTH + `px);
        bottom: 50%;
        transform: translateY(50%);
    }
    #wmsx-touch-speed {
        position: absolute;
        left: -106px;
        top: 8px;
    }

    /* Adjust centered elements leaving space to the touch controls on both sides */
    html.wmsx-full-screen.wmsx-touch-active #wmsx-screen-fs-center {
        left: ` + this.TOUCH_CONTROLS_LEFT_WIDTH + `px;
        right: ` + this.TOUCH_CONTROLS_RIGHT_WIDTH + `px;
    }
}

@media only screen and (orientation: landscape) and (max-height: 511px) {    /* Medium Landscape */
    #wmsx-touch-T_F, #wmsx-touch-T_G {
        display: none;
    }
}

@media only screen and (orientation: landscape) and (max-height: 359px) {    /* Short Landscape */
    #wmsx-touch-T_E {
        display: none;
    }
}

@media only screen and (orientation: portrait) {    /* Portrait */

    #wmsx-touch-left {
        left: 2px;
        bottom: 182px;
    }
    #wmsx-touch-right {
        right: 5px;
        bottom: 36px;
        width: 112px;
        height: 224px;
    }
    #wmsx-touch-speed {
        position: absolute;
        left: 21px;
        bottom: ` + (this.BAR_HEIGHT + 18) + `px;
    }

    .wmsx-touch-button {
        position: absolute;
    }
    #wmsx-touch-T_A {
        bottom: 75%;
        right: 50%;
    }
    #wmsx-touch-T_B {
        bottom: 100%;
        right: 0%;
    }
    #wmsx-touch-T_C {
        bottom: 50%;
        right: 100%;
    }
    #wmsx-touch-T_D {
        bottom: 25%;
        right: 50%;
    }
    #wmsx-touch-T_E {
        bottom: 50%;
        right: 0%;
    }
    #wmsx-touch-T_F {
        bottom: 0%;
        right: 100%;
    }
    #wmsx-touch-T_G {
        bottom: 0%;
        right: 0%;
    }

    html.wmsx-full-screen.wmsx-virtual-keyboard-active #wmsx-touch-left, html.wmsx-full-screen.wmsx-virtual-keyboard-active #wmsx-touch-right {
        display: none;
    }

}

@media only screen and (orientation: portrait) and (max-device-height: 638px) {    /* Medium Portrait. Like iPhone 5 */

    #wmsx-touch-T_F, #wmsx-touch-T_G {
        display: none;
    }

    #wmsx-touch-left {
        bottom: 154px;
    }
    #wmsx-touch-right {
        bottom: -18px;
    }

}

@media only screen and (orientation: portrait) and (max-device-height: 518px) {    /* Short Portrait. Like iPhone 4 */

    #wmsx-touch-T_E {
        display: none;
    }

    #wmsx-touch-left {
        bottom: 98px;
    }
    #wmsx-touch-right {
        bottom: -74px;
    }

    #wmsx-touch-T_D {
        bottom: 50%;
        right: 0%;
    }
}`;

};
