import renderElement, { renderList } from "./render.js";
import { validate } from "./validation.js";
var templateForm = document.querySelector("#project-input");
var templateList = document.querySelector("#project-list");
var app = document.querySelector("#app");
var renderedFormEl = renderElement(app, templateForm, "afterbegin");
var title = renderedFormEl.querySelector("#title");
var description = renderedFormEl.querySelector("#description");
var people = renderedFormEl.querySelector("#people");
var finishedList = renderList("finished", app, templateList, "afterend");
var activeList = renderList("active", app, templateList, "afterend");
console.log(finishedList, activeList);
var validateTitle = {
    required: true,
    minLength: 3,
    maxLength: 15
};
var validateDescription = {
    required: true,
    minLength: 10
};
var validatePeople = {
    minNum: 0,
    maxNum: 10
};
function submitHandler(e) {
    e.preventDefault();
}
title.addEventListener("focusout", function (e) { return validate(e, validateTitle); });
description.addEventListener("focusout", function (e) { return validate(e, validateDescription); });
people.addEventListener("focusout", function (e) { return validate(e, validatePeople); });
renderedFormEl.addEventListener("submit", submitHandler);
