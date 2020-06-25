import React, { Component, Fragment } from "react";
import styles from "./Board.module.scss";
import GameOverDialog from '../GameOverDialog/GameOverDialog';

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // tableInit: [],
            table: [],
            playerTurn: 1,
            gameOver: false,
            playerWon: null
        };
    }

    componentDidMount = () => {
        this.createBoard();
    }

    createBoard = () => {
        let rows = [];
        
        for(let i = 0; i < 6; i++) {
            rows.push(
                <tr row={i} key={i}>
                    {this.createBoxes(i)}
                </tr>
            )
        }

        // if (this.state.tableInit.length == 0) {
        //     this.setState({ tableInit: rows.slice(), table: rows });
        // } else {
        //     this.setState({ table: this.state.tableInit })
        // }

        this.setState({ table: rows });
    }

    createBoxes = (row) => {
        let data = [];

        for(let i = 0; i < 7; i++){
            data.push(
                <td column={i} row={row} key={i} checked={false}>
                    <div className={styles.circle} onClick={(e) => this.clickBox(e)}></div>
                </td>
                // <td column={i} row={row} key={i} checked={false} onClick={(e) => this.clickBox(e)}>
                //     <div className={styles.circle}></div>
                // </td>
            )
        }
        return data;
    }

    clickBox = (e) => {
        if (this.state.gameOver) {
            return;
        }

        let target = e.target;
        let parent = target.parentNode;
        let column = parent.getAttribute("column");

        let boxToCheck = this.getBoxToCheck(column);
        
        if (boxToCheck !== null) {
            if (boxToCheck.getAttribute("checked") !== null) { 
                return;
            } else {
                let playerTurn = this.state.playerTurn;
                playerTurn === 1 ? boxToCheck.childNodes[0].style.backgroundColor = "red" : boxToCheck.childNodes[0].style.backgroundColor = "blue";
                boxToCheck.setAttribute('checked', 'true');
                boxToCheck.setAttribute('ownedby', this.state.playerTurn);
                this.checkIfWin(boxToCheck)
                playerTurn === 1 ? this.setState({playerTurn:2}) : this.setState({playerTurn:1});
            }
        }
    }

    // clickBox = (e) => {
    //     let target = e.target;

    //     // if (target.tagName !== "td") {
    //     //     return null;
    //     // }

    //     let child = target.childNodes[0];
    //     let column = target.getAttribute("column");
    //     console.log("target", target);
    //     // let row = parent.parentNode.getAttribute("row");

    //     let boxToCheck = this.getBoxToCheck(column);
    //     console.log("boxToCheck", boxToCheck);

    //     if (target.style.cssText) { 
    //         return;
    //     } else {
    //         let playerTurn = this.state.playerTurn;
    //         playerTurn == 1 ? boxToCheck.childNodes[0].style.backgroundColor = "red" : boxToCheck.childNodes[0].style.backgroundColor = "blue";
    //         boxToCheck.setAttribute('checked', 'true');
    //         boxToCheck.setAttribute('ownedby', this.state.playerTurn);
    //         playerTurn == 1 ? this.setState({playerTurn:2}) : this.setState({playerTurn:1});
    //     }

    //     this.checkIfWin(target);
    // }

    getBoxToCheck = (column) => {
        let allBoxesInColumn = [];
        var allElements = document.getElementsByTagName('td');
        for (var i = 0, n = allElements.length; i < n; i++)
        {
          if (allElements[i].getAttribute("column") === column)
          {
            allBoxesInColumn.push(allElements[i]);
          }
        }

        let boxToCheck;
        for(let a = allBoxesInColumn.length; a > 0; a--) {
            let item = allBoxesInColumn[a - 1];

            if(item.getAttribute("checked") == null) {
                boxToCheck = item;
                this.setState({lastCheckedBox: item});
                return boxToCheck;
            }
        }
        return null;
    }

    checkIfWin = (target) => {
        if (this.checkVertical(target) || this.checkHorizontal(target) || this.checkDiagonal(target)) {
            this.setState({ gameOver: true, playerWon: this.state.playerTurn });
        }
    }

    checkVertical = (target) => {
        let turn = this.state.playerTurn;
        let column = target.getAttribute("column");

        let allBoxesInColumn = [];
        var allElements = document.getElementsByTagName('td');
        for (var i = 0, n = allElements.length; i < n; i++) {
            if (allElements[i].getAttribute("column") === column) {
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
            if (allElements[i].getAttribute("row") === row) {
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
        return this.diagonalRightTop(target) || this.diagonalLeftTop(target);
    }

    diagonalRightTop = (target) => {
        let turn = this.state.playerTurn;
        let row = target.getAttribute("row");
        let column = target.getAttribute("column");

        let allBoxesDiagonal = [];
        var allElements = document.getElementsByTagName('td');

        for (var i = 0, n = allElements.length; i < n; i++) {
            if ((allElements[i].getAttribute("row") == row) && (allElements[i].getAttribute("column") == column)) {
                allBoxesDiagonal.push(parseInt(allElements[i].getAttribute("column")));
            }

            for (var a = 1; a < 4; a++) {
                if ((allElements[i].getAttribute("row") == (parseInt(row) + a)) && (allElements[i].getAttribute("column") == (parseInt(column) - a))) {
                    if(allElements[i].getAttribute("ownedby") !== null) {
                        if(allElements[i].getAttribute("ownedby") == turn) {
                            allBoxesDiagonal.push(parseInt(allElements[i].getAttribute("column")));
                        }
                    }
                }
            }
            for (var a = 1; a < 4; a++) {
                if ((allElements[i].getAttribute("row") == (parseInt(row) - a)) && (allElements[i].getAttribute("column") == (parseInt(column) + a))) {
                    if(allElements[i].getAttribute("ownedby") !== null) {
                        if(allElements[i].getAttribute("ownedby") == turn) {
                            allBoxesDiagonal.push(parseInt(allElements[i].getAttribute("column")));
                        }
                    }
                }
            }
        }

        if (this.checkConsec(allBoxesDiagonal)) {
            return true;
        } else {
            return false;
        }
    }

    diagonalLeftTop = (target) => {
        let turn = this.state.playerTurn;
        let row = target.getAttribute("row");
        let column = target.getAttribute("column");

        let allBoxesDiagonal = [];
        var allElements = document.getElementsByTagName('td');

        for (var i = 0, n = allElements.length; i < n; i++) {
            if ((allElements[i].getAttribute("row") == row) && (allElements[i].getAttribute("column") == column)) {
                allBoxesDiagonal.push(parseInt(allElements[i].getAttribute("column")));
            }

            for (var a = 1; a < 4; a++) {
                if ((allElements[i].getAttribute("row") == (parseInt(row) + a)) && (allElements[i].getAttribute("column") == (parseInt(column) + a))) {
                    if(allElements[i].getAttribute("ownedby") !== null) {
                        if(allElements[i].getAttribute("ownedby") == turn) {
                            allBoxesDiagonal.push(parseInt(allElements[i].getAttribute("column")));
                        }
                    }
                }
            }
            for (var a = 1; a < 4; a++) {
                if ((allElements[i].getAttribute("row") == (parseInt(row) - a)) && (allElements[i].getAttribute("column") == (parseInt(column) - a))) {
                    if(allElements[i].getAttribute("ownedby") !== null) {
                        if(allElements[i].getAttribute("ownedby") == turn) {
                            allBoxesDiagonal.push(parseInt(allElements[i].getAttribute("column")));
                        }
                    }
                }
            }
        }

        if (this.checkConsec(allBoxesDiagonal)) {
            return true;
        } else {
            return false;
        }
    }

    checkConsec = (array) => {
        var current = null;
        var cnt = 0;

        array.sort(function(a, b) {
            return a - b;
        });

        for (var i = 0; i < array.length; i++) {
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

    playAgain = () => {
        console.log("play again pressed");
        this.setState({ gameOver: false, playerWon: null, playerTurn: 1 });
    }

    render() {
        let { gameOver, playerWon } = this.state;

        return (
            <Fragment>
                {
                    gameOver 
                    ? <GameOverDialog
                        playAgain={() => this.playAgain()}
                        playerWon={playerWon}
                    />
                    : <div className={styles["board"]}>
                        <table>
                            <tbody>
                                {this.state.table}
                            </tbody>
                        </table>
                    </div>
                }
            </Fragment>
        );
    }
}