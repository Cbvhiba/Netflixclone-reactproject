import React, { useEffect, useState } from 'react'
import './RowPost.css'
import {API_KEY, imageUrl} from '../../constants/constants'
import axios from '../../axios'
import Youtube from 'react-youtube'

function RowPost(props) {
  const [movie, setMovie] = useState([])
  const [urlId, setUrlId] = useState('')
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const handleMovie = (id)=>{
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response =>{
      console.log(response.data)
      if(response.data.results[0]){
        // console.log(response.data)
        setUrlId(response.data.results[0])
      }
      else{
        console.log(response.data.results)
      }
    })
  }
  useEffect(()=>{
    axios.get(props.url).then((response)=>{
      setMovie(response.data.results)
    }).catch(err=>{
      // alert('Network Error')
    })
  })
  
  return (
    <div className='row'>
        <h2>{props.title}</h2>
        <div className="posters">
          {movie.map((obj)=>
            <img onClick={()=>handleMovie(obj.id)} className={props.isSmall ? 'small_poster' : 'poster'} src={`${imageUrl+obj.backdrop_path}`} alt="Posters" />
          )}

        </div>
        {
          urlId && <Youtube videoId={urlId.key} opts={opts} />
        }
        
    </div>
  )
}

export default RowPost
