import React, { Component, Fragment } from "react";
import "./App.scss";

import TwoPlayers from './components/Board/Board.js';
import VsComputer from './components/VsComputer/VsComputer.js';

class App extends Component {
    render() {
        return (
            <main>
                <header>
                    <p>Connect Four</p>
                </header>
                {/* <TwoPlayers /> */}
                <VsComputer />
                <footer>
                    <p>@2020 Trinto Thielen</p>
                </footer>
            </main>
        );
    }
}

export default App;