var Validation;
(function (Validation) {
    Validation["REQUIRED"] = "required";
    Validation["MIN_LENGTH"] = "minLength";
    Validation["MAX_LENGTH"] = "maxLength";
    Validation["MIN_NUM"] = "minNum";
    Validation["MAX_NUM"] = "maxNum";
})(Validation || (Validation = {}));
function validationSchema(value, rule, ruleVal) {
    switch (rule) {
        case Validation.REQUIRED:
            return { isValid: value.trim() !== "" && ruleVal === true, errorMessage: "Das Feld muss augefüllt werden" };
        case Validation.MAX_LENGTH:
            return { isValid: value.trim().length <= ruleVal, errorMessage: "Das Feld darf maximal " + ruleVal + " Zeichen lang sein" };
        case Validation.MIN_LENGTH:
            return { isValid: value.trim().length > ruleVal, errorMessage: "Das Feld muss mindestens " + ruleVal + " Zeichen lang sein" };
        case Validation.MIN_NUM:
            return { isValid: +value > ruleVal, errorMessage: "Die Zahl darf nicht kleiner als " + ruleVal + " sein." };
        case Validation.MAX_NUM:
            return { isValid: +value < ruleVal, errorMessage: "Die Zahl darf nicht gr\u00F6\u00DFer als " + ruleVal + " sein" };
        default:
            throw new Error("Unknown Validation Rule");
    }
}
function renderErrorMessage(error, target) {
    var createError = document.createElement("p");
    createError.innerText = error;
    createError.className = "error-message";
    target.insertAdjacentElement("afterend", createError);
}
function removeError(target) {
    var errorMessage = target.nextElementSibling;
    if ((errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.className) === "error-message") {
        errorMessage.remove();
    }
}
export function validate(e, validationRules) {
    var target = e.target;
    var value = target.value;
    removeError(target);
    for (var rule in validationRules) {
        var ruleName = rule;
        var schema = validationSchema(value, ruleName, validationRules[ruleName]);
        if (!schema.isValid) {
            renderErrorMessage(schema.errorMessage, target);
            break;
        }
    }
}
