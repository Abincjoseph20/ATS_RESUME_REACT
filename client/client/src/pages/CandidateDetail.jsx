import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";

function CandidateDetails(){
    const {id} = useParams();
    const [resume,setResume]=useState(null)

    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/api/resumes/${id}/`)
        .then(res=>setResume(res.data))
        .catch(err=> console.error("Error fetching candidate", err))
    },[id]);

    if(!resume){
        return <p>Loading candidate details...</p>;
    }
    return(
        <div className="">
            <h2>{resume.name}'s Details</h2>
            <p><strong>phone:</strong>{resume.phone_number}</p>
            <p>{resume.qualification}</p>
            <p>{resume.job_role}</p>
            <p>{resume.ats_score}</p>
            <a 
            href={`http://127.0.0.1:8000${resume.file}`}
            download
            target="_blank" 
            rel="noopener noreferrer"
            >
                <button>Download Resume</button>
            </a>
        </div>
    );
}

export default CandidateDetails;