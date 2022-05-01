import { useRouter} from 'next/router';
import { Fragment } from 'react';
import Head from 'next/head';
import NewMeetupForm from './../../components/meetups/NewMeetupForm';

const NewMeetupPage = () => {
    const router = useRouter();

    const addMeetupHandler = async (data) => {
        const response = await fetch('/api/newMeetup' , {
            method : "POST",
            body : JSON.stringify(data),
            headers : {'Content-Type': 'application/json',
            'Accept': 'application/json'}
        });

        const datas = await response.json();
        console.log(datas);

        router.push("/");
    }
    return (
        <Fragment>
            <Head>
                <title>Add bew meet up</title>
                <meta name='description' content='add your new meetup' />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </Fragment>
    )
}

export default NewMeetupPage;