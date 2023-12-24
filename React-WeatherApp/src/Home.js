import React from 'react'
import {useState, useEffect} from 'react'
import image from './sun.png'
import location from './location4.png'
import cloud from './cloud.png'
import wind from './wind7.png'
import search from './images.png'

const Home = () => {

  const [info, setinfo] = useState('');
  const [title, settitle] = useState('london');
  const [isclicked, setclicked] = useState(false);
 
  const key = 'bbfbd26e60f048b295d7985328b8b00a';
  const apiurl = `https://api.weatherbit.io/v2.0/current?city=${title}&key=${key}`;

  useEffect(() => {
      fetch(apiurl)
      .then((res) => res.json())
      .then((data) => {
        if(data.data && data.data.length > 0){   
        setinfo(data.data[0])
      }
        else{
          console.log('error')
        }}
        )
      const side = document.getElementById('sidediv');   
      setclicked(false);    
  }, [isclicked])
// to make equally render with others like sun image app_temp the background als0 equally render with updated info
  useEffect(() => {
    changebackground();

  }, [info])
  
    function startsearching(){     
      setclicked(true);  
        
    }

    function changebackground(){

      const side = document.getElementById('sidediv');
     
      if(info.weather && info.weather.description === 'Broken clouds'){
        side.style.backgroundImage = `url(${require('./cloudy.jpg')})`;
      }
      else if(info.weather && info.weather.description === 'Clear sky'){
        side.style.backgroundImage = `url(${require('./sunny.jpeg')})`;      
      } 
      
    }  

 
  return (
    <div className="home">

        <div id="sidediv" className="sidecloud">
          <div className="heading">
              <div className="inputs">
                <input type="text"  
                        placeholder="Enter city names"
                        value={title}
                        onChange={(e) => settitle(e.target.value)}
                        />
                  <button onClick={startsearching}>
                    <img src={search} alt="" />
                  </button>

              </div>
              
              <img src={image} alt="" id="sun"/>
              <div className="temprature">
                <p>{info.app_temp}°C</p>
              </div>
               
              <div className="location">
                    <div className="locimg">
                      <img src={location} alt="" />
                    </div>
                    <h3>{info.city_name}</h3>

              </div>
               
              <div className="two">
                  <div className="firstdiv">
                        <img src={cloud} alt="" />

                        <p>{info.clouds}%</p>
                        <p id="clouds"><span>Clouds</span></p>
                     
                  </div>
                  <div className="seconddiv">
                    <img src={wind} alt="" />
                    <p id="spd">{info.wind_spd} </p>
                    <p><span>Windspeed(km/hr)</span></p>
                                         
                  </div>
              </div>
          </div>
        </div>

    </div>
   );
}
 
export default Home;