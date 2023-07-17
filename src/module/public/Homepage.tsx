import React from "react";

import chainCatalog from '../../image/chainCatalog.jpg';
import glassCatalog from '../../image/glassCatalog.jpg';
import '../../css/Homepage.css';
import { Link } from "react-router-dom";

export const Homepage = () => {
  return (
    <div className="homepage">
      <div className="div">
        <div className="overlap">
          <Link className="ALL-PRODUCT" to='/api/v1/products' >
            <div className="overlap-group">
              <div className="ALL-PRODUCT-wrapper" >
                <h1 className="text-wrapper">All Product</h1>
              </div>
              <div className="text-wrapper-2">Build your real Man</div>
            </div>
          </Link>
        </div>
        <a className="CHAIN" href="/api/v1/products/?catalog=Chain">
          <div className="overlap-3">
            <img className="chain" alt="Chain" src={chainCatalog} />
            <div className="rectangle-2" />
            <div className="text-wrapper-5">Chain</div>
          </div>
        </a>
        <a className="GLASS" href="/api/v1/products/?catalog=Glass">
          <div className="overlap-4">
            <img className="sunglass" alt="Sunglass" src={glassCatalog} />
            <div className="rectangle-3" />
            <div className="text-wrapper-6">Glass</div>
          </div>
        </a>
        <a className="WATCH" href="/api/v1/products/?catalog=Watch" >
          <div className="overlap-2">
            <div className="text-wrapper-4">Watch</div>
          </div>
        </a>
        <a className="TIE" href="/api/v1/products/?catalog=Tie">
          <div className="div-wrapper">
            <div className="text-wrapper-3">TIE</div>
          </div>
        </a>
      </div>
    </div>
  );
};
export default Homepage;