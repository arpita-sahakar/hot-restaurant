let express = require("express");
let path = require("path");

//create express server
let app = express();
let PORT = process.env.PORT || 3000;

//data parsing properties
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//creat an empty array to store the reservations
let reservations = [];
let waitlist = [];

// view routes - for displaying 
//(/ for home page)
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/home.html"));
});
//view routes "/reserve" for booking a table
app.get("/reserve", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/reserve.html"));
});
// view routes "/tables" view reservation & waitlist tables
app.get("/tables", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/tables.html"));
});

//api route - for functionality
//here, backend server accepted reservation from client using post method and sent response to client
app.post("/bookTable", function (req, res) {
  //get the request body (user reservation information)
  let resvData = req.body;
  console.log(resvData);
  console.log(reservations.length);
  //push the resv details to the array
  if (reservations.length < 5) {
    reservations.push(resvData);
    //send json response back to client
    res.json({
        "status":true
    });
    // res.json(resvData);

  } else if (waitlist.length < 2) {
    //if reservation booking exceeds 5 the bookings will be pushed to waitlist array.
    waitlist.push(resvData);
    res.json({
        "status":true
    });
    // res.json(resvData);
  } else {
    res.json({
        "status":false
    });
  }
});

// api route to delete reservation and waitlist from screen. 
//client sends request and server response by clearing the data
app.delete("/clearTables", function (req, res) {
    // delete objects from array by emptying the array
    reservations = [];
    waitlist = [];
    res.json({
        "status":true
    });

})

//when the client will ask to view all the confirmed reservations
app.get("/view-confirmed-resv", function (req, res) {
  //sending the array of reservations to client in JSON format
  res.json(reservations);
});

//when the client will ask to view all the waitlist reservations
app.get("/view-waitlist-resv", function (req, res) {
  //sending the array of reservations to client in JSON format
  res.json(waitlist);
});

//start the server
app.listen(PORT, function () {
  console.log("App is listening" + PORT);
});
