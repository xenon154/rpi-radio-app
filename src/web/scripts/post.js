function req(type, path) {
    var request = new XMLHttpRequest();
    request.open(type || "GET", "./" + (path || ""), true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            let resp = request.responseText;

            return resp;
        } else {
            // We reached our target server, but it returned an error
            console.error(
                "The server returned an error with a status of " +
                    request.status
            );

            return null;
        }
    };

    request.onerror = function () {
        console.error("Error creating POST request to " + path);
    };

    request.send();
}
