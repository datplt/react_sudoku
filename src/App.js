import logo from './logo.svg';
import './App.css';
import React from 'react';
import Board from './Board';
import Header from './Header';
import Footer from './Footer';
var NUMBER_INIT = 24;
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            game: this.initData(),
            gameLevel: null,
            result: null
        }
    }
    initData() {
        return [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
    }
    checkIsExistsInGame(x, y, number) {
        for (let i = 0; i <= 8; i++) {
            if (this.state.game[i][y] === number || this.state.game[x][i] === number) {
                return true;
            }
        }

        let xSquare = x - (x % 3);
        let ySquare = y - (y % 3);
        for (let i = xSquare; i < xSquare + 3; i++) {
            for (let j = ySquare; j < ySquare + 3; j++) {
                if (this.state.game[i][j] === number) {
                    return true;
                }
            }
        }
        return false;
    }

    checkSudokuStatus(game) {
        for (let i = 0; i < 9; i++) {
            let row = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            let square = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            let column = game[i];

            for (let j = 0; j < 9; j++) {
                row[j] = game[j][i];
                let x = Math.floor(i / 3) * 3 + Math.floor(j / 3);
                let y = Math.floor(i * 3 % 9 + j % 3);
                square[j] = game[x][y];
            }
            if (!(this.validate(column.slice()) && this.validate(row.slice()) && this.validate(square.slice())))
                return false;
        }
        return true;
    }

    validate(check) {
        check.sort();
        console.log('================================'+check);
        for(let i = 1; i <= check.length ; i++){
            console.log('number: ' + check[i-1] + ' - i :' + i);
            if (check[i-1] != i)
                return false;
        }
        //check.forEach(function (number) {
        //});
        return true;
    }


    solveSudoku() {
        let y = -1;
        let x = 0;
        do {
            y += 1; //shift to the next cell            
            if (y >= 9) {
                y = 0;
                x += 1;
            }
        } while (this.state.game[x][y] !== 0);//while the cell is fixed (part of the initial setting)

        for (let i = 1; i <= 9; i++) {
            console.log("solution : 1");
            if (this.solve(x, y, i)) {
                return true;
            } else {
                console.log("solution i : " + i);
            }
        }
        return false;
    }

    solve(x, y, value) {
        if (this.checkIsExistsInGame(x, y, value)) return false; //the solution is not consistent
        this.state.game[x][y] = value; //set
        do {
            y += 1; //shift to the next cell

            if (y >= 9) {
                y = 0;
                x += 1;
                if (x === 9) { //column overflow?...solution is complete
                    this.printSudoku();
                    return true;
                }
            }
        } while (this.state.game[x][y] !== 0); //while the field is fixed (part of the initial setting)
        for (let i = 1; i <= 9; i++) { //backtrack
            var result = this.solve(x, y, i);
            if (result) {
                return true;
            } else {
                //console.log("solution j : "+i);
            }
        }
        this.state.game[x][y] = 0; //reset the cell (otherwise it would infere with the backtracking algorithm)
        return false;
    }

    getRandomInt(min, max) {
        var random = Math.floor(Math.random() * (max - min + 1)) + min;
        return random;
    }

    componentDidMount() {
        let x, y, number;
        do {
            let numberInit = NUMBER_INIT;
            this.state.game = this.initData();

            while (numberInit) {
                x = this.getRandomInt(0, 8);
                y = this.getRandomInt(0, 8);
                if (!this.state.game[x][y]) {
                    //console.log('x: '+x+' - y :'+y);
                    number = this.getRandomInt(1, 9);
                    if (!this.checkIsExistsInGame(x, y, number)) {
                        this.state.game[x][y] = number;
                        numberInit--;
                    }
                }
            }
            this.printSudoku();
        } while (!this.solveSudoku());
    }

    printSudoku() {
        var rowStr;
        for (let i = 0; i <= 8; i++) {
            rowStr = "{";
            for (let j = 0; j <= 8; j++) {
                if (this.state.game[i][j]) {
                    rowStr += this.state.game[i][j];
                } else {
                    rowStr += "0";
                }
                if (j !== 8) {
                    rowStr += ",";
                }
            }
            rowStr += "}";
            if (i !== 8) {
                rowStr += ",";
            }
            console.log(rowStr);
        }
    }

    playGame(x, y, value) {
        if (Number.isInteger(Number(value))) {
            this.state.game[x][y] = Number(value);
            this.state.gameLevel -= 1;
            if (this.state.gameLevel === 0) {
                if (this.checkSudokuStatus(this.state.game)) {
                    this.state.result = 'Quá giỏi';
                } else {
                    this.state.result = 'Ngu như bò';
                }
            }
            this.setState({ game: this.state.game })
        }
    }

    selectLevel(e) {
        let x, y;
        this.state.gameLevel = Number(e.target.value);
        var gameLevel = this.state.gameLevel;
        while (gameLevel) {
            x = this.getRandomInt(0, 8);
            y = this.getRandomInt(0, 8);
            console.log(x + ' -- ' + y + ' - ' + this.state.game[x][y]);
            if (this.state.game[x][y]) {
                this.state.game[x][y] = 0;
                gameLevel--;
            }
        }
        this.setState({ gameLevel: this.state.gameLevel, game: this.state.game });
    }

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    {this.state.gameLevel !== null ? null : <Header selectLevel={this.selectLevel.bind(this)} />}
                    {this.state.gameLevel !== null ? <Board game={this.state.game} playGame={this.playGame.bind(this)} /> : null}
                    {this.state.result ? <Footer result={this.state.result} /> : null}
                </div>
            </div>
        );
    }
}
export default App;