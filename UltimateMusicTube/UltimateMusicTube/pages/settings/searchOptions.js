(function() {
    "use-strict";

    WinJS.UI.Pages.define("/pages/settings/searchOptions.js", {
        ready: function(element, options) {
            var searchNumber = Windows.Storage.ApplicationData.current.roamingSettings.values["search-number"];

            if (defaultsearchNumber === undefined) {
                defaultsearchNumber = 5;
            }

            searchNumber.value = defaultsearchNumber;

            save.onclick = function(e) {
                Windows.Storage.ApplicationData.current.roamingSettings.values["search-number"] = searchNumber.value;

            };
        }
    });
})();
