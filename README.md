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

_The server will run on port 5000._  
Alternatively API can also be fetched directly from heroku and using the respective routes. Link for route to test the [Root Path](https://agile-anchorage-04188.herokuapp.com).

https://git.heroku.com/agile-anchorage-04188.git (only for ishan)

### API Routes

**localhost:5000/api/users/login**  
_(post) to login_

> body: email, password  
> response: sucess, token, userId, errors

**localhost:5000/api/users/register**  
_(post) to register_

> body: name, email, password, age, username ,confirmPassword  
>  resopnse: success, user, errors

**localhost:5000/api/users/:userId**  
_(get) to view patient by id_

> params: userId
> response: user

**localhost:5000/api/userupdate/**  
_(delete) to delete profile with authorization_

> authorization: token

**localhost:5000/api/users/all**  
_(get) to get all users_

> response: list of users, count

**localhost:5000/api/userupdate/avatar/:id**  
_(patch) to upload avatar_

> params: id  
> body(file): image
> autherization: token

**localhost:5000/api/userupdate/update/:id**  
_(patch) to update info_

> params: id  
> body: info
> autherization: token

**localhost:5000/api/memes/all**  
_(get) to get all memes_

> response: list of memes, count

**localhost:5000/api/memes/post**
_(post) to post a meme_

> body: meme  
>  response: errors, meme

**localhost:5000/api/memes/findmeme/:id**
_(get) to get a meme by id_

> params: id  
> response: meme

**localhost:5000/api/memes/delete/:id**
_(delete) to delete a meme_

> params: id  
> autherization: token  
> response: success

**localhost:5000/api/addons/like/:id**
_(post) to like a meme_

> params: id  
> autherization: token  
> response: meme

**localhost:5000/api/addons/unlike/:id**
_(post) to unlike a meme_

> params: id  
> autherization: token  
> response: meme

**localhost:5000/api/battles/create**
_(post) to create a meme_

> body: name  
> response: battle

**localhost:5000/api/battles/getinvitation/:id**
_(post) to get invitation link_

> params: id
> response: battle invitation link

**localhost:5000/api/battles/all**
_(get) to get a list of all the battles_

**localhost:5000/api/battles/find/:id**
_(get) to get the battle with given id_

> params: id
> response: battle

**localhost:5000/api/userupdate/follow/:id**
_(post) to follow or unfollow user with given id_

> params: id  
> authorization: token  
> response: message, current user, user with given id

**localhost:5000/api/feed/dummy**
_(get) to get dummy feed_

> authorization: token  
> response: an array of memes id

**localhost:5000/api/feed/search**  
_(get) to get user search items_

> query: search query for partial search  
> response: items matching the query
