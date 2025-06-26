import { useState,useRef } from "react";
import axios from 'axios';


function AudioRecorder(){

    const [isRecording,setIsRecording] = useState(false);
    const [recordedBlob,setRecoredVlob]=useState(null);
    const mediaRecoredRef = useRef(null);
    const audioChunkRef = useRef([]);

}
export default AudioRecorder;