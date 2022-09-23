// Acquiring the Express
const express = require('express');

// To identiy the Process Uniquely
const port = 8000;

// Use our Express
const app = express();

const path = require('path');

// Split the URL
const bodyParser  = require('body-parser');

// Configuring the Database(Mongoose)
const db  = require('./config/mongoose');

// Set our Server/Storage
const TodoApp = require('./models/todo');

// Setup our view Engine
app.set('view engine','ejs');

// To access .ejs files in any folder structure
app.set('views',path.join(__dirname,'views'));

app.use(bodyParser.json());

// To link the Static files
app.use(express.static('assets'));

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);


// Default Page or Home page link
app.get('/',function(req,res){

    TodoApp.find({},function(err,newtodo){
        if(err){
            console.log('error',err);
            return;
        }

        return res.render('home',{
            title:'Todo App',
            task_list : newtodo
        });
    });
});

// Add New Task in DB
app.post('/create-task',function(req,res,next){
       TodoApp.create({

        tname:req.body.tname[0],
        tcategory:req.body.tname[1],
        tdate:req.body.tdate
    },function(err,newtodo){
        if(err){
            console.log(`Error While Creating Task: Error id ==> ${err}`);
            return;
        }
        return res.redirect('back');
    })

});

// if we want to delete a single task
app.get('/delete-task-single',function(req,res){
    let id = req.query.id;

    TodoApp.findByIdAndDelete(id,function(err){
        if(err){
            console.log(`Error Happening  While Deleting. Error is ==>${err}`);
            return;
        }
        return res.redirect('back');
    });
});

// Delete Single/ Multiple Task
app.post('/delete-multiple',function(req,res){

    // To store the unique ids 
    let ids = req.body.task;

    // without selecting the tasks press the delete button Handle that Exception
    if(!ids){
        
        return res.redirect('back');
    }

    // if its a single task
    if(typeof(ids) == "string"){
        TodoApp.findByIdAndDelete(ids,function(err){
            if(err){
                console.log(`Error while Deleting Single Task: Error is ==> ${err}`);
                return;
            }
        })
    }
    // If want to delete multiple tasks
    else{
        for(let i=0; i < ids.length;i++){
            TodoApp.findByIdAndDelete(ids[i],function(err){
                if(err){
                    console.log(`Error Deleting Multiple tasks. Error is ==> ${err}`);
                    return;
                }
            });
        }
    }
    return res.redirect('back');

})
// Check whether the port is up or not
app.listen(port,function(error){
    if(error){
        console.log(`eror is ${error}`);
        return;
    }
    console.log(`Server is runnin on ${port}`);
})