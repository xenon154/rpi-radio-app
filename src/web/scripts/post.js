async function req(type, path) {
    let response = await fetch("./" + (path || ""), {
        method: type.toLowerCase() || "get"
    });
    let json = await response.json();
    return json;
}
