import React, { useEffect, useRef, useState } from "react";
import Card from 'react-bootstrap/Card';
import './component.css'
import { portfolioContent } from '../data.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRectangleXmark,faGlobe,faFileZipper } from '@fortawesome/free-solid-svg-icons'
const PortFoliocards = ({ displayContent }) => {
    var [cardData, setCardData] = useState(portfolioContent);

    const [modalVal, setModalVal] = useState(0);
    const [show, setShow] = useState(false);
    const rightModal = (val) => {
        setModalVal(val)
        setShow(true)
    }
    const closeModal = () => {
        setModalVal(0)
        document.getElementById('modalBox').className = "hideCard";
        setShow(false)
    }
    useEffect(() => {
        if (displayContent === '*') {
            setCardData(portfolioContent)
        } else {
            const filteredContent = portfolioContent.filter(val => val.filter.includes(displayContent))
            setCardData(filteredContent)
        }
    }, [displayContent])
    return (
        <React.Fragment>
            <div className="d-flex flex-row flex-wrap justify-around gap-4 mt-5">
                { /*mapping the json data in cards*/ }
                {
                    cardData.map((item, index) =>
                        <div className="isoTopeContainer 3d_animation " key={index} style={{ width: '24.8rem', marginTop: '-1.7rem' }}>
                            <Card onClick={() => rightModal(index)} className="imgWrapper p-1" style={{ borderRadius: '0px', cursor: 'pointer' }}>
                                <Card.Img className="cardImg" style={{ borderRadius: '0px' }} variant="top" src={process.env.PUBLIC_URL + '/images/portfolio/screenshots/' + item.img} />
                            </Card>
                            <p className="text-wrap cardLabel" style={{ marginBottom: '30px' }}>{item.label}</p>
                        </div>
                    )
                }
            </div>
            <div>
            { /*mapping the card data */ }
                {
                    show &&
                    <div key={modalVal} id="modalBox" className="portFolioModal" style={{ position: 'fixed', top: '0px', right: '0vw' }}>
                        <div className="d-flex flex-row-reverse" style={{ width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.7)' }}>
                            <Card className="text-start px-3" style={{ width: '50rem', height: '100vh' }}>
                                <button className="btn btn-outline-danger" style={{ width: '50px' }} onClick={closeModal}><FontAwesomeIcon icon={faRectangleXmark} /></button>
                                <Card.Img className="mx-auto mt-3" style={{ borderRadius: '0px', maxWidth: '500px', border: '1px solid black' }} variant="top" src={process.env.PUBLIC_URL + '/images/portfolio/screenshots/' + cardData[modalVal].img} />
                                <Card.Title className="mt-3"><span className="h1">{cardData[modalVal].label}</span></Card.Title>
                                <Card.Text ><span className="h6"><FontAwesomeIcon icon={faGlobe} /> Website: </span><a className="text-decoration-none" href={cardData[modalVal].link} target="_blank" rel="noopener noreferrer">{cardData[modalVal].link}</a></Card.Text>
                                <Card.Text><span className="h6"><FontAwesomeIcon icon={faFileZipper} /> File: </span><a className="text-decoration-none" href={cardData[modalVal].zip} target="_blank" rel="noopener noreferrer">{cardData[modalVal].zip}</a></Card.Text>
                            </Card>
                        </div>
                    </div>
                }
            </div>
        </React.Fragment>
    )
}

export default PortFoliocards