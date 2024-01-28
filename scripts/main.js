/**
 *
 * @param {HTMLCollectionOf<HTMLElement>} elements
 */
function setRotation(elements) {
    for (const element of elements) {
        const { scrollHeight } = element;
        const rotationValue = (scrollHeight / scrollHeight) * 360;
        const rotation = `rotateZ(${rotationValue}deg)`;

        element.style.setProperty("transform", rotation);

        console.log({ rotation, rotationValue });
    }
}

const sections = document.getElementsByTagName("section");

window.addEventListener("scroll", (ev) => {
    setRotation(sections);
});
