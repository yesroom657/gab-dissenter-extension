/**
 * @description - Popup
 * @return function
 */
var Popup = function() {

    var scope = this;

    //Elements
    scope.iframe = document.getElementById('popup-iframe');

    var currentActiveUrl = '';

    //Global functions

    /**
     * @description - On Popup open
     * @function scope.init
     * @param  {Object} activeTab - Active tab object
     * @param  {String} activeTab.url - Active tab title
     */
    scope.onPopupOpen = function(activeTab) {
        //Must be object
        if (!isObject(activeTab)) return false;

        //Get url
        var url = activeTab['url'] || '';

        //If same as currently active, don't reload
        if (currentActiveUrl === url) return false;
        //Set currently active if different
        currentActiveUrl = url;

        //Encode current tab url along with base dissenter.com url
        scope.encoded = encodeURIComponent(url);
        scope.commentUrl = BASE_URI + scope.encoded;

        //Show iframe after delay
        setTimeout(function() {
            //Set src, make visible
            scope.iframe.setAttribute('src', scope.commentUrl);
            scope.iframe.classList.remove('hidden');
        }, 400);
    };

    /**
     * @description - Init popup on open
     * @param {string|null} url
     * @function scope.init
     */
    scope.init = function(url) {
        //Check if url exists
        if (url && isString(url)) {
            //Open popup now
            scope.onPopupOpen({'url': url});

            //Don't continue
            return;
        }

        if (BROWSER_CONFIG.slug === BROWSER_SAFARI_SLUG) {
           var activeWindow = safari.application.activeBrowserWindow;
           var activeTab = activeWindow.activeTab;

           scope.onPopupOpen(activeTab);

           /**
            * @description - Event listener for popover
            */
           safari.application.addEventListener("popover", function(event) {
               //Check if currentActiveUrl is not the page we're on. If not, reload popover
               if (currentActiveUrl !== activeTab['url']) {
                   safari.extension.popovers[0].contentWindow.location.reload();
               }
           }, true);
       }
       else {
            //On popup open, get current tab
            __BROWSER__.tabs.query({
                active: true,
                currentWindow: true
            }, function(tabs) {
                if (!tabs || !isArray(tabs)) return false;

                var activeTab = tabs[0];

                scope.onPopupOpen(activeTab);
            });
        }
    };
};

if (BROWSER_CONFIG.slug === BROWSER_SAFARI_SLUG) {
    //Init popup on load for Safari
    var popup = new Popup();
    popup.init();
}
else {
    /**
     * @description - On popup load
     */
// 
    document.addEventListener('DOMContentLoaded', function() {
        //Check if there's an incoming query string for the url
        //E.g. from content scripts, using a popup window
        var url = getQueryStringValue('url');
        var popup = new Popup();
        popup.init(url);
	   
	     document.getElementById("archive-nav-btn").addEventListener("click", function(){
	        popup.iframe.setAttribute('src','http://archive.is/' + popup.encoded);

	     });

	     document.getElementById("dissenter-nav-btn").addEventListener("click", function(){
	        popup.iframe.setAttribute('src', popup.commentUrl);
	     });
        //Create and init Popup
    });
}
