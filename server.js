const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const db = require("./models");

const port = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());


mongoose.connect("mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

app.post("/api/workouts", (req, res) => {
  db.Workout.create({}).then(wrk => {
      res.json(wrk);
    })
});

app.put("/api/workouts/:id", ({ body, params }, res) => {
  db.Workout.findByIdAndUpdate(params.id, { $push: { exercises: body } }, { new: true })
  .then(wrk => {
      res.json(wrk);
    })
});

app.get("/api/workouts", (req, res) => {
  db.Workout.find()
  .then(wrks => {
      res.json(wrks);
    })
});

app.get("/api/workouts/range", (req, res) => {
  db.Workout.find()
  .then(wrks => {
    wrk = wrks[wrks.length - 1]
    total = 0;
    if (wrk.exercises.length > 0) {
        wrk.exercises.array.forEach(element => {
          total = total + element
        });
    }
    res.json(total);
  })
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "public/exercise.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "public/stats.html"));
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
})