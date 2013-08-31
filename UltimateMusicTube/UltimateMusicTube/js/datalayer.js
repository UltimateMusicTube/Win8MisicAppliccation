(function () {

    var searchResultModels = [];

    var clearSearchResultsModels = function () {
        searchResultModels = [];
    }

    var getSearchResults = function () {
        return searchResultModels;
    }

    var addSearchResult = function (searchResultModel) {
        searchResultModels.push(searchResultModel);
    }

    WinJS.Namespace.define("Data", {
        getSearchResults: getSearchResults,
        addSearchResult: addSearchResult,
        clearSearchResultsModels: clearSearchResultsModels
    });
})()