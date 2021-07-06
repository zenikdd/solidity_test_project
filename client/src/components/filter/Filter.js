import React, {useState} from 'react'
import {FormControl, FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import {FilterConstant} from "../../common";

export const Filter = ({handleChange}) => {

    const [value, setValue] = useState('all')

    return (
        <FormControl component="fieldset">
            <RadioGroup
                value={value}
                onChange={(e) => {
                    setValue(e.target.value)
                    handleChange(e.target.value)
            }}>
                <FormControlLabel value={FilterConstant.ALL} control={<Radio />} label="All" />
                <FormControlLabel value={FilterConstant.COMPLETED} control={<Radio />} label="Completed" />
                <FormControlLabel value={FilterConstant.UNCOMPLETED} control={<Radio />} label="Uncompleted" />
            </RadioGroup>
        </FormControl>
    )
}
