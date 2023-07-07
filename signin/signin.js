async function signup(event){
    event.preventDefault()
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const obj = {name,email,password};
    console.log(obj)
    try{
    const post=await axios.post('http://localhost:3000/signup',obj);
    alert(post.data);
    location.href='../login/login.html';
    }
    catch(err){
    console.log(err)
    alert(err.response.data);
    }
    // event.target.reset();
}