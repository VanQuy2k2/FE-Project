import React from 'react';
import { Link } from 'react-router-dom';

export default function Menu_Left_Account() {
  return (
    <div className="left-sidebar">
      <h2>Account</h2>
      <div className="panel-group category-products" id="accordian">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">
              <Link to="/account">account</Link>
            </h4>
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">
              <Link to="/account/product/list">My product</Link>
            </h4>
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">
              <Link to="/account/product/add">Add product</Link>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
