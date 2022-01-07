"use strict"


var app = new Vue({  
    el: '#app',  
    data: {  
      message: 'CRUD JSON-server with Vue.js',
      name: "",
      age : '',
      users: []
    },
    methods:{
      Add(){
        if(this.name.length && this.age.length){
          fetch(" http://localhost:3000/fam", {
            method : "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
              name: this.name,
              age: +this.age

            })
          })
          .then(res => res.json())
          .then(body =>{
            console.log(body);
          })
          .catch(err => {
            throw err
          })
        }
        else{
          console.log("[ INVALID FORM ]")
        }
      },
      Delete(id){
        fetch(`http://localhost:3000/fam/${id}`, {
          method : "DELETE",
          headers :{
            "Content-type" : "application/json"
          }
        })
      }
    },
    created(){
      fetch("http://localhost:3000/fam")
        .then(res=>res.json())
        .then(body=>{
          this.users = body;
        })
        .catch(err=>{
          throw err;
        })
    }
})  