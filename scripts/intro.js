const hasChosenToSkipIntro = () => localStorage.getItem("skip_intro");
const RESET_BUTTON = document.getElementById("reset");

const RESET = () => {
    localStorage.removeItem("visitor");
    document.location.reload();
};

function skipIntro() {
    const intros = [
        document.getElementById("top"),
        document.getElementById("intro-stylesheet"),
    ];
    const main = document.getElementsByTagName("main")[0];

    for (const intro of intros) {
        intro?.style.setProperty("z-index", "0");
        intro?.style.setProperty("opacity", "0");

        let a = window.setTimeout(() => {
            intro?.replaceWith("");
        }, 800);
    }

    main.style.setProperty("clip-path", "circle(300% at 50% 60%)");

    let a = window.setTimeout(() => {
        main.removeAttribute("class");
    }, 800);
}

/**
 *
 * @param {string[]} texts
 * @returns
 */
function typewriter(texts) {
    let i = 0;
    let j = 0;
    let text = texts[j];
    const clack = new Audio("../assets/audio/keyboard.mp3");

    function typewrite() {
        let timing = 100;
        let nextChar = text[i];
        let elem = document.querySelector("div#top p b");
        /**
         * @type {HTMLSpanElement}
         */
        let blinker = document.querySelector("div#top p span");

        if (i == text.length - 1) {
            timing += 500;
        }

        elem.textContent += nextChar;
        clack.play();
        i++;

        if (i < text.length) {
            blinker.style.animationName = "paused";
            let a = setTimeout(() => {
                typewrite();
            }, timing);
        } else {
            text = texts[++j];
            blinker.style.animationName = "blinker";
            clack.pause();
            i = -1;

            if (j < texts.length) {
                let a = setTimeout(() => {
                    typewrite();
                    elem.textContent = "";
                }, timing);
            }
        }
    }

    return typewrite;
}

const greet = typewriter([
    "Hello there!",
    "My name is Paul Bamigboye!",
    "Wanna check out my portfolio??",
    "Let's Explore together!!!",
]);

let a = setInterval(function () {
    if (document.querySelector("div#top p")) {
        setTimeout(greet, 2000);
        clearInterval(a);
    }
}, 50);

function setIntro() {
    const p = document.createElement("p");
    const b = document.createElement("b");
    const top = document.createElement("div");
    const span = document.createElement("span");

    const clickHandler = () => {
        localStorage.setItem("skip_intro", true);
        skipIntro(clickHandler);
    };

    p.appendChild(b);
    p.appendChild(span);

    top.setAttribute("id", "top");
    top.appendChild(p);

    document.body.prepend(top);
}

if (hasChosenToSkipIntro()) {
    skipIntro();
} else {
    setIntro();
}
