function req(type, path) {
    var request = new XMLHttpRequest();
    request.open(type || "GET", "./" + (path || ""), true);

    request.onreadystatechange = function () {
        if (request.readyState == XMLHttpRequest.DONE) {
            // Success!
            return request.responseText;
        }
    };

    request.onerror = function () {
        console.error("Error creating POST request to " + path);
    };

    request.send();
}
