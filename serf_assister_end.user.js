// ==UserScript==
// @name                serf_assister_end
// @namespace           serf_assister
// @description         Hide, remove, replace, rearrange and modify various elements on various sites.
// @version             1.0.0.1
// @homepageURL         https://github.com/sndwrm/serf_assister
// @run-at              document-start
// @match               *
// @noframes
// @run-at              document-end
// @inject-into         page
// @license             WTFPL
// ==/UserScript==

const DEBUG_TYPE = true;//true = log, dumps DOM in html. false = dir, dumps DOM in json.
const DEBUG_MARK = "Serf_assister_end: ";
const DEBUG_ALLOW_MESSAGES = true;
const CURRENT_HOST = window.location.hostname;
const MANAGED_HOSTS = ['www.xvideos.com', 'mail.zoho.com', 'aliexpress.com'];
const SCRIPT_VERSION = "1.0.0.1";
const QUOTES_TYPE = "double";//"SINGLE". Quotes to use when cleaning string.
const CURRENT_WINDOW = unsafeWindow;


console.log(DEBUG_MARK + "Loaded script v." + SCRIPT_VERSION);

function to_decent_string(string_to_clean) {
    // let return_string = "";
    if (typeof string_to_clean !== 'string') {
        try {
            string_to_clean = string_to_clean.toString();
        } catch (e) {
            return "";
        }
    }
    return_string = string_to_clean.toISOString();
    return_string = return_string.replace(/"/g, "\"");
    return_string = return_string.replace(/\\"/g, "\"");
    return_string = return_string.replace(/'/g, "\"");
    return_string = return_string.replace(/[|&;$%@"<>()+,]/g, "");
    return return_string;
}

function debug(message) {
    if (!DEBUG_ALLOW_MESSAGES) return;
    var debug_message = "";
    var message_type = typeof message;
    switch (message_type) {
        case 'string':
            if (message === "") return;
            debug_message = DEBUG_MARK + message;
            break;
        case 'object':
            debug_message = DEBUG_MARK + JSON.parse(JSON.stringify(message));
            break;
        default:
            debug_message = DEBUG_MARK + "Wrong message type = " + message_type;
    }
    if (DEBUG_TYPE) console.log(debug_message);
    else console.dir(debug_message);
}

function host_among_managed(host_url) {
    for (var i = 0; i < MANAGED_HOSTS.length; i++) {
        if (host_url === MANAGED_HOSTS[i]) return true;
    }
    return false;
}

function manage_host(host_url) {
    try {
        switch (host_url) {
            case 'www.xvideos.com':
//   jQuery(document).ready(function($){
//     if (!$('#video-sponsor-links').remove()) alert('falied to remove video-sponsor-links');
//     $('#ad-footer').remove();
//     $('#ad-footer2').remove();
//     $('#footer').remove();
//     if (!$('a').remove('.show-more')) alert('failed to remove show-more button');
//     $('a').remove('.btn.btn-default.menu-login-acct.mobile-hide');
//     $('div').remove('.remove-ads');
//     $('#tabComments').css('display', 'none');
//     $('#tabComments_btn').toggleClass('active');
//     $('#video-tabs').toggleClass('disp-tabComments')
                break;
            case 'mail.zoho.com':
                console.log('Serf_assister_end mark 1');
                var right_menu_bottom_buttons = document.getElementById("jsZmChatBarIcons");
                if (right_menu_bottom_buttons.hasChildNodes()) right_menu_bottom_buttons.removeChild(right_menu_bottom_buttons.childNodes[2]);
                break;
            case 'aliexpress.com':
            //    TODO: remove item: <div class="ui-window ui-window-normal ui-window-transition ui-newuser-layer-dialog" tabindex="-1" data-widget-cid="widget-22" style="width: 680px; height: 440px; z-index: 999; display: block; left: 91.5px; top: 69px;">
            //    and: <div data-widget-cid="widget-0" class="ui-mask" style="position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 999; display: block; opacity: 0.4; background-color: rgb(0, 0, 0);"></div>
            default:
        }
    } catch (e) {
        console.log('Serf_assister_end exception: ' + e.message);
    } finally {

    }
}

CURRENT_WINDOW.document.addEventListener('keydown', function (e) {
    e = e || window.event;
    if (e.keyCode === 13 && e.ctrlKey && !e.shiftKey && !e.altKey) e.stopImmediatePropagation();
}, true);

if (host_among_managed(CURRENT_HOST)) debug('Current host = \"' + CURRENT_HOST + '\" is among managed');
else debug('Current host = \"' + CURRENT_HOST + '\" is NOT among managed, passing...');

debug("HOST URL from extension: " + extension.getURL());
debug("inIncognitoContext: " + extension.inIncognitoContext);
debug("extension.isAllowedFileSchemeAccess: " + extension.isAllowedFileSchemeAccess());
// browser.runtime.sendMessage()
// browser.runtime.onMessage


// For example, here's a content script which listens for click events in the web page. If the click was on a link, it
// messages the background page with the target URL: window.addEventListener("click", notifyExtension);  function
// notifyExtension(e) { if (e.target.tagName != "A") { return; } browser.runtime.sendMessage({"url": e.target.href}); }

// The background script listens for these messages and displays a notification using the notifications API:
// browser.runtime.onMessage.addListener(notify);
//
// function notify(message) {
//     browser.notifications.create({
//         "type": "basic",
//         "iconUrl": browser.extension.getURL("link.png"),
//         "title": "You clicked a link!",
//         "message": message.url
//     });
// }

// If you have multiple content scripts communicating at the same time, you might want to store each connection in an
// array. // background-script.js  var ports = []  function connected(p) { ports[p.sender.tab.id]    = p //... }
// browser.runtime.onConnect.addListener(connected)  browser.browserAction.onClicked.addListener(function() {
// ports.forEach(p => { p.postMessage({greeting: "they clicked the button!"}) }) });


// menus.getTargetElement() - Returns the element for a given targetElementId. Only works in the document where the
// right clicked element is in, so everywhere but in the background page. Syntax let elem =
// browser.menus.getTargetElement(targetElementId); Parameters targetElementId - The property of the menus.OnClickData
// object passed to the menus.onClicked handler or menus.onShown event. Return value - The element referred to by the
// targetElementId parameter. If the targetElementId parameter is not valid, the method returns null. The following
// example uses the getTargetElement method to get the element referred to by the info.targetElementId property and
// then removes it.  browser.menus.create({ title: "Remove element", documentUrlPatterns: ["*://*/*"], contexts:
// ["audio", "editable", "frame", "image", "link", "page", "password", "video"], onclick(info, tab) {
// browser.tabs.executeScript(tab.id, { frameId: info.frameId, code:
// `browser.menus.getTargetElement(${info.targetElementId}).remove();`, }); }, });


// i18n.getMessage() - Gets the localized string for the specified message.
// Syntax
// browser.i18n.getMessage(
//     messageName,  // string
//     substitutions // optional any
// )
// Parameters
// messageName - string. The name of the message, as specified in the messages.json file. If the message can't be found
// in messages.json: Firefox returns "" and logs an error. Chrome returns "" and does not log an error.
// substitutionsOptional - string or array of string. A single substitution string, or an array of substitution
// strings. In Chrome, if you supply more than 9 substitution strings, getMessage() will return undefined. Return value
// string. Message localized for current locale. Examples Get the localized string for "messageContent", with
// target.url substituted:  var message = browser.i18n.getMessage("messageContent", target.url); console.log(message);
// This would work with a _locales/en/messages.json file containing: { "messageContent": { "message": "You clicked
// $URL$.", "description": "Tells the user which link they clicked.", "placeholders": { "url" : { "content" : "$1",
// "example" : "https://developer.mozilla.org" } } } }  If target.url is "https://developer.mozilla.org", then the
// value of message, in the "en" locale, would be: "You clicked https://developer.mozilla.org."



// manage_host(CURRENT_HOST);


// $(document).ready(function () {
//     var vote_cells = document.getElementsByClassName("votecell");
//     alert("vote_cells = " + vote_cells);
//     for (i = 0; i < vote_cells.length; i++) {
//         alert("cur cell child = " + vote_cells[i].getChildByClass('vote'));
//     }
// });
//
//
// xvideos.com##.btn.btn-default.menu-login-acct.mobile-hide


//  When adding events, they are stacking one on another, means you can have more than one
//  click event on same element, so they not overwrite eachother. You must use
//  removeEventListener to first remove previous event and only then assign new one


// @match               *://*/*

// @resource text https://my.cdn.com/some-text.txt

// @run-at - Decide when the script will execute.
// document-end - The script executes when DOMContentLoaded is fired. At this time, the basic HTML of the page is ready
// and other resources like images might still be on the way. document-start - The script executes as soon as possible.
// There is no guarantee for the script to execute before other scripts in the page. Note: in Greasemonkey v3, the
// script may be ensured to execute even before HTML is loaded, but this is impossible for Violentmonkey as a web
// extension. document-idle - The script executes after DOMContentLoaded is fired.

// @inject-into - Decide which context the script will be injected into. If not set in the metadata block, the default
// value page will be used. However, you can change the default value in Violentmonkey settings. page - Inject into
// context of the web page. In this mode, unsafeWindow refers to the window object, allowing the script to access
// JavaScript objects of the web page, just like normal page scripts can. content - Inject into context of content
// scripts. In this mode, unsafeWindow refers to the global object in content script. As a result, the script can
// access and modify the page's DOM, but cannot access JavaScript objects of the web page. auto - Try to inject into
// context of the web page. If blocked by CSP rules, inject as a content script.

// @require             https://code.jquery.com/jquery-3.3.1.slim.min.js

// Values
// GM.deleteValue - Deletes a value from chrome that was previously set.
// GM.getValue - Retrieves stored values, see GM.setValue below.
// GM.listValues - Retrieves an array of stored values' keys.
// GM.setValue - Permanently stores a value under a key, later available via GM.getValue.
// Resources
// GM.getResourceUrl - Provides a URL for loading a @resource, such as an image, into the page.
// Other
// GM.notification - Opens a notification dialog.
// GM.openInTab - Opens a given URL in a new tab.
// GM.setClipboard - Sets the contents of the clipboard.
// GM.xmlHttpRequest - A variant of XMLHttpRequest, this method allows skipping use the same-origin policy, enabling
// complex mashups.