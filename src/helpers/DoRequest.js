export const DoRequest = async (url, method, dataToSave = "", files = false) => {

    let loading = true;
    let options = {
        method: method
    };
    if (method === "POST" || method === "PUT") {
        if (files) {
            options = {
                method: method,
                body: dataToSave
            }
        } else {
            options = {
                method: method,
                body: JSON.stringify(dataToSave),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        }
    }
    const request = await fetch(url, options);
    const data = await request.json();
    loading = false;

    return {
        data: data,
        loading: loading
    };
}
