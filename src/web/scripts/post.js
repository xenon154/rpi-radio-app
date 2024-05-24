function post(path) {
    var request = new XMLHttpRequest();
    request.open("POST", path, true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            var resp = request.responseText;
        } else {
            // We reached our target server, but it returned an error
        }
    };

    request.onerror = function () {
        console.error("Error creating POST request to " + path);
    };

    request.send();
}
