// @ts-nocheck

import React, { useEffect, useState } from 'react';
import './Frame.css';
import HeartImg from '../../pixel/heart.png';
import StarImg from '../../pixel/star.png';
import SmallMap from '../../pixel/babble_island.png'
import mapContainer from '../../pixel/map_container.png'
// import HeartImg from '../../../public/assets/pixel/heart';


function Frame({user}) {

  const [stars, setStars] = useState([]);
  const [hearts, setHearts] = useState([1,2]);

  useEffect(()=>{
    const array =[]
    for (let i = 0 ; i < user.stars; i++ ) {
      array.push(i)
    }
    setStars(array)
  },[stars])

  return (
    <>
      {/* <div className='test'>Frame</div> */}
      <div className='top'>
        <div className='nav'>
          <div className='in-nav'>
            <img className='heart' src={HeartImg} />
            {hearts.length>0 && hearts.map(hearts => {
              return <img className='heart' src={HeartImg} />
            })}

          </div>
          <div className='in-nav'>
            {/* <img className='star' src={StarImg} /> */}
            {stars.length>0 && stars.map(star => {
              return <img className='star' src={StarImg} />
            })}
          </div>
        </div>
        <div className='right'>
          <img className='map-container' src={mapContainer}/>
          <img className='map' src={SmallMap} />
        </div>
      </div>



    </>
  )
}

export default Frame