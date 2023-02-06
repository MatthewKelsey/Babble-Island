// @ts-nocheck

import React, { useEffect, useState } from 'react';
import './Frame.css';
import HeartImg from '../../pixel/heart.png';
import StarImg from '../../pixel/star.png';
import SmallMap from '../../pixel/bbislandMap.png';
import mapIcon from '../../pixel/mapIcon.png';
import x from '../../pixel/x.png';
import menuIcon from '../../pixel/menuIcon.png';
import settings from '../../pixel/settings.png';
import quit from '../../pixel/quit.png';
// import HeartImg from '../../../public/assets/pixel/heart';


function Frame({user, setUser}) {

  const [stars, setStars] = useState([4,6]);
  const [hearts, setHearts] = useState([1,2]);
  const [popupActive, setPopupActive] = useState(false);
  const [menuActive, setMenuActive] = useState(false);

  useEffect(()=>{
    const array =[1,2,1,1,1,1,1,1,1,1]
    for (let i = 0 ; i < user.stars; i++ ) {
      array.push(i)
    }
    console.log(array)
    console.log(user, 'im a FISH!!!!!')
    setStars(array)
    setUser(user)
  },[])

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
            {(stars.length>=0 && stars.length<5) ?
              stars.map(star => <img className='star' src={StarImg}/>)
              :
              <div className='stars-container'>
                <img className='star' src={StarImg}/>
                <span className='stars-number'>{stars.length}</span>
              </div>
            }
          </div>
        </div>
        <div onClick={() => setPopupActive(true)}>
          <img className='icon' src={mapIcon}/>
        </div>
        {popupActive &&
          <div className='map-container'>
            <img className='map' src={SmallMap} />
            <img className='x' src={x}
            onClick={() => setPopupActive(false)} />
          </div>
        }
      </div>
      <div onClick={() => setMenuActive(true)}>
          <img className='menu' src={menuIcon}/>
      </div>
      {menuActive &&
      <div className='menu-open' onClick={() => setMenuActive(false)}>
        <img className='setting' src={settings}/>
        <img className='quit' src={quit}/>
      </div>}



    </>
  )
}

export default Frame