import React, { Component } from "react";
import styles from "./Board.module.scss";

export default class Board extends Component {

    componentDidMount() {

    }

    createBoard = () => {
        let rows = [];
        
        for(let i = 0; i < 6; i++){
            rows.push(<tr key={i}>
                {this.createBoxes()}
            </tr>)
        }
        
        return rows;
    }

    createBoxes = () => {
        let data = [];

        for(let i = 0; i < 7; i++){
            data.push(
                <td></td>
            )
        }

        return data;
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