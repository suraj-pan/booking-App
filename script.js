document.addEventListener("DOMContentLoaded",function(){
    document.getElementById("add-btn").addEventListener("click",function(){

        const name = document.getElementById("name").value;
        const gmail = document.getElementById("gmail").value;
        const number = document.getElementById("number").value;
    
       if(name && gmail && number){
        if(typeof(Storage) !== "undefined" ){
            const obj = {
                name: name,
                gmail:gmail,
                number:number
            }

            let storeData = JSON.parse(localStorage.getItem("Appointment")) || [];
              // Ensure that storedData is an array
              if (!Array.isArray(storeData)) {
                storeData = [];
            }

            storeData.push(obj);
    
            localStorage.setItem("Appointment",JSON.stringify(storeData));
    
            document.getElementById("name").value ="";
            document.getElementById("gmail").value="";
            document.getElementById("number").value="";

            alert("Data added successfully")


            getlist()
        }
       }else{
            alert("please, fill all the inputs")
        }
    })

    function getlist(){
        let list = document.getElementById("list");
        list.innerHTML="";
     
        let storedData = JSON.parse(localStorage.getItem("Appointment"));

        storedData.forEach((element,index) => {
            let li = document.createElement("li");
            li.textContent =`Name :${element.name}, gmail: ${element.gmail},Number: ${element.number}`;
            list.appendChild(li);

            //// delete
            const button = document.createElement("button");
            li.appendChild(button);
            button.textContent = "Delete";
            button.addEventListener("click",function(){
                storedData.splice(index,1);
                localStorage.setItem("Appointment",JSON.stringify(storedData))
               
            })

            // edit button
            const editbutton = document.createElement("button");
            li.appendChild(editbutton);
            editbutton.textContent = "Edit";
            editbutton.addEventListener("click",function(){
                
            document.getElementById("name").value =element.name;
            document.getElementById("gmail").value=element.gmail;
            document.getElementById("number").value=element.number;
            storedData.splice(index,1);
            localStorage.setItem("Appointment",JSON.stringify(storedData));
            getlist()
            })

          
        });

    }
    getlist()
})