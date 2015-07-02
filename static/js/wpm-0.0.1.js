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
        if (http.readyState == 4) {
            console.log(http.status);
            console.log(http.responseText);
        }
    }

    http.open('POST', 'http://httpbin.org/post', true);
    http.setRequestHeader('Content-Type', 'application/json');
    var wp = window.performance

    var perf = { 'nav': {}, 'mem': {}, 'tim': {}, 'entries': [] };
    for (var k in wp.navigation) perf['nav'][k] = wp.navigation[k];
    for (var k in wp.memory) perf['mem'][k] = wp.memory[k];
    for (var k in wp.timing) perf['tim'][k] = wp.timing[k];
    for (var e in wp.getEntries()) {
        for (var k in e) {
            perf['entries'][k] = wp.getEntries();
        }
    }

    console.log(perf);

    http.send(JSON.stringify(perf));
});
