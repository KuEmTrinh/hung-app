import React from "react";
import "./Header.css";
export default function Header() {
  return (
    <div className="headerBox">
      <div className="headerBoxImage">
        <img src="https://images.unsplash.com/photo-1661961110372-8a7682543120?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"></img>
      </div>
      <div className="headerBoxSlogan">
        <div className="headerBoxSloganContent">
          <p className="headerBoxSloganContentMain">実績があるからこそ</p>
          <p className="headerBoxSloganContentSub">できる業界屈指の高価買取</p>
        </div>
      </div>
    </div>
  );
}
