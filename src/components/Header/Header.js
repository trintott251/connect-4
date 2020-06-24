import React, { Component } from "react";
import "./Header.scss";

class Header extends Component {
    render() {
        return (
            <div className="app">
                <header className="app-header">
                    {this.props.children}
                </header>
            </div>
        );
    }
}

export default Header;