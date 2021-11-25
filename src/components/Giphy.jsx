import axios from 'axios';
import React, {useEffect,useState} from 'react';
import Loader from "./Loader"
import "./Giphy.css"
import { NavLink } from 'react-router-dom';


const Giphy = (props) => {
        const [data,setData] = useState([]);
        const [search, setSearch] = useState("")
        const [isLoading, setIsLoading] = useState(false)
        const [isError, setIsError] = useState(false)
        
        const [currentPage] = useState(1);
        const [itemsPerPage] = useState(100);
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

        const {history} = props

        useEffect(()=>  {
        const fetchData = async () => {
                setIsError(false)
            setIsLoading(true);

            try{
                const results = await axios("https://api.giphy.com/v1/gifs/trending", {
                params: {
                    api_key: 'G7Mvh8eYxDJ9pkUCkoAsT37HWFwiWDEq',
                    limit: 100
                }
            });

            console.log(results)
            setData(results.data.data);

            } catch (err){
                setIsError(true);
                setTimeout(()=> setIsError(false), 4000);
            }
            
            setIsLoading(false )
        }; 

        fetchData()
    }, []);
    console.log(currentItems)

    const renderGifs = () => {
            if(isLoading){
                return <Loader/>;
            }
        return currentItems.map(el =>{
            return(
                <div key={el.id} className="gif">
                  <NavLink to={`/giphy/${el.id}`} onClick={() => history.push(`/giphy/${el.id}`)}>
                    <img src={el.images.fixed_height.url}/>
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

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
    }

    const handleSubmit = async event => {
        event.preventDefault();
        setIsError(false);
        setIsLoading(true);
    
        try {
          const results = await axios("https://api.giphy.com/v1/gifs/search", {
            params: {
              api_key: "G7Mvh8eYxDJ9pkUCkoAsT37HWFwiWDEq",
              q: search,
            }
          });
          setData(results.data.data);
        } catch (err) {
          setIsError(true);
          setTimeout(() => setIsError(false), 4000);
        }
    
        setIsLoading(false);
      };


    return (
        <div className="m-2">
        {renderError()}
        <h1 className="text-center text-white mb-3">Trending</h1>
        <form className="form-inline justify-content-center m-2 formstyle">
          <input
            value={search}
            onChange={handleSearchChange}
            type="text"
            placeholder="search"
            className="form-control"
          />
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary mx-2"
          >
            Go
          </button>
        </form>
         <div className="container gifs">{renderGifs()}</div>
        </div>
    
    ); 
};

export default Giphy;