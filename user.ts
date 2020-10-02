import { app, db, userCollection, reservationCollection } from "./index";

enum BathType {
  Beer = "beer",
  Wine = "wine",
}

enum TreatmentType {
  Massage = "massage",
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  address: {
    street: string;
    city: string;
    state?: string;
    areaCode: number;
    country: string;
  };
  email: string;
  phoneNumber: string;
}

interface AdditionalTreatments {
  treatmentType: TreatmentType;
  treatmentDate: Date;
  treatmentStaff: string;
}

interface Reservation {
  id: string;
  reservationDate: Date;
  typeOfBath: BathType;
  peoplePerTub: number;
  numberOfTubs: number;
  additionalTreatments: AdditionalTreatments[];
}

// Create new user
app.post("/users", async (req, res) => {
  try {
    const user: User = {
      id: req.body["id"],
      firstName: req.body["firstName"],
      lastName: req.body["lastName"],
      address: {
        street: req.body["street"],
        city: req.body["city"],
        state: req.body["state"],
        areaCode: req.body["areaCode"],
        country: req.body["country"],
      },
      email: req.body["email"],
      phoneNumber: req.body["phoneNumber"],
    };

    const newDoc = await db.collection(userCollection).add(user);
    res.status(201).send(`Created a new user: ${newDoc.id}`);
  } catch (error) {
    res.status(400).send("Please include all user details");
  }
});

// Create new reservation
app.post("/reservations", async (req, res) => {
  try {
    const newReservation: Reservation = {
      id: req.body["resId"],
      reservationDate: req.body["reservationDate"],
      typeOfBath: req.body["typeOfBath"],
      peoplePerTub: req.body["peoplePerTub"],
      numberOfTubs: req.body["numberOfTubs"],
      additionalTreatments: [
        {
          treatmentType: req.body["treatmentType"],
          treatmentDate: req.body["treatmentDate"],
          treatmentStaff: req.body["treatmentStaff"],
        },
      ],
    };

    const newRes = await db
      .collection(reservationCollection)
      .add(newReservation);
    res.status(201).send(`Created new reservation: ${newRes.id}`);
  } catch (error) {
    res.status(400).send("Please include all reservation details");
  }
});
