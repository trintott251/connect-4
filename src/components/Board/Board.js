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
                <td column={i} row={row} key={i} checked={false}>
                    <div className={styles.circle} onClick={(e) => this.clickBox(e)}>{row} - {i}</div>
                </td>
            )
        }
        return data;
    }

    clickBox = (e) => {
        let target = e.target;
        let parent = target.parentNode;
        let column = parent.getAttribute("column");
        // let row = parent.parentNode.getAttribute("row");

        let boxToCheck = this.getBoxToCheck(column);
        console.log("boxToCheck", boxToCheck);

        if (target.style.cssText) { 
            return;
        } else {
            let playerTurn = this.state.playerTurn;
            playerTurn == 1 ? boxToCheck.childNodes[0].style.backgroundColor = "red" : boxToCheck.childNodes[0].style.backgroundColor = "blue";
            playerTurn == 1 ? this.setState({playerTurn:2}) : this.setState({playerTurn:1});
            boxToCheck.setAttribute('checked', 'true');
        }
    }

    getBoxToCheck = (column) => {
        let allBoxesInColumn = [];
        var allElements = document.getElementsByTagName('td');
        for (var i = 0, n = allElements.length; i < n; i++)
        {
          if (allElements[i].getAttribute("column") == column)
          {
            allBoxesInColumn.push(allElements[i]);
          }
        }

        let boxToCheck;
        for(let a = allBoxesInColumn.length; a > 0; a--) {
            let item = allBoxesInColumn[a - 1];

            if(item.getAttribute("checked") == null) {
                boxToCheck = item;
                return boxToCheck;
            }
        }
        return null;
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