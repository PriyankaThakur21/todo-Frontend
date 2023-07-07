async function savedata(event){
    event.preventDefault()
    const name=event.target.name.value;
    const des=event.target.description.value;
    const isdone = 'false';
    const obj={name, des, isdone};
    try{
    const post=await axios.post('http://localhost:3000/addtodo',obj)
    todolist(post.data);
    }
    catch(err){
    console.log(err)
    }
    event.target.reset();
}
    function todolist(obj){
    const parent=document.getElementById('container1')
    const list=document.createElement('li')
    list.id=obj._id
    list.textContent+=obj.name+'->'+obj.des+' ';
    const btn1=document.createElement('button')
    btn1.innerHTML='<i class = "fa fa-check"></i>'
    btn1.style.margin='20px'
    btn1.onclick=function(){addtodone(obj)}
    const btn2=document.createElement('button')
    btn2.innerHTML='<i class = "fa fa-times"></i>'
    btn2.onclick=function(){deletedata(obj._id)}
    list.appendChild(btn1)
    list.appendChild(btn2)
    parent.appendChild(list)
}
async function deletedata(todoid){
    try{
    const dltdata=await axios.delete(`http://localhost:3000/addtodo/${todoid}`);
    console.log(dltdata)
    removefromtodo(todoid);
    }
    catch(err){
        console.log(err);
    }
}
function removefromtodo(todoid){
    const parent=document.getElementById('container1')
    const child=document.getElementById(todoid)
    parent.removeChild(child)
}
// async function addtodone(obj){
//     try{
//     const a=await axios.put(`https://crudcrud.com/api/276bdb7d535b433a9f605648236d180d/todo/${obj._id}`,
//     {
//         name:`${obj.name}`,
//         des:`${obj.des}`,
//         isdone:`${(obj.isdone=true)}`
//     })
//     }
//     catch(err){
//     console.log(err);
//     }
//     try{
//     const b=await axios.get(`https://crudcrud.com/api/276bdb7d535b433a9f605648236d180d/todo/${obj._id}`)
//             done(obj)
//             removefromtodo(obj._id)
//         }
//         catch{
//         console.log(err)
//         }
// }
function done(object){
    const parent=document.getElementById('container2')
    const list=document.createElement('li')
    list.textContent+=object.name+'->'+object.des+' ';
    parent.appendChild(list)
}
window.addEventListener("DOMContentLoaded", ()=>{
    axios.get('http://localhost:3000/gettodo')
    .then((resolve)=>{
        for(let i=0; i<resolve.data.length; i++){
            if(resolve.data[i].isdone==='true'){
                done(resolve.data[i])
            }
            else{
                todolist(resolve.data[i])
            }
        }
    })
    .catch((err)=>{console.log(err)})
})
