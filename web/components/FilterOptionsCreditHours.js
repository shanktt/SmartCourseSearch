import React, {useContext} from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {GlobalContext} from "@/components/globalContext";

const animatedComponents = makeAnimated();
const creditHourOptions = [
    { value: 0, label: '0 Credit' },
    { value: 1, label: '1 Credit' },
    { value: 2, label: '2 Credits' },
    {  value: 3, label: '3 Credits' },
    {  value: 4, label: '4 Credits' },
    {  value: 5, label: '5 Credits' },
    {  value: 6, label: '6 Credits' },
    {  value: 7, label: '7 Credits' },
    {  value: 8, label: '8 Credits' },
    {  value: 9, label: '9 Credits' },
    {  value: 10, label: '10 Credits' },
    {  value: 11, label: '11 Credits' },
    {  value: 12, label: '12 Credits' }, 
];
function FilterOptionsCreditHours(props) {
    const {filterOptionsCreditHours, setFilterOptionsCreditHours} = useContext(GlobalContext)

    const optionsHandler = selectedOptions => {
        setFilterOptionsCreditHours(selectedOptions);
    };
    return (
        <Select
            onChange={optionsHandler}
            value={filterOptionsCreditHours}
            styles={{
                control:(baseStyles, state) => (
                    {
                        ...baseStyles,
                        boxShadow: "unset",
                        border:  state.isFocused ? '1px solid black' : '1px solid black',
                    }
                ),
                menu: (baseStyles, state) => (
                    {
                        ...baseStyles,
                        border: "unset",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor: "black"
                    }
                ),
                option: (baseStyles, state) => (
                    {
                        ...baseStyles,
                        backgroundColor: "unset",
                        paddingTop: '5px',
                        paddingBottom: '5px',
                        fontSize: '14px',
                        cursor: "pointer",
                        ':hover': {
                            textDecoration: 'underline'
                        },
                        transition: "textDecoration 250ms ease 0s, opacity 250ms ease 0s"
                    }
                )
            }}
            placeholder={'Filter by Credit Hours'}
            closeMenuOnSelect={false}
            components={animatedComponents}
            width={'100%'}
            options={creditHourOptions}
        />

    );
}

export default FilterOptionsCreditHours;