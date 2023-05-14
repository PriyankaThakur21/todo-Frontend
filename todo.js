function savedata(event){
    event.preventDefault()
    const name=event.target.name.value;
    const des=event.target.description.value;
    const isdone = 'false';
    const obj={name, des, isdone}
    axios.post('https://crudcrud.com/api/029a11f671ad40e3afa48aed0da07647/todo',obj)
    .then((resolve)=>todolist(resolve.data))
    .catch((err)=>console.log(err))
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
function deletedata(todoid){
    axios.delete(`https://crudcrud.com/api/029a11f671ad40e3afa48aed0da07647/todo/${todoid}`)
    .then((resolve)=>removefromtodo(todoid))
    .catch((err)=>console.log(err))
}
function removefromtodo(todoid){
    const parent=document.getElementById('container1')
    const child=document.getElementById(todoid)
    parent.removeChild(child)
}
function addtodone(obj){
    axios.put(`https://crudcrud.com/api/029a11f671ad40e3afa48aed0da07647/todo/${obj._id}`,
    {
        name:`${obj.name}`,
        des:`${obj.des}`,
        isdone:`${(obj.isdone=true)}`
    })
    .then((resolve)=>{
        console.log(resolve);
    })
    .catch((err)=>console.log(err))
    axios.get(`https://crudcrud.com/api/029a11f671ad40e3afa48aed0da07647/todo/${obj._id}`)
        .then((resolve)=>{
            done(obj)
            removefromtodo(obj._id)
        })
        .catch((err)=>console.log(err))
}
function done(object){
    const parent=document.getElementById('container2')
    const list=document.createElement('li')
    list.textContent+=object.name+'->'+object.des+' ';
    parent.appendChild(list)
}
window.addEventListener("DOMContentLoaded", ()=>{
    axios.get('https://crudcrud.com/api/029a11f671ad40e3afa48aed0da07647/todo')
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
