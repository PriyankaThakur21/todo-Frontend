async function login(event){
    event.preventDefault()
    const email = event.target.email.value;
    const password = event.target.password.value;
    const obj = {email, password};
    try{
    const post=await axios.post('http://localhost:3000/login',obj);
    console.log(post.data)
    alert(post.data.message);
    location.href='../todo/todo.html';
    localStorage.setItem('token', post.data.token)
    }
    catch(err){
    console.log(err)
    alert(err.response.data);
    }
    event.target.reset();
}