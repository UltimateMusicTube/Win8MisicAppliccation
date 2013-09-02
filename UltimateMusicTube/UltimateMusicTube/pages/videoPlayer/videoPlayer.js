// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/videoPlayer/videoPlayer.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {

            CurrentVideo.Set(options.title, options.videoUrl);
            WinJS.Utilities.id("remove-files-button").listen("click", function () {
                Commands.removeSelectionFromPlaylist();
            });

            WinJS.Utilities.id("open-playlist-button").listen("click", function () {

                var openPicker = Windows.Storage.Pickers.FileOpenPicker();
                var applicationData = Windows.Storage.ApplicationData.current;
                var localFolder = applicationData.localFolder;
                openPicker.suggestedStartLocation = localFolder;
                openPicker.fileTypeFilter.append("*");
                openPicker.pickSingleFileAsync().then(FileSystem.loadPlaylist);
            });

            WinJS.Utilities.id("save-playlist-button").listen("click", function () {

                var savePicker = new Windows.Storage.Pickers.FileSavePicker();
                savePicker.defaultFileExtension = ".json";
                savePicker.fileTypeChoices.insert("playlist", [".json"]);
                savePicker.suggestedFileName = "SingTubePlaylist";
                FileSystem.savePlaylist(savePicker);
            });
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in viewState.
        },        
    });
})();
