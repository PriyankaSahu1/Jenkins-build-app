import './App.css';
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import UserJob from './Components/UserJob'
import { useEffect, useState } from 'react';
import axios from 'axios';

// importing all staff images
import aswinImage from './static/images/aswin.jpg'
import amarImage from './static/images/amar.jpeg'
import priyankaImage from './static/images/priyanka.jpg'
import sandhyaImage from './static/images/sandhya.jpg'


// The toot component which is statefull
function App() {

  /* 
   jobs is a state variable which holds the jobs array fetched from jenkins when the page is loaded
  
  The jobs array looks like :
  jobs [{
    name: "Some name",
    description: "Some description"
    url: "url of the job"
  }, 
  {
    name: "Some name",
    description: "Some description"
    url: "url of the job"
  }, ...]
  */
  const [jobs, setJob] = useState([])

  // useEffect() hook acts here just like componentDidMount()
  useEffect(() => {

    // axios package is used to fetch jenkins job details from jenkins rest api end point
    axios.get("http://192.168.56.105:8080/api/json?tree=jobs[name,description,url]",
      {
        // Basic HTTP Authentication done with auth property of axios
        auth: {
          username: "priyanka",
          password: "11737edc3f664c10222888328a970b190b"
        }
      })
      .then((res) => {
        console.log(res.data.jobs)
        // set the jobs state variable with job details fetched from jenkins
        setJob(res.data.jobs)
      })
      .catch((err) => console.log(err))
  }, [])

  // the image array conatains all the imoported image of four staff members
  const imageArr = [aswinImage, amarImage, priyankaImage, sandhyaImage]
  let i=0
  // looping through the array and dynamically setting UserJob component with properties from jobs array
  const userJobComp = jobs.slice(0,4).map((job) =>
    <div key={job.name} className="col-3"><UserJob profileImage={imageArr[i++]}
      jobname={job.name}
      jobdesc={job.description}
      endpoint_url={job.url} />
    </div>
  )
  return (
    <div className="main">
      <Navbar />
      <div className="container">
        <div className="row">
          {userJobComp}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
