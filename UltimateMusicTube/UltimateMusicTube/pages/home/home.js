(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            var searchNumber = Windows.Storage.ApplicationData.current.roamingSettings.values["search-number"];
            if (searchNumber === undefined) {
                searchNumber = 5;
            }
            ///
            //if (options && options.queryText) {
            //    tagName = options.queryText
            //}

            //var searchPane = Windows.ApplicationModel.Search.SearchPane.getForCurrentView();
            //searchPane.onquerysubmitted = function(e) {
            //    search(e.queryText);
            //};

            //var dtm = Windows.ApplicationModel.DataTransfer.DataTransferManager.getForCurrentView();
        }
    });
})();
