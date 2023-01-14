type Position =  "afterbegin" | "afterend" | "beforebegin" | "beforeend";
export default function renderElement(rootElement: HTMLElement, element: HTMLTemplateElement, position:Position){
    const importNode = document.importNode(element.content, true);
    const elementNode = importNode.firstElementChild;

    if(elementNode){
        rootElement.insertAdjacentElement(position, elementNode)
        return elementNode
    }
    throw new Error()

}

export function renderList(type: "active" | "finished", rootElement: HTMLElement, element: HTMLTemplateElement, position:Position){
    const projectListEl = renderElement(rootElement, element, position);
    projectListEl.id = `${type}-list`
    const listHeading = projectListEl.querySelector("h2") as HTMLElement
    listHeading.innerText = `${type} List`.toUpperCase();
    return projectListEl
}