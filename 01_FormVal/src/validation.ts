enum Validation {
    REQUIRED = "required",
    MIN_LENGTH = "minLength",
    MAX_LENGTH = "maxLength",
    MIN_NUM = "minNum",
    MAX_NUM = "maxNum"
}

type ValidationRule = {
    [validationName in Validation]?: validationName extends Validation.REQUIRED ? boolean : number
 }


function validationSchema<T extends Validation>(value: string, rule: T, ruleVal: ValidationRule[T] ){

    switch(rule){
        case Validation.REQUIRED:
            return {isValid: value.trim() !== "" && ruleVal === true, errorMessage: "Das Feld muss augefüllt werden"} 
        case Validation.MAX_LENGTH:
            return {isValid: value.trim().length <= ruleVal, errorMessage: `Das Feld darf maximal ${ruleVal} Zeichen lang sein`}  
        case Validation.MIN_LENGTH:
            return   {isValid: value.trim().length > ruleVal, errorMessage: `Das Feld muss mindestens ${ruleVal} Zeichen lang sein`}  
        case Validation.MIN_NUM:   
            return   {isValid: +value > ruleVal, errorMessage: `Die Zahl darf nicht kleiner als ${ruleVal} sein.`}
        case Validation.MAX_NUM:   
            return   {isValid: +value < ruleVal, errorMessage: `Die Zahl darf nicht größer als ${ruleVal} sein`}  
        default: 
            throw new Error("Unknown Validation Rule")                      
    }
}




function renderErrorMessage(error: string, target: HTMLInputElement){
    const createError = document.createElement("p");
            createError.innerText = error;
            createError.className = "error-message"
            target.insertAdjacentElement("afterend", createError);
}

function removeError(target: HTMLInputElement){
    const errorMessage = target.nextElementSibling;
    if(errorMessage?.className === "error-message"){
        errorMessage.remove()
    }
}

export function validate(e: Event, validationRules: ValidationRule){
    const target = e.target as HTMLInputElement;
    const value = target.value;
    removeError(target)
    for(let rule in validationRules){
        const ruleName = rule as keyof ValidationRule
        const schema = validationSchema(value, ruleName, validationRules[ruleName])
        if(!schema.isValid){
            renderErrorMessage(schema.errorMessage, target)
            break;
        }
    }
}