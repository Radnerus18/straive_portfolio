import React, { useEffect, useRef } from "react";
import logo from '../images/logo.png'
import { portfolios } from '../data.js';
import './component.css'

const Sidenav = ({filterData}) => {
    var toc_data = portfolios;
    var toc_data1 = portfolios.filter(item => {
        return item.name.toLocaleLowerCase() === 'all'
    })
    portfolios.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    })
    toc_data = toc_data1.concat(
        portfolios.filter(item => {
            return item.name.toLocaleLowerCase() !== 'all'
        })
    )
        
    const filterHandle = (item,val) => {
        filterData(item)
        document.querySelectorAll('.menuText').forEach(item=>item.classList.remove('active'))
        document.getElementById(`menuText${val}`).classList.add('active')
    }
    return (
        <React.Fragment>
            <div className="menuContainer d-flex flex-column justify-center align-center text-light shadow mb-5 bg-white rounded" style={{ width: 200 + 'px', height: '100vh' }}>
                <a className="logo_a text-white text-decoration-none h5 py-1" style={{ fontFamily: 'HelveticaNeue-Thin', background: '#FF5000' }} href="https://www.straive.com" target="_blank" rel="noreferrer">
                    <div className="mt-1 pb-2">
                        <img src={logo} style={{ maxWidth: '168px', marginTop: '12px' }} alt=""></img>
                        <span style={{ fontSize: '1.15rem' }}>Connecting the dots</span>
                    </div>
                </a>
                <div className="toc_content" style={{ marginTop: '-8px' }}>
                    <div className="portFolioTitle text-dark py-2" style={{ background: '#FFC3A8', fontSize: '18px', fontFamily: 'Arial, Helvetica, sans-serif' }}>PORTFOLIO</div>
                    <div className="filter-container pt-3">
                        <ul id="menuItemsContainer" className="list-inline menuFilter" style={{ fontSize: '14px', marginLeft: '20px' }}>
                            {
                                toc_data.map((item, index) =>
                                    <li className="menuText text-start" id={`menuText${index}`} key={index} onClick={() => filterHandle(item.type,index)} data-filter={'.' + item.type} >{item.name}
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default Sidenav