// Sidebar.js
import React from 'react';
import './Sidebar.scss'

const Sidebar = ({ showSidebar, toggleSidebar }) => {
  return (
    <div className={`sidebar ${showSidebar ? "active" : ""}`}>
      <button className="close-btn " onClick={toggleSidebar}>✖</button>
      <h2>Vos favoris</h2>
      <p>Aucun favori ajouté...</p>
    </div>
  );
};

export default Sidebar;
