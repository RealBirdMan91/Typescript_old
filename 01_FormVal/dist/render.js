export default function renderElement(rootElement, element, position) {
    var importNode = document.importNode(element.content, true);
    var elementNode = importNode.firstElementChild;
    if (elementNode) {
        rootElement.insertAdjacentElement(position, elementNode);
        return elementNode;
    }
    throw new Error();
}
export function renderList(type, rootElement, element, position) {
    var projectListEl = renderElement(rootElement, element, position);
    projectListEl.id = type + "-list";
    var listHeading = projectListEl.querySelector("h2");
    listHeading.innerText = (type + " List").toUpperCase();
    return projectListEl;
}
