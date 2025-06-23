import { useState } from 'react'
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
  name: '',
  phone_number: '',
  qualification: '',
  job_role: '',
  file: null,
});

const [result, setResult] = useState(''); //it is string
const [matchedKeywords, setMatchedKeywords] = useState([]);
const [isSubmitting, setIsSubmitting] = useState(false);

const roles = [
  'web developer', 'data analyst', 'hr recruiter', 'php developer',
  'doctor', 'lawyer', 'nurse', 'software developer', 'backend developer',
  'frontend developer'
];

const qualification = [
  '10th', '12th', 'Diploma', 'UG', 'PG', 'MBA', 'MCA',
  'PhD', 'BTech', 'MTech', 'BSc', 'MSc', 'BA', 'MA',
  'BCom', 'MCom', 'LLB', 'LLM', 'BBA', 'BCA'
];


const handleChange = (e)=>{
  const {name,value} = e.target;
  setFormData(prev =>({
    ...prev,
    [name]:value,
  }));
};

const handleFile = (e) =>{
  setFormData(prev=>({
    ...prev,
    file: e.target.files[0],  
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
   setIsSubmitting(true);
   setResult('');
   setMatchedKeywords([]);


   const submitData = new FormData();
   submitData.append('name', formData.name);
   submitData.append('phone_number', formData.phone_number);
   submitData.append('qualification', formData.qualification);
   submitData.append('job_role', formData.job_role);
   submitData.append('file', formData.file);

   try{
    const res = await axios.post('http://127.0.0.1:8000/api/resumes/', submitData,{
  headers: {
    'Content-Type': 'multipart/form-data',
    },
  });
    setResult(`ATS Score: ${res.data.ats_score}%`);
    let keywords = [];
    if (res.data.matched_keywords) {
        try {
            // If it's a string, parse it
            keywords = typeof res.data.matched_keywords === 'string' 
                ? JSON.parse(res.data.matched_keywords)
                : res.data.matched_keywords; // If it's already an array
        } catch (parseError) {
            console.error('Error parsing matched_keywords:', parseError);
            keywords = [];
        }
    }
    setMatchedKeywords(keywords);
   }catch (err){
      console.error(err);
      setResult('Something went wrong!');
   } finally{
     setIsSubmitting(false);
   }
}


  return(
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px' }}>
      <h2>ATS Resume Score Checker</h2>
      <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
          <input type="text" name="phone_number" placeholder="Phone Number" value={formData.phone_number} onChange={handleChange} required />

          <select name="qualification" value={formData.qualification} onChange={handleChange} id="">
            <option value="">select Qlification</option>
            {qualification.map(qual=>(
              <option key={qual} value={qual}>{qual}</option>
            ))}
          </select>

          <select name="job_role" value={formData.job_role} onChange={handleChange} required>
            <option value="">Select Job Role</option>
            {roles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>


          <input type="file" name="file" accept=".pdf,.docx" onChange={handleFile} required />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Resume'}
          </button>
        </form>

          { result && (
            <div style={{ marginTop: '20px' }}>
                <h3>{result}</h3>
                {matchedKeywords.length > 0 && (
                  <>
                  <h4>Matched Keywords:</h4>
                    <ul>
                    {matchedKeywords.map((word, index) => (
                      <li key={index}>{word}</li>
                    ))}
                  </ul>
                  </>
                )}
            </div>
          )}
    </div>
  );
}
export default App;