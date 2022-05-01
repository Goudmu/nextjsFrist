import MeetupList from './../components/meetups/MeetupList';
import Head from 'next/head';
import { Fragment } from 'react';
import { MongoClient } from 'mongodb';

const HomePage = (props) => {
    return (
        <Fragment>
            <Head>
                <title>Next JS</title>
                <meta name='description' content='browse a huge list of highly active react meetups' />
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>
    )
}
export async function getStaticProps() {
    // fetch data from API
    const client = await MongoClient.connect("mongodb+srv://goudmu:e2f4cKIQH4HeGrag@cluster0.ad3lk.mongodb.net/meetups?retryWrites=true&w=majority");
    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    const meetups = await meetupsCollection.find().toArray();
    client.close();

    return {
        props : {
            meetups : meetups.map(data => ({
                title : data.title,
                address : data.address,
                image : data.image,
                id : data._id.toString()
            }))
        } ,
        revalidate : 10
    }
}

// export async function getServerSideProps(context){
//     const req = context.req;
//     const res = context.res;

//     // run in server not client
//     return {
//         props : {
//             meetups : DUMMY_MEETUPS
//         }
//     }
// }

export default HomePage;