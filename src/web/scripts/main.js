const socket = io();

setInterval(() => {
    updateList();
}, 1000);

export { socket };