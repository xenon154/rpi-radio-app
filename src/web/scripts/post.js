async function req(type, path) {
    await fetch("./" + (path || ""), { method: type.toLowerCase() || "get" });
    let json = await response.json();
    return json;
}
