import axios from 'axios';
import React, {useEffect,useState} from 'react';
import "./Giphy.css"
import "./Categories.css"
import { NavLink } from 'react-router-dom';



const Giphy = (props) => {
        const [data, setData] = useState([]);
        const [isLoading, setIsLoading] = useState(false)
        const [isError, setIsError] = useState(false)

        const {history} = props
        
        useEffect(()=>  {
        const fetchData = async () => {
                setIsError(false)
            setIsLoading(true);

            try{
                const results = await axios("https://api.giphy.com/v1/gifs/categories", {
                params: {
                    api_key: 'G7Mvh8eYxDJ9pkUCkoAsT37HWFwiWDEq',
                }
            });

            console.log(results.data.data)
            setData(results.data.data);
            

            } catch (err){
                setIsError(true);
                setTimeout(()=> setIsError(false), 4000);
                console.log(err)
            }
            
            setIsLoading(false)
        }; 

    fetchData()
    }, []);

    const renderOption = () => {
        return data.map(el =>{
          return(
              <div key={el.id}>
                <NavLink to={`/categories/${el.name}`} onClick={() => history.push(`/categories/${el.name}`)}>
                  <div style={{color:'white'}} className="btn btn-primary">
                    {el.name}
                  </div>
                </NavLink>
              </div>
          )
      })
    }

    const renderError = () => {
        if(isError){
            return(
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    Unable to Get gifs, Please try again next time
                </div>
            )
        }
    }
    
    if (isLoading) {
      return <h2 className="text-white text-center">Loading...</h2>
    }

    return (
        <div className="m-2">
        {renderError()}
          <h1 className="text-center text-white mb-3">Categories</h1>
          <div className="container d-flex justify-content-start gap-3 flex-wrap mb-5">
            {renderOption()}
          </div>
        </div>
    ); 
};

export default Giphy;