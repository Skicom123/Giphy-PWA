import axios from 'axios';
import React, {useEffect,useState} from 'react';
import "./Giphy.css"
import { useParams } from 'react-router';
import "./Detail.css"


const Search = () => {
        const [search,setSearch] = useState();
        const [isLoading, setIsLoading] = useState(false)
        const [isError, setIsError] = useState(false)

        const {categoriesName} = useParams()

        useEffect(()=>  {
          const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
  
            try {
              const results = await axios("https://api.giphy.com/v1/gifs/search", {
                params: {
                  api_key: "G7Mvh8eYxDJ9pkUCkoAsT37HWFwiWDEq",
                  q: `${categoriesName}`,
                }
              });
              setSearch(results.data.data);
              console.log(search)
            } catch (err) {
              setIsError(true);
              setTimeout(() => setIsError(false), 4000);
            }

            setIsLoading(false);
          }

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

        const renderGifs = () => {
          if (search === undefined || isLoading) {
            return (
               <div className="text-white text-center">
                 Loading...
                 </div>
            )
          }
          else if (search !== undefined){
            return search.map(el =>{
              return(
                <div key={el.id} className="gif">
                    <img src={el.images.original.url}/>
                </div>
              )
            })
          }
        } 

        return (
            <div className="m-2">
              {renderError()}
              <div className="container d-flex flex-column align-items-center gap-3">{renderGifs()}</div>
            </div>
        
        ); 
};

export default Search;