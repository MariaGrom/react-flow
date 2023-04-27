BASE_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=5'

import { get } from 'axios';

function getData (){
    get('https://jsonplaceholder.typicode.com/posts?_limit=5')
    .then(function(response){
        console.log(response);
    })
    .catch (function(error){
        console.log(error)
    })
} 

getData()