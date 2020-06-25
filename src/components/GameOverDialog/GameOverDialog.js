import React, { Component, Fragment } from "react";
import styles from "./GameOverDialog.module.scss";

export default class GameOverDialog extends Component {
    render() {
        let { playerWon } = this.props;
        let colorWon = playerWon == 1 ? "red" : "blue";
        console.log(colorWon, " player won");

        return (
            <div className={styles.overlay}>
                <div className={styles.dialog}>
                    Game over
                </div>
            </div>
        );
    }
}