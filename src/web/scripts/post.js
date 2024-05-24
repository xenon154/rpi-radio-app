function req(type, path) {
    fetch("./" + (path || ""), { method: type.toLowerCase() || "get" })
        .then((response) => response.json())
        .then((json) => {
            return json;
        });
}
