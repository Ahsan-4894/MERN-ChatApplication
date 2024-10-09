import {faker} from "@faker-js/faker"
import {userModel} from '../models/user.js'

export const generateUsers = async(numUsers)=>{
    try {
        const userPromise = [];
        for (let i = 0; i < numUsers; i++) {
            const user = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                bio:faker.lorem.sentence(10),
                avatar:{
                    publicid:faker.system.fileName(),
                    url:faker.image.avatar(),
                }
            }
            userPromise.push(userModel.create(user));
        }
        await Promise.all(userPromise);
        process.exit(1);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}