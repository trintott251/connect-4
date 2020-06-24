import React, { Component } from "react";
import styles from "./Board.module.scss";

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerTurn: 1
        };
    }

    createBoard = () => {
        let rows = [];
        
        for(let i = 0; i < 6; i++){
            rows.push(
                <tr row={i} key={i}>
                    {this.createBoxes(i)}
                </tr>
            )
        }
        return rows;
    }

    createBoxes = (row) => {
        let data = [];

        for(let i = 0; i < 7; i++){
            data.push(
                <td column={i} key={i}>
                    <div className={styles.circle} onClick={(e) => this.clickBox(e)}>{row} - {i}</div>
                </td>
            )
        }
        return data;
    }

    clickBox = (e) => {
        let target = e.target;
        console.log(target.style);

        if (target.style.cssText) { 
            return;
        } else {
            let playerTurn = this.state.playerTurn;
            playerTurn == 1 ? target.style.backgroundColor = "red" : target.style.backgroundColor = "black";
            playerTurn == 1 ? this.setState({playerTurn:2}) : this.setState({playerTurn:1});
        }
    }

    render() {
        return (
            <div className={styles["board"]}>
                <table>
                    <tbody>
                        {this.createBoard()}
                    </tbody>
                </table>
            </div>
        );
    }
}