export const Open = (history, page, id) => {

    localStorage.setItem("last", page);
    if (id !== undefined && id !== null)
        localStorage.setItem("pageId", id);
    else
        localStorage.removeItem("pageId");

    history.push(page);
}

export const GetLast = () => {
    return localStorage.getItem("last");
}

export const GetPageId = () => {
    return localStorage.getItem("pageId");
}