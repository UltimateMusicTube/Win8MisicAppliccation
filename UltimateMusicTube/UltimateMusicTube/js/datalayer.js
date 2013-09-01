﻿(function () {
    var searchResultModels = [];
    var playlistModels = [];

    var clearSearchResultsModels = function () {
        searchResultModels = [];
    }

    var getSearchResults = function () {
        return searchResultModels;
    }

    var addSearchResult = function (searchResultModel) {
        searchResultModels.push(searchResultModel);
    }


    var getPlaylistResults = function () {
        return playlistModels;
    }   

    var addToPlaylist = function (playlistModel) {
        playlistModels.push(playlistModel);
    }

    var deleteFromPlaylist = function (itemIndex) {
        playlistModels.splice(itemIndex, 1);
    }

    WinJS.Namespace.define("Data", {        
        getSearchResults: getSearchResults,
        addSearchResult: addSearchResult,
        clearSearchResultsModels: clearSearchResultsModels,
        getPlaylistResults: getPlaylistResults,
        addToPlaylist: addToPlaylist,
        deleteFromPlaylist: deleteFromPlaylist
    });
})()