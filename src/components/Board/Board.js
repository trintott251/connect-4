import React, { Component } from "react";
import styles from "./Board.module.scss";

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerTurn: 1,
            gameOver: false
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
        // console.log("boxToCheck", boxToCheck);

        if (target.style.cssText) { 
            return;
        } else {
            let playerTurn = this.state.playerTurn;
            playerTurn == 1 ? boxToCheck.childNodes[0].style.backgroundColor = "red" : boxToCheck.childNodes[0].style.backgroundColor = "blue";
            boxToCheck.setAttribute('checked', 'true');
            boxToCheck.setAttribute('ownedby', this.state.playerTurn);
            playerTurn == 1 ? this.setState({playerTurn:2}) : this.setState({playerTurn:1});
        }

        this.checkIfWin(parent);
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

    checkIfWin = (target) => {
        // let vertical = this.checkVertical(target);
        // let horizontal = this.checkHorizontal(target);
        let diagonal = this.checkDiagonal(diagonal);
        console.log("horizontal check: ", diagonal)

        // if (this.checkVertical() || this.checkHorizontal() || this.checkDiagonal()) {
        //     return true;
        // } else {
        //     return false;
        // }
    }

    checkVertical = (target) => {
        let turn = this.state.playerTurn;
        let column = target.getAttribute("column");

        let allBoxesInColumn = [];
        var allElements = document.getElementsByTagName('td');
        for (var i = 0, n = allElements.length; i < n; i++) {
            if (allElements[i].getAttribute("column") == column) {
                if(allElements[i].getAttribute("ownedby") !== null) {
                    if(allElements[i].getAttribute("ownedby") == turn) {
                        allBoxesInColumn.push(parseInt(allElements[i].getAttribute("row")));
                    }
                }
            }
        }

        if (this.checkConsec(allBoxesInColumn)) {
            return true;
        } else {
            return false;
        }
    }

    checkHorizontal = (target) => {
        let turn = this.state.playerTurn;
        let row = target.getAttribute("row");

        let allBoxesInRow = [];
        var allElements = document.getElementsByTagName('td');
        for (var i = 0, n = allElements.length; i < n; i++) {
            if (allElements[i].getAttribute("row") == row) {
                if(allElements[i].getAttribute("ownedby") !== null) {
                    if(allElements[i].getAttribute("ownedby") == turn) {
                        allBoxesInRow.push(parseInt(allElements[i].getAttribute("column")));
                    }
                }
            }
        }

        if (this.checkConsec(allBoxesInRow)) {
            return true;
        } else {
            return false;
        }
    }

    checkDiagonal = (target) => {
        let turn = this.state.playerTurn;
        let row = target.getAttribute("row");

        let allBoxesInRow = [];
        var allElements = document.getElementsByTagName('td');
        for (var i = 0, n = allElements.length; i < n; i++) {
            if (allElements[i].getAttribute("row") == row) {
                if(allElements[i].getAttribute("ownedby") !== null) {
                    if(allElements[i].getAttribute("ownedby") == turn) {
                        allBoxesInRow.push(parseInt(allElements[i].getAttribute("column")));
                    }
                }
            }
        }

        if (this.checkConsec(allBoxesInRow)) {
            return true;
        } else {
            return false;
        }
    }

    checkConsec = (array) => {
        var current = null;
        var cnt = 0;

        for (var i = 0; i < array.length; i++) {
            // Also need to make sure the next array item is a consecutive increase.
            if (array[i] != current && array[i] === array[i-1] + 1) {
                if (cnt > 3) {
                    return true;
                }

                current = array[i];
                cnt++;
            } else {
                cnt = 1;
            }
        }

        if (cnt > 3) {
            return true;
        } else {
            return false;
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