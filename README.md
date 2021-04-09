# Tickle
Tickle is a social platform that comes with both web version and android/iOS version with REST API in node.js. In tickle users can share memes, view memes,like memes, can comment on them and can chat with other users. Users will also have their seperate profile and other users can also see it. The chat service is implemented using socket.io. This app runs on the node.js backend and uses MongoDB atlas service for storing data online and Firestore as a media storage. The application is deployed on heroku so it can be used by the links provided.
  
## Web App
<br><br>
  <img src="/assets/images/tickle_webapp.png" width="100%" height="525px">
The web App/ web Portal is build using React which is deployed on heroku at http://tickle.herokuapp.com/.
The WebApp gives the facility to - Users can share memes.
- Users can view memes of all other users.
- Users can like and comment on other users memes.
- Users can build their separate profile.
- Users can follow each other.
- Users can chat with other users whom they follow.

## Flutter app
<br><br>
  <img src="/assets/images/tickle2.png" width="100%" height="505px">
You can download the fully functioned [APK](https://drive.google.com/open?id=1By_CKuRpz-8DsvFL3b3102nDxG0T3h-O), or you can setup the flutter app using the mentioned steps: 
### Getting Started

- clone this repository.

```
git clone 'repository_url'
```

- download flutter from flutter : https://flutter.dev/docs/get-started/install
- install flutter and dart plugins for your text editor.
- open project in your preferred text editor and download all dependencies from pubspec.yaml (automatically downloaded during first run)
- create a folder named api in lib folder
- create a file name keys.dart
- paste this key in the file 
```
import 'package:scoped_model/scoped_model.dart';

class ApiKeys extends Model {
  static final uri = 'https://agile-anchorage-04188.herokuapp.com/';
}
```
- run project using command

```
flutter run
```
-Login credentials(Dummy Users) for app:
```
username:  ishan2@email.com
password:  123

```

A few resources to get you started if this is your first Flutter project:

- [Lab: Write your first Flutter app](https://flutter.dev/docs/get-started/codelab)
- [Cookbook: Useful Flutter samples](https://flutter.dev/docs/cookbook)

For help getting started with Flutter, view our
[online documentation](https://flutter.dev/docs), which offers tutorials,
samples, guidance on mobile development, and a full API reference.

### How it works
* Home screen is the meme feed where all users share memes with each other.

* App has customized profile which shows all the user related data.

* App has chats as well implemented using socket.io.
<br><br>
  <img src="/assets/images/tickle_profile.jpeg" width="250px" height="500px">
  <img src="/assets/images/tickle_feed.jpeg" width="250px" height="500px">
  <img src="/assets/images/tickle_chat.jpeg" width="250px" height="500px">
<br>

* Tickle is a meme sharing social media app.

* Chats are live and are developed from scratch.
<br><br>
  <img src="/assets/images/tickle_splash.jpeg" width="250px" height="500px">
  <img src="/assets/images/tickle_chat2.jpeg" width="250px" height="500px">


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
Alternatively API can also be fetched directly from heroku and using the respective routes. Link for route to test the [Root Path](https://agile-anchorage-04188.herokuapp.com/).  
