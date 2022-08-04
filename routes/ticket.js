const express = require("express");
const RouterTicket = express();

const bodyParser = require("body-parser");
const TicketController = require("../controller/ticket");
        RouterTicket.post('/addTicket',TicketController.AddTicket);
RouterTicket.post("/getUserInfo",TicketController.getUserTicket );

module.exports = RouterTicket;