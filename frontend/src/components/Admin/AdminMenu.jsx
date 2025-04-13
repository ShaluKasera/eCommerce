import React from "react";
import Layout from "../Layout/Layout";
import { Link } from "react-router-dom";

const AdminMenu = () => {
  return (
    <Layout>
      <div className="list-group">
        <p className="text-center text-3xl font-bold">Admin Pannel</p>
        <Link to='admin-dashboard/create-category'
          
          className="list-group-item list-group-item-action active"
          aria-current="true"
        >
         Create Category
        </Link>
        <Link to='admin-dashboard/create-products' className="list-group-item list-group-item-action">
         Create Products
        </Link>
        <Link to='admin-dashboard/users' className="list-group-item list-group-item-action">
          Users
        </Link>
     
      </div>
    </Layout>
  );
};

export default AdminMenu;
