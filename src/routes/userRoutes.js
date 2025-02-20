const express = require("express");
const pool = require("../config/db");
const router = express.Router();
const {getAgeDistributionOfAllUsers} = require('../controllers/UserController');


router.get("/usersAgeGrouop",getAgeDistributionOfAllUsers);


module.exports = router;
