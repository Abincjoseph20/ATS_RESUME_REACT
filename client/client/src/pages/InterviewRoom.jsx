import { useState,useEffect } from "react";
import axios from 'axios';


function InterviewRoom(){
    const [jitsiURL, setJitsiURL] = useState(null);

    useEffect(()=>{
        axios.post(`http://localhost:8000/api/interview/`)
        .then(res=>{
            setJitsiURL(res.data.jitsi_url);
        })
        .catch( err=>{
            console.error('Failed to create room:',err);
        });
    },[]);

    if (!jitsiURL)return <p>Loading room...</p>

    return(
        <iframe 
        src={jitsiURL}
        style={{ height: '80vh', width: '100%', border: 'none' }}
        allow="camera; microphone; fullscreen; display-capture"
        title="Jitsi Interview"
        ></iframe>
    )
}

export default InterviewRoom;