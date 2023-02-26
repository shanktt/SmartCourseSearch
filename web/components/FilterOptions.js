import React, {useContext} from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {GlobalContext} from "@/components/globalContext";

const animatedComponents = makeAnimated();
const options = [
    { value: 0, label: 'Nat Sci & Tech' },
    { value: 1, label: 'Social & Beh Sci' },
    { value: 2, label: 'Advanced Composition' },
    { value: 3, label: 'Grand Challenge' },
    { value: 4, label: 'Campus Honors/Chancellor School' },
    { value: 5, label: 'Quantitative Reasoning II' },
    { value: 6, label: 'Humanities' },
    { value: 8, label: 'Cultural Studies' },
    { value: 9, label: 'Composition I' },
    { value: 10, label: 'Quantitative Reasoning I' },
    { value: 11, label: 'James Scholars' },
    { value: 12, label: '1 Credit' },
    { value: 13, label: '2 Credit' },
    { value: 14, label: '3 Credit' },
    { value: 15, label: '4 Credit' }

];
function FilterOptions(props) {
    const {filterOptions, setFilterOptions} = useContext(GlobalContext)

    const optionsHandler = selectedOptions => {
        setFilterOptions(selectedOptions);
        console.log(filterOptions)
        console.log(selectedOptions)
    };
    return (
        <Select
            onChange={optionsHandler}
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
            placeholder={'Choose a filter'}
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            width={'100%'}
            options={options}
        />
    );
}

export default FilterOptions;