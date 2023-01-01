export const objToQuerystring = (obj) =>
    Object.entries(obj)
    .map((pair) => pair.map(encodeURIComponent).join("="))
    .join("&");

export const querystringToObj = (qstring) => {
    const urlParams = new URLSearchParams(qstring);
    const entries = urlParams.entries();

    return paramsToObject(entries);
};

const paramsToObject = (entries) => {
    let result = {};
    for (let entry of entries) {
        const [key, value] = entry;
        result[key] = value;
    }
    return result;
};

export const getParamFromUrl = (param) =>
    new URLSearchParams(window.location.search).get(param);