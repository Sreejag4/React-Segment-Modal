import { React, useState } from 'react'
import './HomePage.scss'
import Header from '../Header/Header'
import ModalPopup from '../Modal/Modal';

const HomePage = () => {
    const [isPopupOpen, setPopupOpen] = useState(false);

    const openPopup = () => {
        setPopupOpen(true);
    };

    const closePopup = () => {
        setPopupOpen(false);
    };
    return (
        <div className='home-cont'>
            <Header headerText="View Audience" />
            <button onClick={openPopup}>Save Segment</button>
            {isPopupOpen && <ModalPopup closePopup={closePopup} isPopupOpen={isPopupOpen} />}
        </div>
    )
}

export default HomePage
