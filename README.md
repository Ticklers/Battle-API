# Battle-API
## Node API
This application is based on REST API build in node.js. API is deployed on heroku at https://agile-anchorage-04188.herokuapp.com/ . To set up the node API move to the node_api directory and run the following command in terminal/command prompt:
```
npm install
```
This will install all the required dependencies for the API. To start the server run the following command in your terminal/command prompt:
```
npm start
```
*The server will run on port 5000.*  
Alternatively API can also be fetched directly from heroku and using the respective routes. Link for route to test the [Root Path](https://agile-anchorage-04188.herokuapp.com).  

### API Routes

**localhost:5000/api/users/login**    
*(post) to login*  
> body:  email, password  
> response: sucess, token, userId, errors

**localhost:5000/api/users/register**   
*(post) to register*  
>    body:    name, email, password, age, username ,confirmPassword   
>    resopnse: success, user, errors  

**localhost:5000/api/users/:userId**     
*(get) to view patient by id*
> params: userId, token
> response: user

**localhost:5000/api/userupdate/**            
*(delete) to delete profile with authorization*
>    authorization: token 

**localhost:5000/api/users/all**   
*(get) to get all patients*
>  response: list of users, count

**localhost:5000/api/userupdate/avatar/:id**  
*(patch) to upload avatar*
> params: id  
> body(file): image
> autherization: token

**localhost:5000/api/userupdate/update/:id**  
*(patch) to update info*
> params: id  
> body: info
> autherization: token
