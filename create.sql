    CREATE TABLE USER (
   	id integer primary key auto_increment,
    login varchar(32) unique,
    password BLOB,
    prenom varchar(32), 
    nom varchar(32)
    );


CREATE TABLE Friends (
   	'from' integer,
    'to' integer,
  	since timestamp,
   primary KEY ('from','to')
    );


create table session (
    token varchar(50) PRIMARY KEY,
    id_user integer,
    `timestamp` timestamp);
