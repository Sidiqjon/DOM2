const BASE_URL = "https://dummyjson.com"

export async function fetchData(endpoint, callback, closeLoading){
    try{
        const response = await fetch(`${BASE_URL}/${endpoint}`)
        const data = await response.json()
        callback(data)
    }catch(err){
        console.log(err)
    }
    finally {
        if (typeof closeLoading === "function") {
            closeLoading();
        }
    }
}
