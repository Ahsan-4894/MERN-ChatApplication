import express from 'express'
const route = express.Router();


import AdminController from '../controllers/admin.js'
import {adminLoginValidator, validateHandler} from '../lib/validators.js'
import { adminOnly } from '../middlewares/isAuth.js';

//public routes
route.get("/login", adminLoginValidator(),validateHandler,AdminController.login);
route.get("/logout", AdminController.logout);

//protected routes
route.use(adminOnly);
    route.get("/verify", AdminController.getAdminData);
    route.get("/allusers", AdminController.getAllUsers);
    route.get("/allchats", AdminController.getAllChats);
    route.get("/allmessages", AdminController.getAllMessages);
    route.get("/dashboardstats", AdminController.getDashboardStats);

export default route;