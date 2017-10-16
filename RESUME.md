# Resume of projet's progress
## 16/10/2017
After a little break, I come back. I choose a picture to represent the "locked door" which is te website or things for what we need a password and login to access. I did it with google and a search on pictures which can be used for non commercial project. Then I made little change in UI again.

#### 1. New UI
![alt text](https://github.com/vince-bourgmayer/electron-test/blob/master/project-management/img/mainWindow.dev.161017.JPG "main window")

I change icon of the app. The one I used isn't the final one.
This [tuto](https://www.christianengvall.se/electron-app-icons/) and this [website](https://iconverticons.com/online/) helped me.

## 12/10/2017
I fight with slick and others to find a way to print an information when there are no doors and to hide it when user add one. It was a little complicated for many reasons.
+ `()=>{...}` is not well supported because of JQuery
+ `slick` don't offer a function to easily get number of slide.
+ I had to find the correct event to listen. `afterChange` or `beforeChange` doesn't work as I want. So I used `reInit` and it works. 
+ I can't attach a listener to two event, or to tell it in an other way: I can't have two event bind to same behaviour in one command.
Something like `$(myelement).on(['init', 'reInit'], callback)` would be perfect. 

I lost between one and two hours to implement this little behaviour...grrr!

New look of the app :
#### 1. First start
![alt text](https://github.com/vince-bourgmayer/electron-test/blob/master/project-management/img/mainWindow.nodoor.dev.121017.JPG "main window")

#### 2. Add a new "door" and select it
![alt text](https://github.com/vince-bourgmayer/electron-test/blob/master/project-management/img/mainWindow.select.newdoor.dev.121017.JPG "new door selected")

#### 3. Update the door
![alt text](https://github.com/vince-bourgmayer/electron-test/blob/master/project-management/img/mainWindow.update.newdoor.dev.121017.JPG "data updated")

#### 4. What you'll get after adding many doors
![alt text](https://github.com/vince-bourgmayer/electron-test/blob/master/project-management/img/mainWindow.dev.121017.JPG "App is used")

## 11/10/2017
I continued to set bootstrap. That make me need to adapt behaviour and in fact, it allows me to remove some part of code. So I succeeded in making it better.
So I remove the hide/show form/data panel, Change DOM to make it clearer.

The user story 4 is to protect password from an personn who can be in your back and see what is print. But then I realise that sometimes password can't be copy and paste as it is on my bank website. Moreover, nedb write data in clear so if someone can find the file and open it, he can access to all your password. It would be a little problematics... So I need to protect nedb data file and 
Some pist there:
 + nedb serialization/deserialization (here)[https://stackoverflow.com/questions/42539412/protect-nedb-database-with-user-password]

I duplicated add door function to create update function. Thanks to last modification of user interface, it was so easy!
First I had to get the current door. Then, find the corresponding object in list of door (got from db at the start of app). Then I duplicate current door object , and set the new property value on the copied object. Then I update db and if everything alright I print a dial box to inform user that data have been updated.
I wouldn't have to make a copy of door object but the `update(oldObject, newObject, callback)` function need both.

I have to implement a security on create function. Name shouldn't be empty! Because, finally it can't be updated. I though that I should add a test in add function. But I decide to do it in other way. If `input id='name'...` is empty, then `button id='add-btn'` will be disable. So I'll give a listener on 'change' to the input. It wasn't so easy...
+ `$('#nameField').on('keyup', function(){alert($(this).val().length)` and `$('#nameField').on('keyup', ()=>{
        alert($(this).val().length)` don't give same result. I can't use `()=>{...}` to pass the callback
+ `change`event only trigger when element lose focus so it's not what I need. But `keyup`event doesn't trigger after clear value (when I added a door)

So finally I decide to just add a verification at start of add-door function call.

## 10/10/2017
To implement constraint on door's name I think I will use `Array.prototype.find()` to verify if a door with this name already exist

I use electron's doc to look how to send data to clipboard. Then I create a function `sendToClipboard(identifier)` which get text of element with identifier as html id and then get text to put in clipboard via `clipboard.writeText(...)`. I tested and it works. SO EASY! In 30 min I realised users stories 5 and 6. Next are 4 and 7. They will be a little harder I think.

---

#### 1. Start the app
![alt text](https://github.com/vince-bourgmayer/electron-test/blob/master/project-management/img/mainWindow.nodoor.dev.101017.JPG "main window")

#### 2. Add a new "door"
![alt text](https://github.com/vince-bourgmayer/electron-test/blob/master/project-management/img/mainWindow.form.add.filled.dev.101017.JPG "new door form filled")

#### 3. Select a door
![alt text](https://github.com/vince-bourgmayer/electron-test/blob/master/project-management/img/mainWindow.door.opened.dev.101017.JPG "a door has been selected")

#### 4. Copy login to clipboard
![alt text](https://github.com/vince-bourgmayer/electron-test/blob/master/project-management/img/mainWindow.login.to.clipboard.dev.101017.JPG "login is in the clipboard")

I'm a little happy of what I've done yet. But I know that I can do more...
I looked for bootstrap and install it: `npm install bootstrap --save`. But I should completely rethink design. Then, I made paper drawn schema. I began to write clean html and I thought that I should change behaviour of application, specially when user want to create a new element. In this case, a simple input to get name is usefull, then it add the element with just a name. The central interface could be a permanent form and user can always update infos which would be print in `input` by clicking on a "update" button, or remove the element on clicking on "delete button"

I know I shouldn't anticipate but I also installed select2 and bootstrap theme for select 2. Because I think that later I will implement tag management to be able to filter door. but for later


## 09/10/2017
Just to see it is working as expected I installed nodejs on my old computer with linux mint OS. I installed `curl` then `nodejs` and `npm`, then I git clone the repo in new directory and finally run `npm install`. I launch start command and see my app working as expected on linux, exactly as in windows. I finally installed `vim` to take a look at `package.json`

I need to make my code better now. But after that I'll start users stories 5 and 6 which concern clipboard. luckily electron doc, already talk about [clipboard](https://electron.atom.io/docs/api/clipboard/)

I continued to improve my code and thanks to mocha and unit testing I code correctly. I use ES6 `Function.prototype.apply()`to make pure function. I was a little hard to understand but this is a little because i'm tired.
It seems that `find` or `findIndex`doesn't accept object as parameter.
So I tried `indexOf`but it always return 1... Useless in fact!

## 08/10/2017
I work a little this morning to find why I can't add a new door... Debugging code help me to don't be too far from solution.

This evening. I corrected function  `saveDoor(door, db)` in script.js which contains the error. In this function the app realizes a `db.insert(object, function())`. I have added the `return`instruction in the callback function but not in my function `saveDoor` so no Data where returned. I correct this and now it's work!

I add function to handle change in carousel. It get data from db and add them in view. But the problem come from door that have been added during the current session and that aren't in the doc collection. So, I should define a variable which contains docs. Something like a hashset by example. Then listen `afeterchange` out of part of code where I initialize slick.

Now I can add new locked door, and print data when selecting a door! I juste realized that I've done User stories 2 and 3 during realisation of user stories 1... cool!

I think I will need to clean my code soon, because my function aren't really pure. Moreover, the use of global `lockedDoors` variable doesn't make me proud. I want to find a more pure way to do it, so that I will respect functionnal programming concept. In the same way, I have to decide what to do about `getDataOfNewDoor()` which isn't pure.

## 07/10/2017
I passed my day to look for a way to get Data from child window to main window without passing by IPC.
I thought I've found a solution with `window.open()`called from renderer Process and with `window.opener` but all my trials failed.
Every link found on google is saying that it isn't possible as I would, so I decided to rethink the apps with child window. I'll do everything in the single main window.
The main window will stay globally the same but the central part will see its content change depending on what the user want to do.
If user want to add a new door, I will print a formular, if user wants to see password, then app will show data on that door (and so user will get its password or login)

I can't use `<webview>` because webview launch a new process which is independant from main window.
To hide or show the html element of the page I can use display or visibility css attribute. But I threw an eye on the difference between them and visibility let the element able to affect the page. So I'll use `display`.

I update index.html to add function to hide and show data or form. I create a function to add a new door but I won't work. Devtools tells that `addDoor()` in script.js isn't a function. I wonder if it's because of display: none...

I will have to put "new door" button out of carousel element, because if there is no door, user won't be able to add a new one.

## 05/10/2017
1. Update todo list to add the task of correcting the issue with child window

2. Start to think on how to get info from child window to main window. Then I start to search on google info about this and I fell on [this](https://discuss.atom.io/t/object-has-been-destroyed-when-open-secondary-child-window/30880/4). So, as it has been said there, I add a listener on the child window for the close event. When this one is trigger, it will hide the child window. I'm not sur but I think that `event.preventDefault()` replace standard behaviour when closing by this one. I check if I still got the issue and the answer is No. Problem resolved :) 

## 03/10/2017

1. A second window is popping when clicking on a "new door" button in carousel. To allow that, I tried different things.
	+ make buttons send msg to mainProcess
		1. first in the script.js I used `$('.btn-add-door').click(function(){...})` but it doesn't worked
		2. So I replace the .click event by a function declared at the begining of `script.js`and use HTML `onclick='myfunction()'` to make it work. It didn't work too but I got erro in dev tool. I caught something!
		3. The function use ipcRenderer which is declared and called in index.html not in script.js so I decided to move my function in index.html and then it worked!
	+ Create new window in main.js
		1. First, I coded a second function like `createMainWindow()` where I created the child window and tried to make it pop when ipcMain catch asynchronous message send from index.html. But it didn't work.
		2. Look on the web and I found that I have to create the child window in the same function as the main window.
		3. Then it work not as expected because I  switched event and arg in use of `ipcMain.on(asynchronous-message, function(event, arg){...})` and now it works.
	+ Create base of the interface of child window
2. I justed notice that my sublim text3 isn't showing `.db`file
3. Just discover that I can call child window only one time... Issue's trace told that object has been destroyed.

_NB: I know that's ugly but work is still in progress!_

___screenshot of current result:___
main window
---
![alt text](https://github.com/vince-bourgmayer/electron-test/blob/master/project-management/img/mainWindow.dev.031017.JPG "main window")

child window
---
![alt text](https://github.com/vince-bourgmayer/electron-test/blob/master/project-management/img/doorCreationWindow.dev.031017.JPG "Door's creation window")


## 02/10/2017
I don't need to use DB in main process but in renderer process. So i commented previous code in main.js
then I started to call nedb in script.js

1. I created a function to get html from locked door object for slick. I did unit test to create this function but i only use two basic case so i'm not really happy of it... But I understand a little better how to use it.
At this step I wondered if :
	+ I should use jquery to move "addDoorButton" when slide change.
	or
	+ I should but a button on each slide and hide them except if it is the current slide.

_I choose second way, but it 's not a closed question_

2. I made many modification on project today. I changed dir structure, changed where to use DB, ...

3. I updated backlog.md because task previously created weren't covering project.

## 31/09/2017
I read:
- some articles about testing with mocha
	1. [a guide about mocha](http://samwize.com/2014/02/08/a-guide-to-mochas-describe-it-and-setup-hooks/)
		_NB:_ 
		+ describe() serve to group tests cases or other groups
		+ pending means "en attente" or 'en attendant'
	2. [mocha's doc](https://mochajs.org/#arrow-functions)
	3. [should.js](https://github.com/shouldjs/should.js)
- [a guide about docco](http://ashkenas.com/docco/)

~~1. I want to test access to DB.~~
I do test with mocha and expect.js in `/test/*`

## 30/09/17
I erased the branch to test SQLite3 and I lost everything I've done on it but I didn't expect to loose commit and trace of what I've done... No way, I just have to remberer that SQLite3 doesn't work with electron.js or it needs more steps with node-gyp to recompile source because SQLite doesn't have correct header to work with electron.js or something like that. So I'll use another db. I also learned a little more about 'in memory' db.

Now i'll try [NeDB](http://stackabuse.com/nedb-a-lightweight-javascript-database/)
I juste wonder if I should call nedb in main process or in renderer process...


## 29/09/17
Let's go! From now I will follow my delivery plan!
First step: Let see login and password.
1. App should load login and password from db or file (I'll decide later)
So first task is to mock login and password in main.js. 
Todo that, I will create a simple object `{login:'toto', password:'titi'}`
2. Next step is to send data from main process to renderer process.
I'll use IPCMain in main.js to sendData but it is possible to use [another way](https://electron.atom.io/docs/api/web-contents/#webcontentssendchannel-arg1-arg2-)
___Question: should I use synchronous or asynchronous way?___
I will do both to see. So I'll decide later.
I use [doc's example](https://electron.atom.io/docs/api/ipc-main/).

3. Replaced use of IPCMain by (instance of BrowserWindow).webContents.send(channel, msg)

4. Getting mockData in UI
Go to UI/index.html and use IPC for Renderer process.
I also changed UI/js/script.js. I thought I can use `JSON.parse(mockData)` natively but it didn't work. So I gave a look in node_modules and discover jsonify module. Now it works!

5. Add HTML to print data in UI.

6. Added a little in late the stringification of mockObject. Before I did mockData with json. Now it is a real JS Object transformed in json.

7. Update Backlog.md. Look on how to store locked door with login and password.
_NB:_ `lockedDoor = {name, (opt)url, login, password}`
I Choose to use SQLite for lightweight and because I won't store too many values.A single file could also be used but it is interesting to learn to link Node.js to another database than MongoDB. Let's go!
Needed information to use SQLite and Node.js are [here](http://www.sqlitetutorial.net/sqlite-nodejs/)

8. Installing SQLite 3 with `npm install sqlite3`. Everything seemed to work until i launched apps. It has crashed many times so I search for solution on the web and it seems that there is a probleme between electron and sqlite. I will create a new branche to try [this](https://www.laurivan.com/make-electron-work-with-sqlite3/)

## 28/09/17
It's not easy to find time those days...
1. Looking on the web for some subject around electron.js.
	- It should be possible to use some C++ lib thanks to Node.JS but it will need some adaptation as it's wrote [here](https://nodejs.org/api/addons.html).
	- To get and send Data between 'view' and 'controller' I have to use IPC object. I found good example [here](https://github.com/crilleengvall/electron-tutorial-app)
	- Just checked difference between `var`, `let`and `const`in EcmaScript 6 ([ressource](http://putaindecode.io/fr/articles/js/es2015/const-let-var/). I remembered V.Jousse lesson with Scala :)

2. Scheduled steps and organisation to work. I also added some users stories in Backlog.

3. Discovered and tried "projects" tab on github repository which is a kind of kanban board. 

## 25/09/17

1. Updating mainframe html
	* Removing lorem ipsum and Hello world
	* Inspired by this [tuto](https://tutorialzine.com/2015/12/creating-your-first-desktop-app-with-html-js-and-electron)
	* Adding Jquery. I will try to add a caroussel via [slick](https://plugins.jquery.com/slick/)

2. Creation of UI directory which will contain user interfaces files

3. Get an old version of jquery from old project, to check if it works and it seems to work!

4. Sleep!

5. Test without internet connexion to verify. It works!

6. Installation of slick-carousel via npm: `npm install slick-carousel`. It also install Jquery.

7. Continued to play with UI, Jquery, slick. Looking for add CSS (bootstrap).
I ran `npm install bootstrap@3`. I'm still looking for how send event from view to main.js.
I feel that I will look up near React.js or something else.

8. Found [tuto](https://tutorialzine.com/2015/12/creating-your-first-desktop-app-with-html-js-and-electron) which is a little old but give a way.
I discover Flipster But in the end slick-carousel is better. I played with css.

## 24/09/17  
Project creation and first action

1. I firstly created github project, then clone it into local.
I used a node .gitignore generated by Github and I choose the unlicence which I don't know.

2. I created `RESUME.md` and `BACKLOG.md`

3. I created archive project-management and added first mainframe proposition.
I used Balsamiq to create the UI proposition. I also played with markdown.

4. I installed Electron:
 * Launch a terminal and go to project directory
 * use `npm install electron --save-dev --save-exact`

5. Creation of app entry point: `main.js` and hello world IHM in `index.html`

6. Running app with: `.\node_modules\.bin\electron .`

7. I tried to run basic app with different option to see what would happen. I discovered what is a JumpList.