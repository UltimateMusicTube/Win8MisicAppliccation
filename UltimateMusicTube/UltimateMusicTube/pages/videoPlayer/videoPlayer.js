// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/videoPlayer/videoPlayer.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            var player = document.getElementById("player");
            var arr = Data.getSearchResults();
            ViewModels.addToPlaylist(arr[options.indexInComputersList].title, arr[options.indexInComputersList].thumbnailImgUrl, arr[options.indexInComputersList].sourceUrl);
            ViewModels.loadPlaylist();
            player.src = arr[options.indexInComputersList].sourceUrl;
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in viewState.
        }
    });
})();
