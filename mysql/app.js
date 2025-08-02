
import mysql from 'mysql2/promise';

const db=await mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"$u$h1704MR",
    database:"mysql_db",
})

console.log(" MYSql connected Successfully");

//await db.execute(`create database mysql_db`);
console.log(await db.execute("show databases"));

// await db.execute(`
//     CREATE TABLE user(
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     username VARCHAR(100) NOT NULL,
//     email VARCHAR(100) NOT NULL UNIQUE
//     );
//     `)
//console.log(await db.execute("show tables"));

//await db.execute(`
    // insert into users(username,email) values(
    // 'sush','sush@gamil.com')
    // `)

    // REad
    const rows=await db.execute(`select *from users`);
    console.log(rows);