export const BASE_URL = "https://auth.nomoreparties.co";

//Метод регистрации 
export const register = (password, email)=>{
    console.log("Это в API перед fetch",email,password)
return fetch(`${BASE_URL}/signup`,{
method: 'POST',
headers: {
    "Content-type": "application/json",
},
body: JSON.stringify({password: password, email: email})
})
.then(checkResponse)
};

//Метод авторизации
export const authorize = (password, email)=>{
    console.log("email,password"+email  +  password)
return fetch(`${BASE_URL}/signin`,{
method: 'POST',
headers: {
    "Content-type": "application/json",
},
body: JSON.stringify({password: password, email: email})
})
.then(checkResponse);
}

//Отправить token на ручку(на эндпоинт) и получить ответ валиден он или нет
export const chekToken = (token)=>{
    console.log("Приход в АPI до fetch", token)
return fetch(`${BASE_URL}/users/me`,{
method: 'GET',
headers: {
    "Content-type": "application/json",
    "Authorization": `Bearer ${token}`,//записываем схему аутентификации токен
},
})
.then(checkResponse);
}


const checkResponse=(res)=> res.ok ? res.json(): Promise.reject(`Ошибка запрос не ушел: ${res.statusText}`)


























/*
export const register = (email, password)=>{
    console.log(email,password)
return fetch(`${BASE_URL}/signup`,{
method: 'POST',
headers: {
    "Content-type": "application/json",
},
body: JSON.stringify({password: password, email: email})
})
.then((response)=>{
    try {
        if (response.status === 200) {
            console.log("response",response)
            return response.json();
        }
    } catch(e){
        return (e)
    }
})
.then((res)=> {
    console.log("response",res)
    return res;
})
.catch((err)=> console.log(err));

}

export const authorize = (email, password)=>{
    console.log(email,password)
return fetch(`${BASE_URL}/signin`,{
method: 'POST',
headers: {
    "Content-type": "application/json",
},
body: JSON.stringify({password: password, email: email})
})
.then((response)=>{
    try {
        if (response.status === 200) {
            console.log("response",response)
            return response.json();
        }
    } catch(e){
        return (e)
    }
})
.then((dataFromServer)=> {
    console.log("response",dataFromServer)
    localStorage.setItem('token', dataFromServer.token)
    /*return res;
})
.catch((err)=> console.log(err));

}

export const aboutMe = (email, password)=>{
    console.log(email,password)
return fetch(`${BASE_URL}/me`,{
method: 'GET',
headers: {
    "Content-type": "application/json",
     "Authorization": `Bearer ${localStorage.getItem('token')}`,//записываем схему аутентификации токен
},
body: JSON.stringify({password: password, email: email})
})
.then((response)=>{
    try {
        if (response.status === 200) {
            console.log("response",response)
            return response.json();
        }
    } catch(e){
        return (e)
    }
})
.then((res)=> {
    console.log("response",res)
    return res;
})
.catch((err)=> console.log(err));

}*/