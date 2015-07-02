function addEvent(element, eventName, fn) {
    if (element.addEventListener) {
        element.addEventListener(eventName, fn, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + eventName, fn);
    }
}

addEvent(window, 'load', function() {
    var http = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    http.onreadystatechange = function() {
        //if (http.readyState == 4) {
        //    console.log(http.status);
        //    console.log(http.responseText);
        //}
    }

    http.open('POST', 'http://httpbin.org/post', true);
    http.setRequestHeader('Content-Type', 'application/json');
    var wp = window.performance

    var perf = { 
        'navigation': {}, 
        'memory': {}, 
        'timing': {}, 
        'entries': [], 
        'navigator': {} 
    };

    for (var k in window.navigator) perf['navigator'][k] = window.navigator[k];
    for (var k in wp.navigation) perf['navigation'][k] = wp.navigation[k];
    for (var k in wp.memory) perf['memory'][k] = wp.memory[k];
    for (var k in wp.timing) perf['timing'][k] = wp.timing[k];

    var entries = wp.getEntries();
    for (var i in entries) {
        var entry = {};
        for (var j in entries[i]) {
            entry[j] = entries[i][j];
        }
        perf['entries'][i] = entry;
    }

    var json = JSON.stringify(perf, null, "\t");
    console.log(json);
    http.send(json);
});
