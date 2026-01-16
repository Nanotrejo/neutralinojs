function showInfo() {
    document.getElementById('info').innerHTML = `${NL_APPID} is running on port ${NL_PORT}
        inside ${NL_OS}<br/><br/><span>v${NL_VERSION}</span>`;
}

function openDocs() {
    Neutralino.os.open("https://neutralino.js.org/docs");
}

function openInBrowser() {
    Neutralino.os.open(window.location.href);
}

Neutralino.init();
if(NL_MODE == "window") {
    Neutralino.window.setTitle("Test app"); // This request will be queued and processed when WS connects.
}

// This request will be queued and processed when the extension connects.
Neutralino.extensions.dispatch("js.neutralino.sampleextension", "eventToExtension", "Hello extension!")
    .catch((err) => {
        console.log("Extension isn't loaded!");
    });

Neutralino.events.on("windowClose", () => {
    Neutralino.app.exit();
});

Neutralino.events.on("eventFromExtension", (evt) => {
    console.log(`INFO: Test extension said: ${evt.detail}`);
});

async function zoom(value) {
    const zoom = Number(value) / 100;
    console.log(`Setting zoom to ${zoom}...`);
    Neutralino.window.setZoom(zoom ).then((result) => {
        console.log(`Zoom set to ${value}%. Result: ${JSON.stringify(result, null, 2)}`);
    }, (err) => {
        console.log(`Failed to set zoom: ${JSON.stringify(err, null, 2)}`);
    });
}

async function getZoom() {
    const zoom = await Neutralino.window.getZoom();
    console.log(`Current zoom: ${JSON.stringify(zoom, null, 2)}`);
}

showInfo();
