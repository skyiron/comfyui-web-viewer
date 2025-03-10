import { app } from "../../scripts/app.js";
import { ComfyWidgets } from "../../scripts/widgets.js";

app.registerExtension({
    name: "vrch.WebViewer",
    async nodeCreated(node) {
        if (node.comfyClass === "VrchWebViewerNode") {
            // Find the existing widgets
            const serverWidget = node.widgets.find(w => w.name === "server");
            const sslWidget = node.widgets.find(w => w.name === "ssl");
            const filenameWidget = node.widgets.find(w => w.name === "filename");
            const pathWidget = node.widgets.find(w => w.name === "path");
            const modeWidget = node.widgets.find(w => w.name === "mode");
            const widthWidget = node.widgets.find(w => w.name === "window_width");
            const heightWidget = node.widgets.find(w => w.name === "window_height");
            const urlWidget = node.widgets.find(w => w.name === "url");
            const showUrlWidget = node.widgets.find(w => w.name === "show_url");

            // Function to update the URL based on stored values
            function updateUrl() {
                // Store the current values in variables
                let server = serverWidget ? serverWidget.value : "127.0.0.1:8188";
                let ssl = sslWidget ? sslWidget.value : false;
                let filename = filenameWidget ? filenameWidget.value : "web_viewer_image.jpeg";
                let path = pathWidget ? pathWidget.value : "web_viewer";
                let mode = modeWidget ? modeWidget.value : "image";
                let scheme = ssl ? "https" : "http";

                const newUrl = `${scheme}://vrch.ai/viewer?mode=${mode}&server=${server}&ssl=${ssl}&file=${filename}&path=${path}`;
                if (urlWidget) {
                    urlWidget.value = newUrl;
                }
            }

            // List of widgets that trigger URL update
            const widgets = [serverWidget, sslWidget, filenameWidget, pathWidget, modeWidget];

            // Add callback listeners to update values and the URL when inputs change
            widgets.forEach(widget => {
                if (widget) {
                    widget.callback = () => {
                        updateUrl();
                    };
                }
            });

            function hideWidget(node, widget) {
                if (widget.type === "hidden")
                    return;
                widget.origType = widget.type;
                widget.origComputeSize = widget.computeSize;
                widget.type = "hidden";
            }
            
            function showWidget(node, widget) {
                widget.type = widget.origType;
                widget.computeSize = widget.origComputeSize;
            }

            if (showUrlWidget) {
                showUrlWidget.callback = (value) => {
                    if (value) {
                        showWidget(node, urlWidget);
                    } else {
                        hideWidget(node, urlWidget);
                    }
                };
            }

            // Create a custom button element
            const button = document.createElement("button");
            button.textContent = "Open Web Viewer";
            button.classList.add("comfy-big-button");
            button.onclick = () => {
                if (urlWidget && urlWidget.value) {
                    const width = widthWidget ? widthWidget.value : 1280;
                    const height = heightWidget ? heightWidget.value : 960;
                    window.open(urlWidget.value, "_blank", `width=${width},height=${height}`);
                } else {
                    console.error("URL widget not found or empty");
                }
            };

            // Add the button to the node using addDOMWidget
            node.addDOMWidget("button_widget", "Open Web Viewer", button);

            // Hide urlWidget initially
            hideWidget(node, urlWidget);

            function init() {
                // update urlWidget visibility
                showUrlWidget.value ? 
                showWidget(node, urlWidget):
                hideWidget(node, urlWidget);
                // update url
                updateUrl();
            }

            // Initialize display after ensuring all widgets are loaded
            function delayedInit() {
                init();
            }
            setTimeout(delayedInit, 1000);
        }
    }
});

app.registerExtension({
    name: "vrch.ImageWebViewer",
    async nodeCreated(node) {
        if (node.comfyClass === "VrchImageWebViewerNode") {
            // Find the existing widgets
            const serverWidget = node.widgets.find(w => w.name === "server");
            const sslWidget = node.widgets.find(w => w.name === "ssl");
            const channelWidget = node.widgets.find(w => w.name === "channel");
            const widthWidget = node.widgets.find(w => w.name === "window_width");
            const heightWidget = node.widgets.find(w => w.name === "window_height");
            const urlWidget = node.widgets.find(w => w.name === "url");
            const showUrlWidget = node.widgets.find(w => w.name === "show_url");

            // Function to update the URL based on stored values
            function updateUrl() {
                // Store the current values in variables
                let server = serverWidget ? serverWidget.value : "127.0.0.1:8188";
                let ssl = sslWidget ? sslWidget.value : false;
                let channel = channelWidget ? channelWidget.value : "1";
                let sslStr = ssl ? "true" : "false";
                let filename = `channel_${channel}.jpeg`;
                let scheme = ssl ? "https" : "http";
                let newUrl = `${scheme}://vrch.ai/viewer?mode=image&server=${server}&ssl=${sslStr}&file=${filename}&path=web_viewer`;
                if (urlWidget) {
                    urlWidget.value = newUrl;
                }
            }

            // List of widgets that trigger URL update
            const widgets = [serverWidget, sslWidget, channelWidget];

            // Add callback listeners to update values and the URL when inputs change
            widgets.forEach(widget => {
                if (widget) {
                    widget.callback = () => {
                        updateUrl();
                    };
                }
            });

            function hideWidget(node, widget) {
                if (widget.type === "hidden")
                    return;
                widget.origType = widget.type;
                widget.origComputeSize = widget.computeSize;
                widget.type = "hidden";
            }

            function showWidget(node, widget) {
                widget.type = widget.origType;
                widget.computeSize = widget.origComputeSize;
            }

            if (showUrlWidget) {
                showUrlWidget.callback = (value) => {
                    if (value) {
                        showWidget(node, urlWidget);
                    } else {
                        hideWidget(node, urlWidget);
                    }
                };
            }

            // Create a custom button element
            const button = document.createElement("button");
            button.textContent = "Open Web Viewer";
            button.classList.add("comfy-big-button");
            button.onclick = () => {
                if (urlWidget && urlWidget.value) {
                    const width = widthWidget ? widthWidget.value : 1280;
                    const height = heightWidget ? heightWidget.value : 960;
                    window.open(urlWidget.value, "_blank", `width=${width},height=${height}`);
                } else {
                    console.error("URL widget not found or empty");
                }
            };

            // Add the button to the node using addDOMWidget
            node.addDOMWidget("button_widget", "Open Web Viewer", button);

            // Hide urlWidget initially
            hideWidget(node, urlWidget);

            function init() {
                // update urlWidget visibility
                if (showUrlWidget) {
                    showUrlWidget.value ? showWidget(node, urlWidget) : hideWidget(node, urlWidget);
                }
                // update url
                updateUrl();
            }

            // Initialize display after ensuring all widgets are loaded
            function delayedInit() {
                init();
            }
            setTimeout(delayedInit, 1000);
        }
    }
});

app.registerExtension({
    name: "vrch.ImageFlipbookWebViewer",
    async nodeCreated(node) {
        if (node.comfyClass === "VrchImageFlipBookWebViewerNode") {
            // Find the existing widgets
            const serverWidget = node.widgets.find(w => w.name === "server");
            const sslWidget = node.widgets.find(w => w.name === "ssl");
            const channelWidget = node.widgets.find(w => w.name === "channel");
            const numberOfImagesWidget = node.widgets.find(w => w.name === "number_of_images");
            const widthWidget = node.widgets.find(w => w.name === "window_width");
            const heightWidget = node.widgets.find(w => w.name === "window_height");
            const urlWidget = node.widgets.find(w => w.name === "url");
            const showUrlWidget = node.widgets.find(w => w.name === "show_url");

            // Function to update the URL based on stored values
            function updateUrl() {
                // Store the current values in variables
                let server = serverWidget ? serverWidget.value : "127.0.0.1:8188";
                let ssl = sslWidget ? sslWidget.value : false;
                let channel = channelWidget ? channelWidget.value : "1";
                let numberOfImages = numberOfImagesWidget ? numberOfImagesWidget.value : "4";
                let sslStr = ssl ? "true" : "false";
                let filename = `channel_${channel}.jpeg`;
                let scheme = ssl ? "https" : "http";
                let newUrl = `${scheme}://vrch.ai/viewer?mode=flipbook&server=${server}&ssl=${sslStr}&file=${filename}&path=web_viewer&numberOfImages=${numberOfImages}`;
                if (urlWidget) {
                    urlWidget.value = newUrl;
                }
            }

            // List of widgets that trigger URL update
            const widgets = [serverWidget, sslWidget, channelWidget, numberOfImagesWidget];

            // Add callback listeners to update values and the URL when inputs change
            widgets.forEach(widget => {
                if (widget) {
                    widget.callback = () => {
                        updateUrl();
                    };
                }
            });

            function hideWidget(node, widget) {
                if (widget.type === "hidden")
                    return;
                widget.origType = widget.type;
                widget.origComputeSize = widget.computeSize;
                widget.type = "hidden";
            }

            function showWidget(node, widget) {
                widget.type = widget.origType;
                widget.computeSize = widget.origComputeSize;
            }

            if (showUrlWidget) {
                showUrlWidget.callback = (value) => {
                    if (value) {
                        showWidget(node, urlWidget);
                    } else {
                        hideWidget(node, urlWidget);
                    }
                };
            }

            // Create a custom button element
            const button = document.createElement("button");
            button.textContent = "Open Web Viewer";
            button.classList.add("comfy-big-button");
            button.onclick = () => {
                if (urlWidget && urlWidget.value) {
                    const width = widthWidget ? widthWidget.value : 1280;
                    const height = heightWidget ? heightWidget.value : 960;
                    window.open(urlWidget.value, "_blank", `width=${width},height=${height}`);
                } else {
                    console.error("URL widget not found or empty");
                }
            };

            // Add the button to the node using addDOMWidget
            node.addDOMWidget("button_widget", "Open Web Viewer", button);

            // Hide urlWidget initially
            hideWidget(node, urlWidget);

            function init() {
                // update urlWidget visibility
                if (showUrlWidget) {
                    showUrlWidget.value ? showWidget(node, urlWidget) : hideWidget(node, urlWidget);
                }
                // update url
                updateUrl();
            }

            // Initialize display after ensuring all widgets are loaded
            function delayedInit() {
                init();
            }
            setTimeout(delayedInit, 1000);
        }
    }
});

app.registerExtension({
    name: "vrch.VideoWebViewer",
    async nodeCreated(node) {
        if (node.comfyClass === "VrchVideoWebViewerNode") {
            // Find the existing widgets
            const serverWidget = node.widgets.find(w => w.name === "server");
            const sslWidget = node.widgets.find(w => w.name === "ssl");
            const channelWidget = node.widgets.find(w => w.name === "channel");
            const widthWidget = node.widgets.find(w => w.name === "window_width");
            const heightWidget = node.widgets.find(w => w.name === "window_height");
            const urlWidget = node.widgets.find(w => w.name === "url");
            const showUrlWidget = node.widgets.find(w => w.name === "show_url");

            // Function to update the URL based on stored values
            function updateUrl() {
                // Store the current values in variables
                let server = serverWidget ? serverWidget.value : "127.0.0.1:8188";
                let ssl = sslWidget ? sslWidget.value : false;
                let channel = channelWidget ? channelWidget.value : "1";
                let sslStr = ssl ? "true" : "false";
                let filename = `channel_${channel}.mp4`;
                let scheme = ssl ? "https" : "http";
                let newUrl = `${scheme}://vrch.ai/viewer?mode=video&server=${server}&ssl=${sslStr}&file=${filename}&path=web_viewer`;
                if (urlWidget) {
                    urlWidget.value = newUrl;
                }
            }

            // List of widgets that trigger URL update
            const widgets = [serverWidget, sslWidget, channelWidget];

            // Add callback listeners to update values and the URL when inputs change
            widgets.forEach(widget => {
                if (widget) {
                    widget.callback = () => {
                        updateUrl();
                    };
                }
            });

            function hideWidget(node, widget) {
                if (widget.type === "hidden")
                    return;
                widget.origType = widget.type;
                widget.origComputeSize = widget.computeSize;
                widget.type = "hidden";
            }

            function showWidget(node, widget) {
                widget.type = widget.origType;
                widget.computeSize = widget.origComputeSize;
            }

            if (showUrlWidget) {
                showUrlWidget.callback = (value) => {
                    if (value) {
                        showWidget(node, urlWidget);
                    } else {
                        hideWidget(node, urlWidget);
                    }
                };
            }

            // Create a custom button element
            const button = document.createElement("button");
            button.textContent = "Open Web Viewer";
            button.classList.add("comfy-big-button");
            button.onclick = () => {
                if (urlWidget && urlWidget.value) {
                    const width = widthWidget ? widthWidget.value : 1280;
                    const height = heightWidget ? heightWidget.value : 960;
                    window.open(urlWidget.value, "_blank", `width=${width},height=${height}`);
                } else {
                    console.error("URL widget not found or empty");
                }
            };

            // Add the button to the node using addDOMWidget
            node.addDOMWidget("button_widget", "Open Web Viewer", button);

            // Hide urlWidget initially
            hideWidget(node, urlWidget);

            function init() {
                // update urlWidget visibility
                if (showUrlWidget) {
                    showUrlWidget.value ? showWidget(node, urlWidget) : hideWidget(node, urlWidget);
                }
                // update url
                updateUrl();
            }

            // Initialize display after ensuring all widgets are loaded
            function delayedInit() {
                init();
            }
            setTimeout(delayedInit, 1000);
        }
    }
});

app.registerExtension({
    name: "vrch.AudioWebViewer",
    async nodeCreated(node) {
        if (node.comfyClass === "VrchAudioWebViewerNode") {
            // Find the existing widgets
            const serverWidget = node.widgets.find(w => w.name === "server");
            const sslWidget = node.widgets.find(w => w.name === "ssl");
            const channelWidget = node.widgets.find(w => w.name === "channel");
            const widthWidget = node.widgets.find(w => w.name === "window_width");
            const heightWidget = node.widgets.find(w => w.name === "window_height");
            const urlWidget = node.widgets.find(w => w.name === "url");
            const showUrlWidget = node.widgets.find(w => w.name === "show_url");

            // Function to update the URL based on stored values
            function updateUrl() {
                // Store the current values in variables
                let server = serverWidget ? serverWidget.value : "127.0.0.1:8188";
                let ssl = sslWidget ? sslWidget.value : false;
                let channel = channelWidget ? channelWidget.value : "1";
                let sslStr = ssl ? "true" : "false";
                let filename = `channel_${channel}.mp3`;
                let scheme = ssl ? "https" : "http";
                let newUrl = `${scheme}://vrch.ai/viewer?mode=audio&server=${server}&ssl=${sslStr}&file=${filename}&path=web_viewer`;
                if (urlWidget) {
                    urlWidget.value = newUrl;
                }
            }

            // List of widgets that trigger URL update
            const widgets = [serverWidget, sslWidget, channelWidget];

            // Add callback listeners to update values and the URL when inputs change
            widgets.forEach(widget => {
                if (widget) {
                    widget.callback = () => {
                        updateUrl();
                    };
                }
            });

            function hideWidget(node, widget) {
                if (widget.type === "hidden")
                    return;
                widget.origType = widget.type;
                widget.origComputeSize = widget.computeSize;
                widget.type = "hidden";
            }

            function showWidget(node, widget) {
                widget.type = widget.origType;
                widget.computeSize = widget.origComputeSize;
            }

            if (showUrlWidget) {
                showUrlWidget.callback = (value) => {
                    if (value) {
                        showWidget(node, urlWidget);
                    } else {
                        hideWidget(node, urlWidget);
                    }
                };
            }

            // Create a custom button element
            const button = document.createElement("button");
            button.textContent = "Open Web Viewer";
            button.classList.add("comfy-big-button");
            button.onclick = () => {
                if (urlWidget && urlWidget.value) {
                    const width = widthWidget ? widthWidget.value : 1280;
                    const height = heightWidget ? heightWidget.value : 960;
                    window.open(urlWidget.value, "_blank", `width=${width},height=${height}`);
                } else {
                    console.error("URL widget not found or empty");
                }
            };

            // Add the button to the node using addDOMWidget
            node.addDOMWidget("button_widget", "Open Web Viewer", button);

            // Hide urlWidget initially
            hideWidget(node, urlWidget);

            function init() {
                // update urlWidget visibility
                if (showUrlWidget) {
                    showUrlWidget.value ? showWidget(node, urlWidget) : hideWidget(node, urlWidget);
                }
                // update url
                updateUrl();
            }

            // Initialize display after ensuring all widgets are loaded
            function delayedInit() {
                init();
            }
            setTimeout(delayedInit, 1000);
        }
    }
});


// Add custom styles for the button
const style = document.createElement("style");
style.textContent = `
    .comfy-big-button {
        background-color: #4CAF50;
        color: white;
        font-size: 16px;
        font-weight: bold;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        text-align: center;
        transition: background-color 0.3s, transform 0.2s;
    }

    .comfy-big-button:hover {
        background-color: #45a049;
        transform: scale(1.05); 
    }

    .comfy-big-button:active {
        background-color: #3e8e41;
        transform: scale(1);
    }
`;
document.head.appendChild(style);