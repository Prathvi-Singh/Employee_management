const express=require('express')
const app=express();
const port=process.env.Port || 8000;
const path=require('path');
const ejs=require('hbs');
// const hbs=require('ejs');
const path_to_view=path.join(__dirname,"../template/views");
const Register=require('./models/register');
const { getEnabledCategories } = require('trace_events');
require('./db/conn');

app.use(express.json())
app.use(express.urlencoded({extended:false}));



require('./db/conn');
app.set("view engine" ,'ejs');
app.set("views",path_to_view);



const Employee=[
  
  {
   c:1,
   name: "prathvi",
   email:"singhprathvi@gmail.com",

     password:12345678 ,
     contact: 6397776826,
     Department: "CSE",
     DateOfJoin: "27sep2022",
     isAdmin:false,
  }


]

app.get('/prathvi',(req,res)=>{
    res.render('home.ejs',{data:Employee});
})


app.post('/prathvi',async(req,res)=>{
    
    try{
        console.log(req.body)
       const a=req.body.email;
       const b=req.body.password;
       console.log(a);
       console.log(b);
     
        const registerEmployee=new Register({
        email:a,
        password:b,
        name: req.body.name,
        contact : req.body.contact,
        Department : req.body.Department,
        DateOfJoin : req.body.DateOfJoin,
        iSAdmin : true,
  
      


     })



       const registered=await registerEmployee.save(); 
       console.log('ab tak toh sahi hai');
       const c=Employee.length;
       Employee.push({
        id:c+1,
        email:a,
        password:b,
        name: req.body.name,
        contact : req.body.contact,
        Department : req.body.Department,
        DateOfJoin : req.body.DateOfJoin,
        iSAdmin : true,
      
      })

      res.render('home',{data:Employee});

    }
    catch(error){
        console.log(error);
    }


    //  res.send("ab tak toh sahi hai")
})

// app.get('/employee',(req,res)=>{

//     res.render('employee.hbs' ,{name_1:});
// })

const task_info=[
        { 
            id:1, 
            Description: '123456\r\n',
            category: 'break',
            starttime: '12:00',
            minutes: '30'
        },
];

app.post("/update", (req, res) => {
    const requestedid = req.body.id;
    const inputEmployeeDescription = req.body.Description;
    const inputEmployeecategory = req.body.category;
    const inputEmployeeminutes = req.body.minutes;
    const inputEmployeestarttime = req.body.starttime
    
    var j = 0;
    task_info.forEach((employee) => {
      j = j + 1;
      if (employee.id == requestedid) {
        (employee.Description =  inputEmployeeDescription);
          (employee.category = inputEmployeecategory);
          (employee.starttime = inputEmployeestarttime);
          (employee.minutes = inputEmployeeminutes);
      }
    });
    res.render("employee", {
      data: task_info,
    });
  });
    




app.post("/delete", (req, res) => {
    console.log("=="+req.body.id)
    var requestedid = req.body.id;
    var j = 0;
    task_info.forEach((employee) => {
     
      console.log(employee.id  +"=="  + requestedid);
      if (employee.id === requestedid) {
        // task_info.splice(j - 1, 1);
        delete task_info[j];
        
      }
      j = j + 1;
    });
    res.render("employee", {
      data:task_info,
    });
  });

  app.post("/open",(req,res)=>{
     console.log(req.body.id)
    res.send(req.body.id);
  })

app.post('/task',(req,res)=>{
  
    console.log(req.body);
    const a=task_info.length;
    task_info.push({
        id:a+1,
        Description: req.body.Description,
        category: req.body.category,
        starttime: req.body.starttime,
        minutes: req.body.minutes,
    })
//    task_info.forEach(element=>{
//     console.log(element.Description);
//     console.log(element.category);
//     console.log(element.starttime);
//     console.log(element.minutes);
//    })
    res.render('employee.ejs', {data : task_info});

});




app.get('/index',(req,res)=>{
   res.render('index.ejs');
});

app.post('/back',async(req,res)=>{
  
    const usermail=req.body.email;
    const userpassword=req.body.password;
    const user=await Register.findOne({email:usermail});
    if(user.password==userpassword){

        if(user.isAdmin==true){
           
       res.render('home.ejs',{data:Employee});
          //  res.send("Password Matched -Admin successfully login");
        }
        else{
            //res.send(`Hey ${user.name} , welcome in flipr `)
            
            res.render('employee.ejs' ,{name_1:(user.name , data=task_info)});
        }
        
    }
    else{
        console.log(usermail);
        console.log(userpassword);
          res.send("Not matched");
    }

})

// app.get('/',(req,res)=>{
//     res.send("HAPPY DIWALI");
// })


app.post('/delete_employee',async(req,res)=>{

  
})

app.listen(port,()=>{
    console.log(`Your connection successfully connected at ${port}`);
})