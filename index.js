const express = require("express");

//initialize express
const app = express();

//port
const PORT = 5000

// parsing JSON
app.use(express.json());

// parsing URL encoded data
app.use(express.urlencoded({ extended: true }));

app.get("/", (req,res) => {
  res.send("<h1>Welcome to my flight-booking Api, you can book flights and all here✈✈</h1>")
})

//model
const flights = [
  {
  id: 1,
  title: "flight to canada",
  time: "1pm",
  price: 26000,
  date: "26-06-2022"
  },
 {
    id: 2,
    title: "flight to abuja",
    time: "6am",
    price: 1600,
    date: "07-10-2022"
   },
   {
     id: 3,
    title: "flight to dubai",
    time: "10am",
    price: 4500,
    date: "11-12-2022"
   }
  ];

  // Adding a Flight
  app.post('/addFlight', (req, res) => {

  // Checking if the addflight request body is empty
  if (!Object.keys(req.body).length) {
  return res.status(400).json({
  message: "Flight body cannot be empty",
  });
 }

 // getting the flight info 
   const title = req.body.title
   const time = req.body.time;
   const price = req.body.price;
   const date = req.body.date;

 const newFlight = {
  id: flights.length + 1,
  title,
  time,
  price,
  date,
 };
 try {
  flights.push(newFlight);
  res.status(200).json({
  message: "Successfully created added a new flight",
  });
 } catch (error) {
  res.status(500).json({
  message: "Failed to add a new flight",
  });
  }
  });
 

  //  Getting all Flight
  app.get('/flights', (req,res) => {
    try {
      res.status(200).json({flights});
      } 
      catch (error) {
      res.status(500).json({
      message: "Failed to get flights",
      });
      }
  })
  
  // Getting a single Flight
   app.get("/flights/:flightID", (req, res) => {
    const id =  parseInt(req.params.flightID); 
    try {
    let flight = flights.find((flight) => flight.id === id);
    if (!flight) {
    return res.status(404).json({
    message: "Flight not found",
    });
    }
    res.status(200).json({
    flight,
    });
    } catch (error) {
    res.status(500).json({
    message: "Failed to get flight",
    });
    }
   });

  // Update/Edit Flight
 app.put('/flights/:flightID', (req,res) => {
  try {
    const id = parseInt(req.params.flightID);
    let flight= flights.find((flight) => flight.id === id);
    if (!flight) {
    return res.status(404).json({
    message: "Flight not found",
    });
    }
    const flightIndex = flights.indexOf(flight);
    flights[flightIndex].title = req.body.title || flights[flightIndex].title;
    flights[flightIndex].age = req.body.time ||    flights[flightIndex].time;
    flights[flightIndex].price = req.body.price || flights[flightIndex].price;
    flights[flightIndex].date = req.body.date ||   flights[flightIndex].date;
    res.status(200).json({
    message: "Successfully updated flight details",
    flight,
    });
    } catch (error) {
    res.status(500).json({
    message: "Failed to retrieve flight",
    });
    }
  })

  //delete a flight
  app.delete("/flights/:flightID", (req, res) => {
    try {
    const id = req.params.flightID;
    let flightIndex = flights.findIndex((flight) => flight.id === id);
    if (!flightIndex) {
    res.status(404).json({
    message: "Flight not found",
    });
    }
    flights.splice(flightIndex, 1);
    res.status(200).json({
    message: "Successfully deleted flight",
    flights,
    });
    } catch (error) {
    res.status(500).json({
    message: "Failed to delete user",
    });
    }
   });
 
 //Delete a Flight
 app.delete('/flights', (req,res) => {
  try {
    flights.splice(0, flights.length);
    res.status(200).json({
    message: "Successfully deleted all flights",
    flights,
    });
    } catch (error) {
    res.status(500).json({
    message: "Failed to delete fligths",
    });
    }
 })


//calling port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})