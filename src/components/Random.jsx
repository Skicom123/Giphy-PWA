import axios from 'axios';
import React, {useEffect,useState} from 'react';
import "./Giphy.css"

const Giphy = () => {
        const [data,setData] = useState([]);
        const [search, setSearch] = useState("")
        const [isLoading, setIsLoading] = useState(false)
        const [isError, setIsError] = useState(false)
        
        useEffect(()=>  {
        const fetchData = async () => {
                setIsError(false)
            setIsLoading(true);

            try{
                const results = await axios("https://api.giphy.com/v1/gifs/random", {
                params: {
                    api_key: 'G7Mvh8eYxDJ9pkUCkoAsT37HWFwiWDEq',
                }
            });

            console.log(results.data.data)
            setData(results.data.data);
            console.log(data)

            } catch (err){
                setIsError(true);
                setTimeout(()=> setIsError(false), 4000);
            }
            
            setIsLoading(false )
        }; 

        fetchData()
    }, []);

    const renderGifs = () => {
        return(
            <div>
            {data === null && (
                <div>
                    Loading
                </div>
            )}
            {data !== undefined && (
                <div>
                    <img src={data.images === undefined ? "" : data.images.fixed_height.url}></img>
                </div>
            )}
            </div>
        )
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

    // if (isLoading) {
    //     return <h2 className="text-white text-center">Loading...</h2>
    // }

    return (
        <div className="random-page d-flex flex-column align-items-center">
            {renderError()}
            <h1 className="text-center text-white mb-3">Random</h1>
            {isLoading ? <div className="text-white text-center mb-3">Loading...</div> : <div className="container gifs mb-3">{renderGifs()}</div>}
            <div className="centering">
                <a className="btn btn-primary center" href="/random" role="button">Random Gif</a>
            </div>
        </div>
        
    
    ); 
};

export default Giphy;