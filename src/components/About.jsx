import React, {useState, useEffect} from "react";
import axios from "axios";
import "./About.css"

function About(){
   // const [data, setData] = useState('')

   // useEffect(() => {
   //    async function fetchData() {
   //      const request = await axios
   //        .get(`https://api.github.com/users/ilhamdaffa21`)
   //        .then((res) => setData(res.data))
   //        .catch((e) => Alert.alert('Gagal!', e))
   //      return
   //      request
   //    }
   //    fetchData()
   //  }, [])
  
   return(
   <div className = "card" >
       <p> About GIPHER: </p>
       <p> GIPHER is an app for gif lover</p>
       <p> Made using React.js </p>
       <p> Using API from developer.giphy.com </p>
       <p> Made by: Fajar Rahmana Rajab</p>
       <p> ig: fajarrahmanarajab || line: fajarrajab</p>

    </div>
   );
}

export default About;