export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}

export const checkValidity = (value, rules) => {

    let isValid = true;

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
        // jesli regula jest wymagana (nie moze pozostac pusta), to isValid jest true/false w zaleznosci czy input nie jest pusty czy jest
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.minLength && isValid
    }

    return isValid;
}