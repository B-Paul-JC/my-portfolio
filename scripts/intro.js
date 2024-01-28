const hasVisitedBefore = () =>
    new Boolean(localStorage.getItem("visitor")).valueOf();
const RESET_BUTTON = document.getElementById("reset");

const RESET = () => {
    localStorage.removeItem("visitor");
    document.location.reload();
};

function skipIntro(carryOns) {
    const THE_BUTTON = document.getElementById("hint");

    const intros = [
        document.getElementById("top"),
        document.getElementById("hint"),
    ];
    const main = document.getElementsByTagName("main")[0];

    if (THE_BUTTON) {
        THE_BUTTON.removeEventListener("click", carryOns);

        for (const intro of intros) {
            intro.style.setProperty("z-index", "0");
            intro.style.setProperty("opacity", "0");

            let a = window.setTimeout(() => {
                intro.replaceWith("");
            }, 800);
        }
    }

    main.style.setProperty("clip-path", "circle(300% at 50% 60%)");
    main.style.setProperty("overflow-y", "scroll");

    let a = window.setTimeout(() => {
        main.removeAttribute("class");
    }, 800);
}

function setIntro() {
    const p1 = document.createElement("p");
    const top = document.createElement("div");
    const hint = document.createElement("div");

    const clickHandler = (ev) => {
        localStorage.setItem("visitor", true);

        skipIntro(clickHandler);
    };

    p1.innerHTML =
        "<span>==<br />I'm not sure<br />what goes here,<br />but let's fill<br />this <em>Space</em><br />==</span>";

    top.setAttribute("id", "top");
    top.appendChild(p1);

    hint.setAttribute("id", "hint");
    hint.addEventListener("click", clickHandler);

    document.body.prepend(top, hint);
}

if (hasVisitedBefore()) {
    skipIntro();
} else {
    setIntro();
}
