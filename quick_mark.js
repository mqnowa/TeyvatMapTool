var IS_CTRL_PRESSED = false;

function main2() {
    document.addEventListener("keydown", ev => {
        if (ev.key == "Control" && !IS_CTRL_PRESSED) IS_CTRL_PRESSED = true;
    });

    document.addEventListener("keyup", ev => {
        if (ev.key == "Control") IS_CTRL_PRESSED = false;
    });

    document.addEventListener("click", ev => {
        if (IS_CTRL_PRESSED) quick_mark();
    });

    function quick_mark() {
        let id = setInterval(() => {
            let button = document.querySelector(".map-popup__footer > button:nth-child(3)");
            if (button) {
                clearInterval(id);
                let text = button.textContent;
                button.click();
                let id2 = setInterval(() => {
                    let button2 = document.querySelector(".map-popup__footer > button:nth-child(3)");
                    if (!button2) {
                        clearInterval(id2);
                        return;
                    };
                    if (text != button2.textContent) {
                        clearInterval(id2);
                        document.querySelector(".leaflet-popup-close-button").click();
                    }
                }, 100);
            }
        }, 100);
    }
}

function main() {
    if (location.href.startsWith("https://act.hoyolab.com/ys/app/interactive-map")) {
        const id = setInterval(ev => {
            let mapLoading = document.querySelector(".map-loading");
            if (!mapLoading) {
                clearInterval(id);
                main();
            }
        })
    }
}
