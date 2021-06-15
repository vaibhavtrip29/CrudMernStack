const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const SportModel = require("./models/Sport");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://vaibhavtrip:It'sdatboi11@cluster0.keipr.mongodb.net/Sport?retryWrites=true&w=majority", {
    useNewUrlParser: true,
});

app.post("/insert", async (req, res)=> {
    const sportName = req.body.sportName;
    const days = req.body.days;
    const sport = new SportModel({
        sportName: sportName,
        daysSinceIWatched: days,
    });

    try {
        await sport.save();
        res.send("inserted data");
    } catch(err) {
        console.log(err);
    }
});

app.get("/read", async(req, res)=> {
    SportModel.find({}, (err, result) => {
        if (err) {
            res.send(err);
        }

        res.send(result);
    })
});

app.put("/updateSport", async(req, res)=> {
    const newSportName = req.body.newSportName;
    const id = req.body.id;

    try {
        await SportModel.findById(id, (err, updatedSport)=> {
            updatedSport.sportName = newSportName;
            updatedSport.save();
            res.send("updated sport");
        });
    } catch (err) {
        console.log(err);
    }
});

app.put("/updateDays", async(req, res)=> {
    const newNumDays = req.body.newNumDays;
    const id = req.body.id;

    try {
        await SportModel.findById(id, (err, updatedDays)=> {
            updatedDays.daysSinceIWatched = newNumDays;
            updatedDays.save();
            res.send("updated days")
        });
    } catch (err) {
        console.log(err);
    }
});

app.delete("/delete/:id", async(req, res)=> {
    const id = req.params.id;

    await SportModel.findByIdAndRemove(id).exec();
    res.send("deleted");
});

app.listen(3001, ()=> {
    console.log("server running on port 3001..");
});