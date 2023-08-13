import { Link } from "react-router-dom";
import '../../css/footer.css'

 
const Footer = () => {
    return ( 
    <div className="Footer"style={{marginBottom:'30px'}}>
        <div className="footer-contact-wrapper">
			<div className="entry-title"><h3>Need help?</h3><h3>(+800) 1234 5678 90</h3></div>
			<div className="entry-description">
			<p>We are available 8:00am – 7:00pm</p>
			</div>
	    </div>
        <div className="FooterWrapper">
        <div className="column">
            <h2 className="Column-heading">Information</h2>
            <div className="field">About Us</div>
            <div className="field">Privacy Policy</div>
            <div className="field">Returns Policy</div>
            <div className="field">Shipping Policy</div>
            <div className="field">Dropshipping</div>
        </div>
        <div className="column">
            <h2 className="Column-heading">Categories</h2>
            <Link className="field" to={'/products/?catalog=Chain'}>Chain</Link>
            <Link className="field" to={'/products/?catalog=Tie'}>Tie</Link>
            <Link className="field" to={'/products/?catalog=Watch'}>Watch</Link>
            <Link className="field" to={'/products/?catalog=Glass'}>Glass</Link>
        </div>
        <div className="column">
            <h2 className="Column-heading">Customer Relationship</h2>
            <div className="field">Help</div>
            <div className="field">EMail Us</div>
            <div className="field">Shopping Introducer</div>
        </div>
        </div>
        </div>
     );
}
 
export default Footer;