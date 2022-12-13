var express = require("express");
var cors = require("cors");
const { v4: uuidv4 } = require("uuid");
var app = express();
const { firebaseConfig } = require("./config");
const { initializeApp } = require("firebase/app");
const { getDatabase, ref, push, set, onValue } = require("firebase/database");

// Initialize Firebase
const fb_app = initializeApp(firebaseConfig);
const database = getDatabase(fb_app);

require("dotenv").config();

app.use(cors());

app.get("/api/v1/cars", function (req, res) {
  const dbRef = ref(database, "cars");
  onValue(
    dbRef,
    (snapshot) => {
      res.send(snapshot.toJSON());
    },
    {
      onlyOnce: true,
    }
  );
});

app.post("/api/v1/cars/post", function (req, res) {
  const carDataRef = ref(database, "cars");
  const newCarRef = push(carDataRef);
  const id = uuidv4();
  set(newCarRef, {
    id,
    make: "Toyota",
    model: "Tacoma",
    package: "TRD Off-Road",
    color: "gray",
    year: 2016,
    category: "trucks",
    mileage: 81000,
    price: 45000,
  }).then(() => res.send("Post Success"));
});

app.get("/api/v1/cars/:id", function (req, res) {
  const dbRef = ref(database, "cars");
  const requestId = req.params.id;
  onValue(
    dbRef,
    (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        if (requestId === childData.id) {
          res.send(childData);
        }
      });
    },
    {
      onlyOnce: true,
    }
  );
});

app.listen(process.env.PORT, function () {
  console.log(`THD-cars server listening on port: ${process.env.PORT}`);
});
