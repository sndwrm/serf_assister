// ==UserScript==
// @name        serf_assister_end
// @namespace   Anonymous
// @description Hide, remove, replace, rearrange and modify various elements on various sites.
// @version     1
// @include *
// @require https://code.jquery.com/jquery-3.3.1.slim.min.js
// @license WTFPL
// ==/UserScript==

const DEBUG_TYPE = true;//true = log, dumps DOM in html. false = dir, dumps DOM in json.
const DEBUG_MARK = "Serf_assister_end: ";
const DEBUG_ALLOW_MESSAGES = true;
const CURRENT_HOST = window.location.hostname;
const MANAGED_HOSTS = ['www.xvideos.com', 'mail.zoho.com', 'aliexpress.com'];
const SCRIPT_VERSION = "1.0.0.1";
const QUOTES_TYPE = "double";//"SINGLE". Quotes to use when cleaning string.

console.log(DEBUG_MARK + "Loaded script v." + SCRIPT_VERSION);

function to_decent_string(string_to_clean) {
    let return_string = "";
    if (typeof string_to_clean != 'string') {
        try {
            string_to_clean = string_to_clean.toString();
        } catch (e) {
            return_string = "";
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
        if (host_url == MANAGED_HOSTS[i]) return true;
    }
    return false;
}

function manage_host(host_url) {
    try {
        switch (CURRENT_HOST) {
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

if (host_among_managed(CURRENT_HOST)) debug('Current host = \"' + CURRENT_HOST + '\" is among managed');
else debug('Current host = \"' + CURRENT_HOST + '\" is NOT among managed, passing...');

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