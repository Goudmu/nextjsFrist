// /api/newMeetup
import { MongoClient } from "mongodb";

const handler = async (req, res) => {
    if(req.method === "POST"){
        const data = req.body;

        const client = await MongoClient.connect("mongodb+srv://goudmu:e2f4cKIQH4HeGrag@cluster0.ad3lk.mongodb.net/meetups?retryWrites=true&w=majority");
        const db = client.db();
        const meetupsCollection = db.collection("meetups");

        const result = await meetupsCollection.insertOne(data);
        console.log(result);

        client.close();

        res.status(201).json({message : "Meetup inserted !"});
    }
    if(req.method === "GET"){

    }
}

export default handler;