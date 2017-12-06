# Backlog / Carnet de produit du projet


| N° |  As  |        I Want to                   | so that                    | P | D |
|:---|------|:----------------------------------:|:--------------------------:|---|---|
|  1 | User | ~~register new locked door~~       | I can order my password    | 2 | 3 |
|  2 | User | ~~register new password~~          | I can refind them easily   | 1 | 1 |
|  3 | User | ~~register new login~~             | I can refind them easily   | 1 | 1 |
|  4 | User | ~~protect password from spy~~      | I can sleep on my two ears | 4 | 4 |
|  5 | User | ~~get password in clipboard~~      | I don't need to see it     | 3 | 2 |
|  6 | User | ~~get login in clipboard~~         | I don't need to see it     | 3 | 2 |
|  7 | User | ~~change my password or login~~    | I won't cry if I lost it   | 2 | 2 |
|  8 | User | ~~search a locked door by name~~   | to find them quicker       | 4 | 1 |
|  9 | User | ~~delete a locked door~~           | to keep only what's needed | 4 | 1 |
| 10 | User | ~~see my login~~                   | to remember it             | 1 | 1 |
| 11 | User | ~~see my password~~                | to remember it             | 1 | 1 |
| 12 | User | ~~select a locked door~~           | to get login and password  | 2 | 2 |
| 13 | User | ~~generate a password~~            | I won't have to invent one | 5 | 4 |
| 14 | User | ~~open browser with url of door~~  | I'll go faster on my site  | 5 | 4 |



_P is priority. The score of priority is from 1 to 10 and 1 is the highest priority._

_D is Difficulty. The score of difficulty is from 1 to 10 and 10 is the hardest._

# Main Frame 
_Version 1:_

![alt text](https://github.com/vince-bourgmayer/electron-test/blob/master/project-management/img/mainFrame-v1.png "Just an idea")


# Steps
_I can't give many many time on this project so talking about sprint or iteration would be an error.
To be effective and don't spread my time again and again I will pick up users stories 2 by 2.
I will change users stories(US) when first are over. This part is a kind of delivery's plan._

 1. ~~Users stories : 10 and 11~~
 2. ~~Users stories : 12 and 1~~
 3. ~~Users stories : 2 and 3~~
 4. ~~Users stories : 5 and 6~~
 5. ~~Users stories : 4 and 7~~
 6. ~~Users stories : 8 and 9~~
 7. ~~Users stories : 13 and 14~~


# User story Constraint (USC)
 + USC 1: a locked door's name should be unique

# TODO
_Here is the list of the current users stories and tasks.
Description will be: Start date, story's identifier, task (optionnal), subtask (optionnal)_

	Project over.

# Done
_Here is the list of the already done users stories and tasks.
Description will be: Start date, End date, story's identifier, task (optionnal), subtask(optionnal)_

 + 28/09/2017 18:45 - 29/09/2017 21:07 - US 10 - Create mock login object
 + 29/09/2017 21:04 - 29/09/2017 21:07 - US 10 - transform mock login object in JSON to send it
 + 28/09/2017 18:45 - 29/09/2017 21:07 - US 10 - Send login from main process to renderer process
 + 28/09/2017 18:45 - 29/09/2017 21:07 - US 10 - Print login
 + 28/09/2017 18:45 - 29/09/2017 21:07 - US 11 - Create mock password object
 + 29/09/2017 21:04 - 29/09/2017 21:07 - US 11 - transform mock password object in JSON to send it
 + 28/09/2017 18:45 - 29/09/2017 21:07 - US 11 - Send password from main process to renderer process
 + 28/09/2017 18:45 - 29/09/2017 21:07 - US 11 - Print password
 ---
 + 29/09/2017 21:47 - 29/09/2017 21:58 - US 1 - Register a new locked door - define how to store locked door
 + 29/09/2017 21:58 - 29/09/2017 22:08 - US 1 - Register a new locked door - Install solution to store locked door
 + 29/09/2017 21:58 - 30/09/2017 ??:?? - US 12 - Select a locked door - delete previous mockObject because I won't use it
 + 29/09/2017 21:58 - 02/10/2017 18:33 - US 1 - Register a new locked door - update UI - Adding HTML Button
 + 29/09/2017 21:58 - 02/10/2017 18:33 - US 12 - Select a locked door - Update UI - Generate graphical representation of locked door with slick
 + 29/09/2017 21:58 - 02/10/2017 18:33 - US 12 - Select a locked door - Update UI - Observe slick object on change to update printed data
 + 29/09/2017 21:58 - 03/10/2017 17:47 - US 1 - Register a new locked door - update UI - open modal window when click on add btn
 + 05/10/2017 15:51 - 05/10/2017 16:04 - US 1 - Register a new locked door - update UI - correct issue with modal window which only open 1 time
 + 07/10/2017 17:21 - 07/10/2017 17:54 - US 1 - Register a new locked door - update UI - Make UI depends on the user action
 + 29/09/2017 21:58 - 08/10/2017 22:45 - US 1 - Register a new locked door - saving data - save door in db
 + 29/09/2017 21:58 - 08/10/2017 22:45 - US 1 - Register a new locked door - update UI - update carousel
 + 08/10/2017 22:46 - 08/10/2017 23:13 - US 1 - Register a new locked door - issue. If lockedDoor list is empty at the window start, adding new door doesn't refresh carousel
 + 08/10/2017 23:32 - 08/10/2017 23:54 - US 12 - Select a locked door - Update UI - Update data when slide change
 + 09/10/2017 10:25 - 10/10/2017 00:53 - US 1 - Register a new locked door - make code better - make function pure
---
 + 10/10/2017 14:30 - 10/10/2017 15:00 - US 5 - get password in clipboard 
 + 10/10/2017 14:30 - 10/10/2017 15:00 - US 6 - get login in clipboard 
---
 + 11/10/2017 09:34 - 12/10/2017 16:34 - US 7 - change my password or login
 + 11/10/2017 09:34 - 21/10/2017 17:25 - US 4 - protect password from other people
--- 
 + 09/10/2017 10:25 - 16/11/2017 16:28 - US 1 - Register a new locked door - implement USC 1
 + 09/10/2017 10:25 - 16/11/2017 16:28 - US 1 - Register a new locked door - make code better - find a way to handle lockeddoor list
 + 21/10/2017 17:47 - 16/11/2017 16:28 - US 9 - delete a locked door - delete from slick
 + 21/10/2017 17:47 - 16/11/2017 16:28 - US 9 - delete a locked door - delete from db
 + 21/10/2017 17:47 - 16/11/2017 16:28 - US 9 - delete a locked door - user shouldn't be allowed to click on delete if no door selected
 + 21/10/2017 17:47 - 17/11/2017 09:50 - US 8 - search a locked door by name - get user word to search
 + 21/10/2017 17:47 - 17/11/2017 09:50 - US 8 - search a locked door by name - test slick filter
---
 + 21/10/2017 09:34 - 17/11/2017 14:36 - US 4 - protect password from other people - Change cipher password 
 + 21/10/2017 09:34 - 30/11/2017 15:50 - US 4 - protect password from other people - Change password input from text to password 
 + 17/11/2017 11:38 - 17/11/2017 14:36 - US 14 - open web window with url of door
 ---
 The end
 
# Forsaken
 + 29/09/2017 21:58 - 07/10/2017 17:21 - US 1 - Register a new locked door - update UI - get data from modal window
 + 17/11/2017 11:38 - 06/12/2017 12:28 - US 13 - generate a password

# For Later
