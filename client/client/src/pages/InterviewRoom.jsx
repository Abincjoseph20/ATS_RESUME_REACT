import { useState,useEffect, useRef } from "react";
import axios from 'axios';


function InterviewRoom(){
    const [jitsiURL, setJitsiURL] = useState(null);
    const [isRecording,setIsRecording]= useState(false); // for recoreding 
    const [recordedBlob,setRecordedBlob] = useState(null); // save the recoded audio
    const mediaRecorderRef = useRef(null); //Used to start/stop the recording
    const audioChunksRef = useRef([]); // Once recording is stopped, all chunks are combined into a single audio Blob.
    const [candidateName, setCandidateName] = useState("");


    useEffect(()=>{
        axios.post(`http://localhost:8000/api/interview/`)
        .then(res=>{
            setJitsiURL(res.data.jitsi_url);
        })
        .catch( err=>{
            console.error('Failed to create room:',err);
        });
    },[]);


    // Start recording
    const startRecording = async () =>{
        try {
            const stream = await navigator.mediaDevices.getUserMedia({audio:true});
            mediaRecorderRef.current = new MediaRecorder(stream);

            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = event =>{
                audioChunksRef.current.push(event.data)
            };
            
            mediaRecorderRef.current.onstop = () =>{
                const audioBlob = new Blob(audioChunksRef.current,{type:'audio/wav'});
                setRecordedBlob(audioBlob)
                audioChunksRef.current = [];
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);

        } catch (err) {
            console.log("Error accessing microphone:", err);
        }
    };

    const StopRecording = ()=>{
        if(mediaRecorderRef.current){
            mediaRecorderRef.current.stop();
            setIsRecording(false)
        }    
    };

// Upload to Django
    const UploadedAudio = async () =>{
        if (!recordedBlob || !candidateName.trim()){
            alert("Please record audio and enter candidate name")
            return;
        } 
        const formData = new FormData();
        formData.append('audio_file',recordedBlob,'interview.wav');
        formData.append('candidate_name',candidateName)
        try{
            const response = await axios.post(`http://localhost:8000/api/upload-audio/`,formData);
            alert('audio upload succesfuly');
            console.log(response.data);
        } catch(error){
            console.error('Upload failed:', error);
        }
    };

    if (!jitsiURL)return <p>Loading room...</p>

    return(
    <>
        <iframe 
        src={jitsiURL}
        style={{ height: '80vh', width: '100%', border: 'none' }}
        allow="camera; microphone; fullscreen; display-capture"
        title="Jitsi Interview"
        ></iframe>

        <div style={{ marginTop: '10px'}}>
            <input 
                type="text"
                placeholder="Enter Candidate Name"
                value={candidateName}
                onChange={(e)=>setCandidateName(e.target.value)}
                style={{marginBottom:"10px", padding: "5px" }}
            />
            <div>
                {!isRecording ? (
                    <button onClick={startRecording} style={{ marginRight: '10px' }}>
                        Start Audio Recording
                    </button>
                ):(
                    <button onClick={StopRecording} style={{ marginRight: '10px' }}>
                        Stop Audio Recording
                    </button>
                )}
            </div>
            {recordedBlob && (
                <>
                    <audio 
                        controls
                        src={URL.createObjectURL(recordedBlob)}
                        style={{ display: 'block', margin: '10px 0' }}
                    />
                    <button onClick={UploadedAudio}> Upload Audio </button>
                </>
                )}
            </div>
        </>
    );
}

export default InterviewRoom;