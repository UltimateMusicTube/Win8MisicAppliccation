(function () {

    var addAndPlay = function (invokeEvent) {
        WinJS.Navigation.navigate("/pages/videoPlayer/videoPlayer.html", {
            indexInComputersList: invokeEvent.detail.itemIndex
        });

        //event.detail.itemPromise.then(function (item) {
        //    console.log(JSON.stringify(item.data));
        //});

        //console.log("Invoked Item Index");
        //console.log(event.detail.itemIndex);
    }

    WinJS.Utilities.markSupportedForProcessing(addAndPlay);
    //WinJS.Utilities.markSupportedForProcessing(showListViewInvokedItem);

    WinJS.Namespace.define("Commands", {
        addAndPlay: addAndPlay
    });
})()