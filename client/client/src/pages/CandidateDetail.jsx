import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function CandidateDetails() {
  const { id } = useParams();
  const [resume, setResume] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/resumes/${id}/`)
      .then((res) => {
        console.log('Resume File URL:', res.data.file);
        setResume(res.data);
      })
      .catch((err) => console.error("Error fetching candidate", err));
  }, [id]);

  if (!resume) {
    return <p>Loading candidate details...</p>;
  }

  return (
    <div className="">
      <h2>{resume.name}'s Details</h2>
      <p><strong>Phone:</strong> {resume.phone_number}</p>
      <p><strong>Qualification:</strong> {resume.qualification}</p>
      <p><strong>Job Role:</strong> {resume.job_role}</p>
      <p><strong>ATS Score:</strong> {resume.ats_score}%</p>

      {/* Resume file download button */}
      {resume.file && resume.file.endsWith(".pdf") && (
        <>
          <a
            href={resume.file}
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            <button>Download Resume</button>
          </a>
          
          <a
            href={resume.file}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginLeft: "10px" }}
          >
            <button>View in New Tab</button>
          </a>

          {/* Option 1: Using object tag */}
          <object
            data={resume.file}
            type="application/pdf"
            width="50%"
            height="600px"
            style={{ border: "1px solid #ccc", marginTop: "20px" }}
          >
            <p>
              Your browser doesn't support PDFs. 
              <a href={resume.file} target="_blank" rel="noopener noreferrer">
                Click here to view the PDF
              </a>
            </p>
          </object>
        </>
      )}
    </div>
  );
}

export default CandidateDetails;