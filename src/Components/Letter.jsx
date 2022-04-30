import React, {useState} from "react";
import { Box, Button } from "@mui/material";
const values = require("../values.json")
function Letter(props) {
    var clr = "secondary";
    if (props.selected === true) {
        clr = "primary";
    }
    console.log(clr)
    return (
    <Box>
        <Button 
        _variant="contained"
        onClick={() => props.onClick(props.letter, props.index)}
        sx={{width: 80, height: 80, fontSize: 36}}  
        color= {clr}
        _active={{
            bg: '#dddfe2',
            transform: 'scale(0.98)',
            borderColor: '#bec3c9',
        }}
        _focus={{
            boxShadow: '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
        }}>
            {props.letter}
            <Box sx={{fontSize: 16}}>
                {values[props.letter]}
            </Box>
            
        </Button>
    </Box>
    
    )
}

export default Letter;