const express =require('express')
const mysql = require('mysql');
const path = require('path')



const app=express()
app.use(express.static('site'))

const connection = mysql.createConnection({
    host: '103.129.99.179',
	port:'2082',
    user: 'azsparez_vikash ',
    password: '@Devilhitman1',
    database: 'azsparez_nodetest'
});

app.use(express.json())

const courses=[
{id:1,name:"vikash"},
{id:2,name:"james"},
{id:3,name:"jin"},{id:4,name:"devil"},{id:5,name:"hitman"},
]
app.get('/',(req,res)=>{
	res.sendFile(path.join(__dirname + "/site/index.html"));
});

app.get('/home',(req,res)=>{
	res.sendFile(path.join(__dirname + "/site/index.html"));
});

app.get('/aboutus',(req,res)=>{
	res.sendFile(path.join(__dirname + "/site/index.html"));
});

app.get('/api/courses',(req,res)=>{
	res.send([1,2,3]);
});

app.get('/api/courses/:id',(req,res)=>{
	const result =courses.find(c=>c.id===parseInt(req.params.id));
	if(!result) res.status(404).send('not found')
		res.send(result);
});

app.post('/api/courses',(req,res)=>{
	const addnew={
		id:courses.length+1,
		name:req.body.name
	};
	courses.push(addnew)
	res.send(addnew)
});

connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});

app.listen(3000,()=>{
	console.log('server is running on port 3000')
})