"use strict"


var app = new Vue({  
    el: '#app',  
    data: {  
      message: 'CRUD JSON-server with Vue.js',
      name: "",
      age : '',
      users: [],

      error: ""
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
          this.errorMsg("Invalid new user infos!")
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
        .then(res=>{
          console.log(res)
        })
        .catch(err=>{
          throw err;
        })
      },
      Edit(id){
        if(this.name.length && this.age.length){
          fetch(`http://localhost:3000/fam/${id}`, {
            method : "PUT",
            headers: {
              "Content-Type" : "application/json"
            }, 
            body:JSON.stringify({
              name: this.name,
              age: +this.age
            })
          })
          
        }
        else{
          this.errorMsg("Please enter new user informations correctly!")
          console.log("[ INVALID FORM ]")
        }
      },
      /**
       * Displays error message for 5 seconds
       * @param {string} msg 
       */
      errorMsg(msg){
        this.error = msg;

        setTimeout(()=>{
          this.error = "";
        }, 5000)
      }
    },
    created(){
      // Get all users info one app is created
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