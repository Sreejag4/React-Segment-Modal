import React from 'react'
import './Header.scss'
import leftArrow from '../../assets/Icons/left-chevron.png';

const Header = ({ headerText }) => {
  return (
    <div className='header-cont'>
      <img src={leftArrow} />
      <p>{ headerText }</p>
    </div>
  )
}

export default Header
