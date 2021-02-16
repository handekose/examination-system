export const Call = (callProps)=>{

    let apiUrl = "http://localhost:3001/";
    apiUrl = apiUrl + callProps.endpoint;

    let options = {
        method: callProps.method,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    let accessToken = localStorage.getItem("accessToken");
    if(accessToken){
        options.headers["Authorization"] = "Bearer " + accessToken;
    }

    if(callProps.data){
        options.body = JSON.stringify(callProps.data)
    }

    fetch(apiUrl, options)
        .then(response => {
            if (response.status === 401) {
                throw (new Error('Unauthorized'))
            }
            return response.json();
        })
        .then(data => {
            callProps.success(data);
        })
        .catch(error => {
            callProps.error(error);
        })
}