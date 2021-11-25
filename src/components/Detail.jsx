import axios from 'axios';
import React, {useEffect,useState} from 'react';
import "./Giphy.css"
import { useParams } from 'react-router';
import "./Detail.css"


const Search = () => {
        const [data,setData] = useState();
        const [isLoading, setIsLoading] = useState(false)
        const [isError, setIsError] = useState(false)
        const {itemId} = useParams()

        useEffect(()=>  {
          const fetchData = async () => {
              setIsError(false)
              setIsLoading(true);
              try{
                  const results = await axios(`https://api.giphy.com/v1/gifs`, {
                  params: {
                      api_key: 'G7Mvh8eYxDJ9pkUCkoAsT37HWFwiWDEq',
                      ids: `${itemId}`
                  }
              });
              // console.log(results)
              setData(results.data.data);
              } catch (err){
                  setIsError(true);
                  setTimeout(()=> setIsError(false), 4000);
              }
              setIsLoading(false )
          }; 

          fetchData()
        }, []);
    // console.log(data)

        const renderError = () => {
            if(isError){
                return(
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        Unable to Get gifs, Please try again next time
                    </div>
                )
            }
        }

        return (
            <div className="m-2">
              {renderError()}
              {data === undefined ? 'loading' : data.map((item) => {
                return (
                  <div key={item.id} className="container d-flex justify-content-center">
                    <div className="Content">
                      <img src={item.images.original.url} alt="gif" />
                      <p className="Title">{item.title}</p>
                      <p className="Title">Uploaded By: {item.username}</p>
                    </div>
                  </div>
                )
              })}
            </div>
        
        ); 
};

export default Search;