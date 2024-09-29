import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareInstagram } from "@fortawesome/free-brands-svg-icons"; 
import { faSquareFacebook} from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"; 

function Footer() {
    return (
        <>
        <footer>
            <div className="f-info">
                <div className="f-info-socials">
                <FontAwesomeIcon className='footer-icon' icon={faSquareInstagram} />
                <FontAwesomeIcon className='footer-icon' icon={faSquareFacebook} />
                <FontAwesomeIcon className='footer-icon' icon={faLinkedin} />
                </div>
                <div className="">&copy;TastyBites Private Limited</div>
                <div className="f-info-links">
                    <a href="#">Privacy</a>
                    <a href="#">Terms</a>
                </div>
            </div>
        </footer>
        </>
    )
}

export default Footer