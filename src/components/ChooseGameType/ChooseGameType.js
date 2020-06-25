import React, { Component, Fragment } from "react";
import styles from "./ChooseGameType.module.scss";

export default class GameOverDialog extends Component {
    render() {
        let { setGameType } = this.props;

        return (
            <div className={styles.overlay}>
                <div className={styles.dialog}>
                    <div className={styles.text}>
                        <p className={styles["welcome"]}>Welcome</p>
                        <p className={styles["choose-game"]}>Choose your game type</p>
                    </div>
                    <div className={styles["buttons-container"]}>
                        <button onClick={() => setGameType("vsComputer")}>
                            Single player
                        </button>
                        <button onClick={() => setGameType("twoPlayers")}>
                            Two players
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}