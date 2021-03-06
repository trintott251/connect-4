import React, { Component, Fragment } from "react";
import styles from "./GameOverDialog.module.scss";

export default class GameOverDialog extends Component {
    render() {
        let { playerWon, title, isDraw } = this.props;
        let colorWon = playerWon == 1 ? "Red" : "Blue";

        return (
            <div className={styles.overlay}>
                <div className={styles.dialog}>
                    <div className={styles.text}>
                        <p className={styles["game-over"]}>{title}</p>
                        {
                            isDraw
                            ? <p className={styles["player-won"]}>It seems it's a draw!</p>
                            : <p className={styles["player-won"]}>Player <span className={colorWon == "Red" ? styles.red : styles.blue}>{colorWon}</span> Won</p>
                        }
                    </div>
                    <button className={styles["play-again"]} onClick={this.props.playAgain}>
                        Play again
                    </button>
                </div>
            </div>
        );
    }
}