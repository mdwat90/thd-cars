const { v4: uuidv4 } = require("uuid");
const { firebaseConfig } = require("./config");
const { initializeApp } = require("firebase/app");
const { getDatabase, ref, push, set, onValue } = require("firebase/database");

// Initialize Firebase
const fb_app = initializeApp(firebaseConfig);
const database = getDatabase(fb_app);

const ERRORS = {
  ALL_CARS: "ERROR FETCHING CAR DATA",
  POST_CAR: "ERROR POSTING CAR DATA",
  SINGLE_CAR: "ERROR FETCHING SINGLE CAR DATA",
};

function getAllCarData(req, res) {
  const dbRef = ref(database, "cars");
  onValue(
    dbRef,
    (snapshot) => {
      if (snapshot.toJSON()) {
        res.send(snapshot.toJSON());
      } else {
        res.status(500).send({ message: ERRORS.ALL_CARS });
      }
    },
    {
      onlyOnce: true,
    }
  );
}

function postCarData(req, res) {
  const carDataRef = ref(database, "cars");
  const newCarRef = push(carDataRef);
  const id = uuidv4();
  const date = new Date().toString();

  set(newCarRef, {
    id,
    date,
    ...req.body,
  })
    .then(() => {
      res.send({ message: "POST SUCCESS" });
    })
    .catch(() => res.status(500).send({ message: ERRORS.POST_CAR }));
}

function getSingleCarData(req, res) {
  const dbRef = ref(database, "cars");
  const requestId = req.params.id;

  onValue(
    dbRef,
    (snapshot) => {
      let item;
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        if (requestId === childData.id) {
          item = childData;
        }
      });
      if (item) {
        res.send(item);
      } else {
        res.status(500).send({ message: ERRORS.SINGLE_CAR });
      }
    },
    {
      onlyOnce: true,
    }
  );
}

module.exports = {
  getAllCarData,
  postCarData,
  getSingleCarData,
};
