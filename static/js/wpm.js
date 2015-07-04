'use strict';

// TODO capture errors here and notify server - self monitor with try-catch
// TODO read api-key and post to unique URL

// Function to attach event
function addEvent(element, eventName, fn) {
    if (element.addEventListener) {
        element.addEventListener(eventName, fn, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + eventName, fn);
    }
}

// Cache and map all information. The function return the index.
var allData = [];
function mapData(data) {
    var i = allData.indexOf(data);
    if (i == -1) i = allData.push(data) - 1;
    return i;
}

// Filter timing object keeping only relevant information and deduplicating values
function filter(obj) {
    var hash = {};
    for (var key in obj) {
        var val = obj[key];
        if (val === 0) continue;
        var mk = mapData(key);

        switch (typeof(val)) {
            case 'undefined':
            case 'function':
            case 'object':
            case 'symbol':
                continue;
            default:
                hash[mk] = mapData(val);
        }
    }
    return hash;
}

// Only add event if performance timing is present
// caniuse.com/#feat=nav-timing
if ('performance' in window) {
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
    
        var wpe = window.performance.getEntries();
        var entries = [];
        for (var i=0; i<wpe.length; i++) {
            entries[i] = filter(wpe[i]);
        }
    
        var data = {};
        data['t'] = filter(window.performance.timing);
        data['e'] = entries;
        data['a'] = allData;

        var json = JSON.stringify(data);
        http.send(json);
    });
}
