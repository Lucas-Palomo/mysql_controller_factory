# Mysql Controller Factory
A node library using express and mysql to create controllers for you routes.

 # Usage Tutorial
 **Attention** this library is under test !

Initialization of factories

    // declare your imports
    var express = require('express');  
    var router = express.Router();  
    var factory = require('mysql_controller_factory');
    
    // initialize your mysql connection
    const mysql = new factory.MysqlFactory();  
    mysql.createMysql(host, port, user, password, database,timezone);
    
    // initialize your controller factory
    const controller = new factory.ControllerFactory(mysql.createPool(multipleStatements)); 

  - timezone is your UTC
      - example in Brazil the UTC is "**utc-3**" 
   - multipleStatements in createPool 
       - if  "**true**", enables execution of multiples query
  
 This latest version (**1.1.0**),  has six methods for you use in your routes.

 - findOne
 - findOneWithValues
 - findMany
 - findManyWithValues
 - insertOne
 - deleteOne

The methods **findOne** and **findMany** is a simple controller that execute a query.

    // using in your routes	
    router.get('/users', controller.findMany(`SELECT * FROM users`, verbose));
    router.get('/users', controller.findOne(`SELECT * FROM users`, verbose));

 - findOne
	 - Returns the **first** result of the query results
 - findMany
	 - Returns the query results  

The methods **deleteOne**, **insertOne**, **findOneWithValues** and **findManyWithValues** requires a ***expected from***,

the ***expected from*** is composed by 

    {  
      params: [],  
      body: [],  
      query: [],  
      locals: []   
    }

Where each element is a array of:
	`{ order : number, property: string } ` 
	
Where **order** indicates the **position** of value in query and **property** is the **value** that your requested.

    router.get('/:id_user', controller.findOneWithValues(
		`SELECT * FROM users WHERE id_user = ?`,
		{
			params: [  
				    { order : 0, property: "id_user" }  
			],  
			body: [],  
			query: [],  
			locals: []
		},
		verbose));

 The code above indicates that property **id_user** is found in your **Request Parameters** also known as ***req.params***  and that **0** in **order** indicates that replaced the first ***'?'*** in query by ***id_user*** value.
 
  - Options
     - if verbose is **"true"**  enables a detailed response
