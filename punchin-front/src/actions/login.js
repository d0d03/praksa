import { backRoute, frontRoute } from '../constants';

function updateOptions(options){
    const update = {...options}
    update.headers = {
        ...update.headers,
        'Content-Type' : 'application/json'
    }
    if(localStorage.token){
        update.headers = {
            ...update.headers,
            Authorization: "Bearer " + localStorage.token
        };
    }
    return update;
}

export default async function fetcher(url,options){
    const response = await fetch(backRoute.concat(url),updateOptions(options));
    if(response.status === 200){
        console.log(response);
        return response.json();
    }else if(response.status === 403){
        localStorage.clear();
        window.location.replace(frontRoute + 'login');
    }else{
        console.log(response);
    }
}