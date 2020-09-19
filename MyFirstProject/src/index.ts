import "reflect-metadata";
import {Connection, createConnection} from "typeorm";


import {User} from "./entity/User";
import {usersAPI} from "./API/users"
import {apolloServer} from "./API/Apollo";

interface IUser {
    firstName: string,
    lastName: string,
    avatar: string,
}

createConnection().then(async connection => {
    let list = (await usersAPI.getUsers()).data;

    const usersList = list.map((item) => ({
        firstName: item.first_name, lastName: item.last_name, avatar: item.avatar 
    }));

    const promises = usersList.map((item) => AddUser(connection, item));
    await Promise.all(promises);

    console.log("Loading users from the database...");
    
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);
    apolloServer.Start(users);

    await connection.manager.clear(User);
    console.log("Table cleared.");
}).catch(error => console.log(error));

async function AddUser(connection: Connection, userData: IUser) {
    console.log("Inserting a new user into the database...");

    const user = new User();
    user.firstName = userData.firstName;
    user.lastName = userData.lastName;
    user.avatar = userData.avatar;

    return connection.manager.save(user);
}
