import "reflect-metadata";
import {Connection, createConnection} from "typeorm";

import {User} from "./entity/User";
import {usersAPI} from "./API/users"

interface IUser {
    firstName: string,
    lastName: string,
    age: number,
}

createConnection().then(async connection => {

    let list = await usersAPI.getUsers();
    // console.log(list);

    const usersList: IUser[] = [
        { firstName: "Vasya", lastName: "Pupkin", age: 26 },
        { firstName: "Petya", lastName: "Lupkin", age: 22 },
    ];

    const promises = usersList.map((item) => AddUser(connection, item));
    await Promise.all(promises);

    console.log("Loading users from the database...");
    
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    await connection.manager.clear(User);
    console.log("Table cleared.");
}).catch(error => console.log(error));

async function AddUser(connection: Connection, userData: IUser) {
    console.log("Inserting a new user into the database...");

    const user = new User();
    user.firstName = userData.firstName;
    user.lastName = userData.lastName;
    user.age = userData.age;

    return connection.manager.save(user);
}
