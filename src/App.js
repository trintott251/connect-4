import React, { Component, Fragment } from "react";
import "./App.scss";

import Board from './components/Board/Board.js';

class App extends Component {
    render() {
        return (
            <main>
                <header>
                    <p>Connect Four</p>
                </header>
                <Board />
                <footer>
                    <p>@2020 Trinto Thielen</p>
                </footer>
            </main>
        );
    }
}

export default App;