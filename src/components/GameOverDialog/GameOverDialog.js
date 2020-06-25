import React, { Component, Fragment } from "react";
import styles from "./GameOverDialog.module.scss";

export default class GameOverDialog extends Component {
    render() {
        let { playerWon } = this.props;
        let colorWon = playerWon == 1 ? "Red" : "Blue";

        return (
            <div className={styles.overlay}>
                <div className={styles.dialog}>
                    <div className={styles.text}>
                        <p className={styles["game-over"]}>Game over</p>
                        <p className={styles["player-won"]}>Player <span className={colorWon == "red" ? styles.red : styles.blue}>{colorWon}</span> Won</p>
                    </div>
                    <button className={styles["play-again"]} onClick={this.props.playAgain}>
                        Play again
                    </button>
                </div>
            </div>
        );
    }
}