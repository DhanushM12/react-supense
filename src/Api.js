import axios from 'axios';
export const fetchData = () => {
    const userPromise = fetchUsers();
    const postPromise = fetchPosts();

    return{
        user: wrapPromise(userPromise),
        posts: wrapPromise(postPromise)
    }
}

const wrapPromise = (promise) => {
    //set initial status
    let status ='pending';
    //store result
    let result;
    //wait promise
    let suspender = promise.then(
        res=> {
            status= 'success';
            result=res;
        },
        err=> {
            status='error';
            result=err;
        }
    );
    return{
        read(){
            if(status === 'pending')
            {
                throw suspender;
            }
            else if(status === 'error'){
                throw result;
            }
            else if(status === 'success')
            {
                return result;
            }
        }
    }
}
const fetchUsers = () => {
    console.log('Fetching users .....');
    return axios.get('https://jsonplaceholder.typicode.com/users/1')
    .then(res => res.data)
    .catch(err => console.log(err));
}

const fetchPosts = () => {
    console.log('Fetching posts....');
    return axios.get('https://jsonplaceholder.typicode.com/posts').then(res => res.data)
    .catch(err => console.log(err));

}