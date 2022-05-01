import { MongoClient ,ObjectId } from 'mongodb';
import Head from 'next/head';
import { Fragment } from 'react';
import MeetupDetail from './../../components/meetups/MeetupDetail';

const MeetupDetails = (props) => {
    return(
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name='description' content={props.meetupData.description} />
            </Head>
            <MeetupDetail 
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            descripton={props.meetupData.description}
            />
        </Fragment>
    )
}

export async function getStaticPaths(){
    const client = await MongoClient.connect("mongodb+srv://goudmu:e2f4cKIQH4HeGrag@cluster0.ad3lk.mongodb.net/meetups?retryWrites=true&w=majority");
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const meetups = await meetupsCollection.find({}, {_id : 1}).toArray();
    client.close();
    return {
        fallback : false,
        paths : meetups.map(data => ({params : {meetupId : data._id.toString()}}))
    }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect("mongodb+srv://goudmu:e2f4cKIQH4HeGrag@cluster0.ad3lk.mongodb.net/meetups?retryWrites=true&w=majority");
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const selectedMeetups = await meetupsCollection.findOne({_id : ObjectId(meetupId)});
    client.close();
    console.log(selectedMeetups)

    return {
        props : {
            meetupData : {
                id : selectedMeetups._id.toString(),
                title : selectedMeetups.title,
                address : selectedMeetups.address,
                description : selectedMeetups.description,
                image : selectedMeetups.image
            }
        }
    }
}

export default MeetupDetails;