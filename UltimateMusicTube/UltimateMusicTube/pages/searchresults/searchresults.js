// For an introduction to the Search Contract template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232512

// TODO: Add the following script tag to the start page's head to
// subscribe to search contract events.
//  
// <script src="/pages/searchresults/searchresults.js"></script>
//
// TODO: Edit the manifest to enable use as a search target.  The package 
// manifest could not be automatically updated.  Open the package manifest file
// and ensure that support for activation of searching is enabled.

(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var appModel = Windows.ApplicationModel;
    var appViewState = Windows.UI.ViewManagement.ApplicationViewState;
    var nav = WinJS.Navigation;
    var ui = WinJS.UI;
    var utils = WinJS.Utilities;
    var searchPageURI = "/pages/searchresults/searchresults.html";
    var searchPane = appModel.Search.SearchPane.getForCurrentView();

    searchPane.placeholderText = "Search in YouTube";
    searchPane.showOnKeyboardInput = true;

    ui.Pages.define(searchPageURI, {
        ready: function (element, options) {

            var submitSearchResults = (function () {
                Data.clearSearchResultsModels();
                var searchResultsDisplayCount = 5;
                var searchInput = options.queryText;
                var searchWords = searchInput.split(" ");
                searchWords = searchWords.filter(function (n) { return n });

                var searchUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=";
                for (var i = 0; i < searchWords.length; i++) {
                    searchUrl += searchWords[i].trim() + "+";
                }
                searchUrl.substring(0, searchUrl.length - 2);
                searchUrl += "&category=music&type=video&key=AIzaSyC9M5McfrlS7DmKaldR8Xr0DaqNUPGTh9k";

                WinJS.xhr({
                    url: searchUrl,
                    responseType: "json"
                }).then(function (result) {                   
                    var responseJson = JSON.parse(result.responseText);

                    for (var i = 0; i < searchResultsDisplayCount; i++) {
                        var sourceUrl = "https://www.youtube.com/embed/";

                        //getting the sourceUrl of the video
                        var videoId = responseJson.items[i].id.videoId;
                        sourceUrl += videoId;

                        //getting the title of the video
                        var videoTitle = JSON.stringify(responseJson.items[i].snippet.title);

                        //getting the thumbnailImgUrl of the video
                        var thumbnailImgUrl = responseJson.items[i].snippet.thumbnails.medium.url;

                        //adding the search result
                        ViewModels.addSearchResult(videoTitle, thumbnailImgUrl, sourceUrl);
                    }
                    ViewModels.loadSearchResults();                   
                });

            }());

            //WinJS.Utilities.markSupportedForProcessing(submitSearchResults);

            //WinJS.Binding.processAll(element, ViewModels);
            ViewModels.submitSearchText(submitSearchResults);
        }
    });

    WinJS.Application.addEventListener("activated", function (args) {
        if (args.detail.kind === appModel.Activation.ActivationKind.search) {
            args.setPromise(ui.processAll().then(function () {
                if (!nav.location) {
                    nav.history.current = { location: Application.navigator.home, initialState: {} };
                }

                return nav.navigate(searchPageURI, { queryText: args.detail.queryText });
            }));
        }
    });

    searchPane.onquerysubmitted = function (args) { nav.navigate(searchPageURI, args); };
})();
