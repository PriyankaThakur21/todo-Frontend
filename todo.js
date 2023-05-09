function savedata(event){
    event.preventDefault()
    const name=event.target.name.value;
    const des=event.target.description.value;
    const isdone=false;
    const obj={name, des, isdone}
    axios.post('https://crudcrud.com/api/0417d4ce50924a9c8e8de64bc927d28b/todo',obj)
    .then((resolve)=>showonscreen(resolve.data))
    .catch((err)=>console.log(err))
    event.target.reset();
}
function showonscreen(obj){
    const parent=document.getElementById('container1')
    const list=document.createElement('li')
    list.id=obj._id
    list.textContent+=obj.name+'->'+obj.des+' ';
    const btn1=document.createElement('button')
    btn1.innerHTML='<i class = "fa fa-check"></i>'
    btn1.style.margin='20px'
    btn1.onclick=function(){addtodone(obj), deletedata(obj._id)}
    const btn2=document.createElement('button')
    btn2.innerHTML='<i class = "fa fa-times"></i>'
    btn2.onclick=function(){deletedata(obj._id)}
    list.appendChild(btn1)
    list.appendChild(btn2)
    parent.appendChild(list)
}
function deletedata(todoid){
    axios.delete(`https://crudcrud.com/api/0417d4ce50924a9c8e8de64bc927d28b/todo/${todoid}`)
    .then((resolve)=>removefromscreen(todoid))
    .catch((err)=>console.log(err))
}
function removefromscreen(todoid){
    const parent=document.getElementById('container1')
    const child=document.getElementById(todoid)
    parent.removeChild(child)
}
function addtodone(obj){
    axios.get(`https://crudcrud.com/api/0417d4ce50924a9c8e8de64bc927d28b/todo/${obj._id}`)
        .then((resolve)=>{
            done(obj)
        })
        .catch((err)=>console.log(err))
}

function done(object){
    const parent=document.getElementById('container2')
    const list=document.createElement('li')
    list.id=object._id
    list.textContent+=object.name+'->'+object.des+' ';
    parent.appendChild(list)
    const name=object.name;
    const des=object.des;
    const isdone=true;
    const obj2={name, des, isdone}
    axios.post('https://crudcrud.com/api/0417d4ce50924a9c8e8de64bc927d28b/todo',obj2)
    .then((resolve)=>console.log('added'))
    .catch((err)=>console.log(err))
}
