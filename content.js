async function main() {
    wait_map_loading(() => {
        const sw = create_switch("宝箱", toggleChests);
        var sw_offset = 0;
        if (document.querySelector(".mhy-map__underground")) sw_offset += 1;
        if (document.querySelector(".mhy-map__waypoint")) sw_offset += 1;
        add_switch(sw, sw_offset);
        console.log("Teyvat Map Tool Loaded!");
    })
}

/**
 * 
 * @param {function()} func 
 */
async function wait_map_loading(func) {
    const id = setInterval(() => {
        if (!document.querySelector(".map-loading")) {
            clearInterval(id);
            func();
        }
    }, 500);
}

async function wait_3sec() {
    setTimeout(() => {
        return;
    }, 3000);
}

function toggleChests() {
    const chests = [document.querySelector(".filter-item[title=\"普通の宝箱\"]"),
                    document.querySelector(".filter-item[title=\"精巧な宝箱\"]"),
                    document.querySelector(".filter-item[title=\"貴重な宝箱\"]"),
                    document.querySelector(".filter-item[title=\"豪華な宝箱\"]"),
                    document.querySelector(".filter-item[title=\"珍奇な宝箱\"]")];
    if (chests[0].classList.contains("filter-item--selected")) {
        chests.forEach(chest => {
            if (chest != null && chest.classList.contains("filter-item--selected")) {
                chest.click();
            }
        });
    } else {
        chests.forEach(chest => {
            if (chest != null && !chest.classList.contains("filter-item--selected")) {
                chest.click();
            }
        });
    }
}

/**
 * 
 * @param {string} switchName 
 * @param {function()} func
 */
function create_switch(switchName, func) {
    const waypoint_switch = Object.assign(document.createElement("div"), {className: "waypoint-switch mhy-map__waypoint"});
    waypoint_switch.appendChild(Object.assign(document.createElement("div"), {className: "waypoint-switch__text", textContent: switchName}));
    waypoint_switch.appendChild(Object.assign(document.createElement("div"), {className: "waypoint-switch__pic"}));

    waypoint_switch.addEventListener("click", ev => {
        ev.preventDefault();
        if (ev.button == 0) {
            func();
            waypoint_switch.querySelector(".waypoint-switch__pic").classList.toggle("waypoint-switch__pic--active");
        }
    })
    
    return waypoint_switch;
}

/**
 * 
 * @param {HTMLDivElement} switchElement 
 * @param {Number} offset 
 */
function add_switch(switchElement, offset) {
    const gis = document.querySelector(".mhy-game-gis");
    switchElement.style.transform = "translate(0, -" + (offset * 80).toString() + "px)";
    gis.appendChild(switchElement);
}

main();