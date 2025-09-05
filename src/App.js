
import './App.css';
import axios from "axios";
import { useEffect, useState } from 'react';
import Job from './components/Job.jsx';

function App() {

  const [jobs, setJobs] = useState([]);
  const [update, setUpdate] = useState(true);
  const [filter, setFilter] = useState({
    title: "",
    location: "",
    company: ""
  })
  const [show, setShow] = useState(-1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [jobShow, setJobShow] = useState(false)
  const [jobData, setJobData] = useState({
    title: "",
    location: "",
    salary: "",
    company: ""
  })

  const [resume, setResume] = useState(null)


  const retrieveAllJobs = async () => {
    try {
      const response = await axios.get(`${process.env.API_URL}/api/jobs`);
      setJobs(response.data)
    } catch (err) {

    }
  }

  const handleFormChange = (e) => {
    const { name, value} = e.target;

    setForm(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleChange = (e) => {
    const { name, value} = e.target;

    setFilter(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleJobDataChange = (e) => {
    const { name, value} = e.target;

    setJobData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("myFile", resume, resume.name);
    formData.append("name", form.name)
    formData.append("email", form.email)
    formData.append("phone", form.phone)
    formData.append("filename", resume.name)
    const response = await axios.post(`${process.env.API_URL}/api/jobs/` + show, formData)
    console.log(response)
    setForm({
      name: "",
      email: "",
      phone: "",
    })
    setResume(null)
  }

  const handleUpload = (e) => {
      const selectedFile = e.target.files[0];
      setResume(selectedFile)
  }

  const handleSearch = async () => {
    try{
      const response = await axios.get(`${process.env.API_URL}/api/jobs`, {
        params: {
          title: filter.title,
          location: filter.location,
          company: filter.company
        }
      });

      setJobs(response.data)
    }catch(err){

    }
  }

  const handleJobAdd = () => {
    const { title, location, salary, company} = jobData
    const payload = {
      title,
    location,
    salary,
    company
    }

    const response = axios.post(`${process.env.API_URL}/api/add`, payload);
    setJobShow(false);
    setUpdate(prev => !prev)
  }

  useEffect(() => {
    retrieveAllJobs()
  }, [update])
  return (
    <div style={{display: "flex", flexDirection: "column", gap: "50px", padding: "2rem"}}>
      <h1>Search Jobs</h1>
      <div className='flex gap-30'>
        <label className="form-label" htmlFor="title">Title</label>
        <input className="form-control" type='search' id="title" name="title" value={filter.title} onChange={handleChange}/>
        <label className="form-label" htmlFor="location">Location</label>
        <input className="form-control" type='search' id="location" name="location" value={filter.location} onChange={handleChange}/>
        <label className="form-label" htmlFor="company">Company</label>
        <input className="form-control" type='search'  id="company" name="company" value={filter.company} onChange={handleChange}/>
        <button className="btn btn-primary" type='submit' onClick={handleSearch}> Search</button>
      </div>
      <div className="flex gap-20">
        {
          jobs?.map(job => (
            <Job data={job} setShow={setShow}/>
          ))
        }
      </div>

      {
        show !== -1 ? (
          <div>
         <div className='flex gap-30'>
          <h1>Apply for job</h1>
            <span className='fs-4 mt-2 text-danger text-bold fw-bolder' onClick={() => setShow(-1)}>X</span>
          </div>
        <label className="form-label" htmlFor="name">Name</label>
        <input className="form-control" type='text' id="name" name="name" value={form.name} onChange={handleFormChange}/>
        <label className="form-label" htmlFor="email">Email</label>
        <input className="form-control" type='text' id="email" name="email" value={form.email} onChange={handleFormChange}/>
        <label className="form-label" htmlFor="phone">Phone</label>
        <input className="form-control" type='text' id="phone" name="phone" value={form.phone} onChange={handleFormChange}/>
        <label className="form-label" htmlFor="resume">Resume</label>
        <input className="form-control" type='file' id="resume" name="resume" onChange={handleUpload}/>

        <button className='mt-3 btn btn-warning' type='submit' onClick={handleSubmit}> Submit</button>
          </div>
        ): <div></div>
      }

      <div>
        {
          jobShow ? 
          <>
          <div className='flex gap-30'>
          <h1>Add a Job</h1>
            <span className='fs-4 mt-2 text-danger text-bold fw-bolder' onClick={() => setJobShow(false)}>X</span>
          </div>
          <div className='flex flex-column gap-30'>
          <div>
        <label className="form-label fs-4" htmlFor="title">Title</label>
        <input className="form-control" type='text' id="title" name="title" value={jobData.title} onChange={handleJobDataChange}/>
        <label className="form-label fs-4" htmlFor="location">Location</label>
        <input className="form-control" type='text' id="location" name="location" value={jobData.location} onChange={handleJobDataChange}/>
        <label className="form-label fs-4" htmlFor="company">Company</label>
        <input className="form-control" type='text' id="company" name="company" value={jobData.company} onChange={handleJobDataChange}/>
        <label className="form-label fs-4" htmlFor="salary">Salary</label>
        <input className="form-control" type='text' id="salary" name="salary" value={jobData.salary} onChange={handleJobDataChange}/>
</div>
<div>
        <button className="btn btn-primary" type='submit' onClick={handleJobAdd}> Add Job</button>
</div>
      </div>
          
          </>
          :
          <a role="button" className="btn btn-secondary" onClick={() => setJobShow(true)}>Add Job</a>

        }
      </div>
      
    </div>
  );
}

export default App;
