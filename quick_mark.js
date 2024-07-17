var IS_CTRL_PRESSED = false;
var ONE_TIME_FLAG = true;

function main2() {
    document.addEventListener("keydown", ev => {
        if (ev.key == "Control" && !IS_CTRL_PRESSED) IS_CTRL_PRESSED = true;
    });

    document.addEventListener("keyup", ev => {
        if (ev.key == "Control") {
            IS_CTRL_PRESSED = false;
        };
    });

    document.addEventListener("click", ev => {
        console.log(ev.element)
        if (IS_CTRL_PRESSED) {
            quick_mark();
        };
    });

    function quick_mark() {
        if (!ONE_TIME_FLAG) return;
        ONE_TIME_FLAG = false;
        var one_time_flag = false;
        var i = 100;
        const interval1 = setInterval(() => {
            i--;
            if (one_time_flag) {
                clearInterval(interval1);
                return;
            }
            if (i < 0) {
                ONE_TIME_FLAG = true;
                clearInterval(interval1);
                return;
            }
            console.log("check popup. " + one_time_flag);
            const button = document.querySelector(".map-popup__footer > button:nth-child(3)");
            if (button) {
                console.log("find popup!");
                one_time_flag = true;
                clearInterval(interval1);
                button.click();
                let buttonText = button.textContent;
                const interval2 = setInterval(() => {
                    console.log("check close button.");
                    const button = document.querySelector(".map-popup__footer > button:nth-child(3)");
                    if (!button) {
                        clearInterval(interval2);
                        return;
                    }
                    if (button.textContent != buttonText) {
                        clearInterval(interval2);
                        console.log("find close button!");
                        document.querySelector(".leaflet-popup-close-button").click();
                        ONE_TIME_FLAG = true;
                    }
                }, 50)
            }
        }, 50);
    }

    console.log("'teyvat map quick mark' loaded!");
}

function main() {
    if (location.href.startsWith("https://act.hoyolab.com/ys/app/interactive-map")) {
        console.log("'teyvat map quick mark' loading......");
        const id = setInterval(ev => {
            let mapLoading = document.querySelector(".map-loading");
            if (!mapLoading) {
                clearInterval(id);
                main2();
            }
        })
    }
}

main();