import React, { Component, Fragment } from "react";
import "./App.scss";

import TwoPlayers from './components/Board/Board.js';
import VsComputer from './components/VsComputer/VsComputer.js';
import ChooseGameType from './components/ChooseGameType/ChooseGameType.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasChoosenGameType: false,
            gameType: ""
        };
    }

    setGameType = (gameType) => {
        this.setState({ gameType: gameType, hasChoosenGameType: true })
    }

    render() {
        console.log("gametype", this.state.gameType);
        return (
            <main>
                <header>
                    <p>Connect Four</p>
                </header>
                {
                    !this.state.hasChoosenGameType
                    ? <ChooseGameType 
                        setGameType={(gameType) => this.setGameType(gameType)}
                    />
                    : <Fragment>
                        {
                            this.state.gameType == "vsComputer" && <VsComputer />
                        } 
                        {
                            this.state.gameType == "twoPlayers" && <TwoPlayers />
                        }                    
                    </Fragment>
                }
                
                <footer>
                    <p>@2020 Trinto Thielen</p>
                </footer>
            </main>
        );
    }
}

export default App;