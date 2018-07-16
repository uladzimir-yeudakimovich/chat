# chat 

You have to install NodeJs and MySQL softwares and create following tables: 

User table contains all the users registration details. 

CREATE TABLE `users` (

`uid` int(11) AUTO_INCREMENT,

`username` varchar(50),

`password` varchar(200),

`email` varchar(200),

PRIMARY KEY (`uid`)

);


This table contains all of the user messages.

CREATE TABLE `messages` (

`mid` int(11) AUTO_INCREMENT,

`message` text,

`uid_fk` int(11),

PRIMARY KEY (`mid`)

);


Then you have to launch npm install and npm start.
