// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/videoPlayer/videoPlayer.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            if (options.indexInComputersList != undefined) {


                var player = document.getElementById("player");
                var arr = Data.getSearchResults();

                //if (options.indexInMultyVideos.length >= 1) {
                //if (options.indexInComputersList == undefined) {
                //    for (var i = 0; i < options.indexInMultyVideos.length; i++) {
                //        ViewModels.addToPlaylist(arr[options.indexInMultyVideos[i]].title, arr[options.indexInMultyVideos[i]].thumbnailImgUrl, arr[options.indexInMultyVideos[i]].sourceUrl);
                //        ViewModels.loadPlaylist();
                //    }

                //    player.src = arr[options.indexInMultyVideos[0]].sourceUrl;
                //} else {
                ViewModels.addToPlaylist(arr[options.indexInComputersList].title, arr[options.indexInComputersList].thumbnailImgUrl, arr[options.indexInComputersList].sourceUrl);
                ViewModels.loadPlaylist();
                Lyrics.getSongLyrics(arr[options.indexInComputersList].title);
                player.src = arr[options.indexInComputersList].sourceUrl;

                //}
                //}
            }
           
            //ViewModels.addToPlaylist(arr[options.indexInComputersList].title, arr[options.indexInComputersList].thumbnailImgUrl, arr[options.indexInComputersList].sourceUrl);
            //ViewModels.loadPlaylist();
            //player.src = arr[options.indexInComputersList].sourceUrl;
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
