import React, {useState, useEffect} from "react";
import Letter from "./Letter";
import Board from "./Board";
import { Box, Button, Divider } from "@mui/material";
var seedrandom = require('seedrandom');
const values = require("../values.json")


function Page(props) {

    const [remaining, setRemaining] = useState(3);
    const [points, setPoints] = useState(0);
    const [selected, setSelected] = useState(-1);
    const [board, setBoard] = useState([]);
    const [dropping, setDropping] = useState(false);
    const [allSelected, setAllSelected] = useState([]);
    let inputs = [];

    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", 
    "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    
    
    const calculatePoints = () => {

    }


    const click = (letter, index) => {
        console.log("clicked! " + letter + " " + index)
        // setSelected(index)
        if (allSelected.includes(index)) {
            return;
        }
        const newSelected = allSelected;
        for (let i = 0; i < allSelected.length; i++) {
            newSelected[i] = allSelected[i];
        }
        newSelected.push(index);
        setAllSelected(newSelected)
        const newBoard = [];
        for (let i = 0; i < board.length; i++) {
            newBoard[i] = board[i];
        }
        console.log(board);
        if (board.length === 6) {
            return;
        }

        newBoard.push(letter);
        setBoard(newBoard);
        let total = 0;
        for (let i = 0; i < board.length; i++) {
            total += values[board[i]];
        }
        total += values[letter]
        // console.log(board, total, letter);
        setPoints(total);
        // console.log(board);
        inputs = board.map((l, ind) =>
        <Box key={l + ind} sx={{display: "inline-flex"}}>
            <Letter onClick={click} letter={l} index={ind} selected={true}/>
        </Box>);
    }



    // calculatePoints();

    
    

    
    
    
    const letterList = [];

    let d = new Date();
    let month = d.getMonth()+1;
    let day = d.getDate();
    let year = d.getFullYear();
    //make the random with seed
    seedrandom(`${month} ${day}, ${year}`, { global: true });
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }
    for (let i = 0; i < 8; i++) {
        let item = alphabet[getRandomInt(0, alphabet.length)]; 
        seedrandom(`${month} ${day}, ${year}` + i, { global: true });
        letterList.push(item);

    }

    const [letters, setLetters] = useState(letterList);

    const groupOneList = []
    for (let i = 0; i < 3; i++) {
        let item = alphabet[getRandomInt(0, alphabet.length)]; 
        seedrandom(`${month} ${day}, ${year}` + i + 9, { global: true });
        groupOneList.push(item);

    }

    const groupTwoList = []
    for (let i = 0; i < 3; i++) {
        let item = alphabet[getRandomInt(0, alphabet.length)]; 
        seedrandom(`${month} ${day}, ${year}` + i + 13, { global: true });
        groupTwoList.push(item);

    }

    const groupThreeList = []
    for (let i = 0; i < 3; i++) {
        let item = alphabet[getRandomInt(0, alphabet.length)]; 
        seedrandom(`${month} ${day}, ${year}` + i + 17, { global: true });
        groupThreeList.push(item);

    }


    const [group1, setGroup1] = useState(groupOneList);
    const [group2, setGroup2] = useState(groupTwoList);
    const [group3, setGroup3] = useState(groupThreeList);


    // console.log(letters)
    const listItems = letters.map((le, inde) =>
        <Box key={le + inde} sx={{display: "inline-flex"}}>
            <Letter onClick={click} letter={le} index={inde} selected={allSelected.includes(inde)}/>
        </Box>
    );

    inputs = board.map((l, ind) =>
        <Box key={l + ind} sx={{display: "inline-flex"}}>
            <Letter onClick={click} letter={l} index={ind} selected={true}/>
        </Box>
    );
    

    const drop = () => {
        if (selected === -1) {
            return;
        }
        const letterList = letters;
        const newLetters = [];
        let pool = [];
        if (remaining === 3) {
            pool = group1;
        } else if (remaining === 2) {
            pool = group2;
        } else if (remaining === 1) {
            pool = group3;
        } else {
            return;
        }

        // letters.pop()
        
        for (let i = 0; i < letters.length; i++) {
            if (i !== selected) {
                newLetters.push(letters[i]);
            } else {
                setSelected(-1)
            }
            
        }
        for (let i = 0; i < pool.length; i++) {
            newLetters.push(pool[i]);
        }

        setLetters(newLetters);
        setRemaining(remaining - 1);
        setBoard([]);
    }

    const backspace = () => {
        if (board.length === 0) {
            return;
        }
        const newSelected = allSelected;
        for (let i = 0; i < allSelected.length; i++) {
            newSelected[i] = allSelected[i];
        }
        newSelected.pop();
        setAllSelected(newSelected)
        const newBoard = [];
        for (let i = 0; i < board.length; i++) {
            newBoard[i] = board[i];
        }
        const letter = newBoard.pop();
        setBoard(newBoard);
        let total = 0;
        for (let i = 0; i < board.length; i++) {
            total += values[board[i]];
        }
        total -= values[letter]
        // console.log(board, total, letter);
        setPoints(total);
    }


    return (
        <Box>
            <Box sx={{fontSize: 40}}>WONANA {month}/{day}/{year}</Box>

            <Box>
                board:
                <Box sx= {{marginBottom: 10}}>
                {inputs}
                </Box>
                <Button onClick={backspace}>
                    delete
                </Button>
            </Box>
            
            <Box>
                wonana bank:
                <Box sx= {{marginBottom: 10}}>
                {listItems}
                </Box>
                Points: {points}
                <Divider/>
                Drops Remaining: {remaining}
                <Button onClick={drop}>Drop</Button>
            </Box> 

        </Box>
    )
}

export default Page;