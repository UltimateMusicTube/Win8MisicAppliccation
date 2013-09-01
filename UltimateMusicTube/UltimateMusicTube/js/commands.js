(function () {
    var multyVideos = [];

    var addAndPlay = function(invokeEvent) {
        WinJS.Navigation.navigate("/pages/videoPlayer/videoPlayer.html", {
            indexInComputersList: invokeEvent.detail.itemIndex,
        })

        //event.detail.itemPromise.then(function (item) {
        //    console.log(JSON.stringify(item.data));
        //});

        //console.log("Invoked Item Index");
        //console.log(event.detail.itemIndex);
    };

    var addToMultyVideos = function (event) {
        //multyVideos = [];
        var triggeringListView = this.winControl;
        triggeringListView.selection.getItems();
        itemIndices = triggeringListView.selection.getIndices();


        for (var i = 0; i < itemIndices.length; i++) {
            multyVideos[i] = itemIndices[i];
        }     
    };

    //var addMultyVideos = function (event) {
    //    WinJS.Navigation.navigate("/pages/videoPlayer/videoPlayer.html", {
    //        indexInMultyVideos: multyVideos,
    //    });
    //};
    //event.detail.itemPromise.then(function (item) {
        //    console.log(JSON.stringify(item.data));
        //});

        //console.log("Invoked Item Index");
        //console.log(event.detail.itemIndex);
    //};


    WinJS.Utilities.markSupportedForProcessing(addAndPlay);
    WinJS.Utilities.markSupportedForProcessing(addToMultyVideos);

    WinJS.Namespace.define("Commands", {
        addAndPlay: addAndPlay,
        addToMultyVideos: addToMultyVideos,
        multyVideos: multyVideos
        //addMultyVideos: addMultyVideos,
    });
})()