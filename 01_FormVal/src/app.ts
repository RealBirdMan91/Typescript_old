import renderElement, {renderList} from "./render.js"
import {validate} from "./validation.js"

const templateForm = document.querySelector("#project-input") as HTMLTemplateElement;
const templateList = document.querySelector("#project-list") as HTMLTemplateElement;
const app = document.querySelector("#app") as HTMLDivElement;

const renderedFormEl = renderElement(app, templateForm, "afterbegin") as HTMLFormElement;
const title = renderedFormEl.querySelector("#title") as HTMLInputElement
const description = renderedFormEl.querySelector("#description") as HTMLInputElement
const people = renderedFormEl.querySelector("#people") as HTMLInputElement

const finishedList = renderList("finished", app, templateList, "afterend");
const activeList = renderList("active", app, templateList, "afterend");

console.log(finishedList, activeList)

const validateTitle = {
    required: true,
    minLength: 3,
    maxLength: 15
    }
const validateDescription =  {
    required: true,
    minLength: 10
}
const validatePeople = {
    minNum: 0,
    maxNum: 10
}

function submitHandler(e: Event){
    e.preventDefault();
}

title.addEventListener("focusout", (e) => validate(e, validateTitle))
description.addEventListener("focusout", (e) => validate(e, validateDescription))
people.addEventListener("focusout", (e) => validate(e, validatePeople))
renderedFormEl.addEventListener("submit", submitHandler)




