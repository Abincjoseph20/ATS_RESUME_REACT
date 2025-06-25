import { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../pages/css/Shortlisted.css";


function Shortlisted(){
    const [resumes,setResume]=useState([]);
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/resumes/shortlisted/')
        .then(res=>{
            setResume(res.data);
        })
        .catch(err=>{
            console.error('error fetch resume',err)
        })
    },[]);

    return(
        <div className="shortlisted-container">
            <h2 className="shortlisted-title">Shortlisted Resume</h2>
            {resumes.length === 0?(
                <p className="empty-message">no Shorlisted</p>
            ):(
                <ul className="resumes-list">
                    {resumes.map(resume => (
                    <li key={resume.id}>
                        <Link to={`/candidate/${resume.id}`}>
                        <strong>{resume.name}</strong> - {resume.job_role}
                        </Link>
                    </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
export default Shortlisted;