/* Automatically generated file. Do not edit directly.
Copyright (C) 2019 Gab AI, Inc.
All Rights Reserved */
var BROWSER_CONFIG={name:"Microsoft Edge",slug:"edge",version:"0.1.4"},BROWSER_CHROME_SLUG="chrome",BROWSER_FIREFOX_SLUG="firefox",BROWSER_EDGE_SLUG="edge",BROWSER_SAFARI_SLUG="safari",BASE_URI="https://dissenter.com/discussion/begin-extension?url=",BACKGROUND_ACTION_OPEN_POPUP="open_popup",BACKGROUND_ACTION_GET_KEY="get_key",BACKGROUND_ACTION_SET_KEY="set_key",COLOR_GAB_GREEN="#21cf7b",STORAGE_BASE="gab_dissenter_extension_data",TWITTER_BUTTONS_ENABLED="twitter_buttons_enabled",REDDIT_BUTTONS_ENABLED="reddit_buttons_enabled",YOUTUBE_BUTTONS_ENABLED="youtube_buttons_enabled",WINDOW_SIDEBAR_UNAVAILABLE_ENABLED="window_sidebar_unavailable_enabled",STORAGE_DEFAULT_PARAMS={};STORAGE_DEFAULT_PARAMS[TWITTER_BUTTONS_ENABLED]=!0,STORAGE_DEFAULT_PARAMS[REDDIT_BUTTONS_ENABLED]=!0,STORAGE_DEFAULT_PARAMS[YOUTUBE_BUTTONS_ENABLED]=!0,STORAGE_DEFAULT_PARAMS[WINDOW_SIDEBAR_UNAVAILABLE_ENABLED]=!0;var STORAGE_KEY_ALL="all",isObject=function(e){return!isArray(e)&&!isDate(e)&&(null!==e&&"object"==typeof e)},isString=function(e){return"string"==typeof e||e instanceof String},isDate=function(e){return!isString(e)&&!isArray(e)&&null!=e&&null!=e&&(e&&"[object Date]"===Object.prototype.toString.call(e)&&!isNaN(e))},isArray=function(e){return Array.isArray(e)};function ready(e){var n=document;"loading"==n.readyState?n.addEventListener("DOMContentLoaded",e):e()}function getQueryStringValue(e){return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]"+encodeURIComponent(e).replace(/[\.\+\*]/g,"\\$&")+"(?:\\=([^&]*))?)?.*$","i"),"$1"))}var Popup=function(){var t=this;t.iframe=document.getElementById("popup-iframe");var i="";t.onPopupOpen=function(e){if(!isObject(e))return!1;var n=e.url||"";if(i===n)return!1;i=n,t.encoded=encodeURIComponent(n),t.commentUrl=BASE_URI+t.encoded,setTimeout(function(){t.iframe.setAttribute("src",t.commentUrl),t.iframe.classList.remove("hidden")},400)},t.init=function(e){if(e&&isString(e))t.onPopupOpen({url:e});else if(BROWSER_CONFIG.slug===BROWSER_SAFARI_SLUG){var n=safari.application.activeBrowserWindow.activeTab;t.onPopupOpen(n),safari.application.addEventListener("popover",function(e){i!==n.url&&safari.extension.popovers[0].contentWindow.location.reload()},!0)}else browser.tabs.query({active:!0,currentWindow:!0},function(e){if(!e||!isArray(e))return!1;var n=e[0];t.onPopupOpen(n)})}};if(BROWSER_CONFIG.slug===BROWSER_SAFARI_SLUG){var popup=new Popup;popup.init()}else document.addEventListener("DOMContentLoaded",function(){var e=getQueryStringValue("url"),n=new Popup;n.init(e),document.getElementById("archive-nav-btn").addEventListener("click",function(){n.iframe.setAttribute("src","http://archive.is/"+n.encoded)}),document.getElementById("dissenter-nav-btn").addEventListener("click",function(){n.iframe.setAttribute("src",n.commentUrl)})});