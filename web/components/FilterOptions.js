import React, {useContext} from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {GlobalContext} from "@/components/globalContext";

const animatedComponents = makeAnimated();
const options = [
    { value: 0, label: 'Social & Behavioral Sciences' },
    { value: 1, label: 'Cultural Studies' },
    { value: 2, label: 'Humanities & the Arts' },
    { value: 3, label: 'Advanced Composition' },
    { value: 4, label: 'Quantitative Reasoning' },
    { value: 5, label: 'Natural Sciences & Technology' },
    { value: 6, label: 'Composition I' },
    { value: 7, label: '0 Credit' },
    { value: 8, label: '1 Credit' },
    { value: 9, label: '2 Credit' },
    { value: 10, label: '3 Credit' },
    { value: 11, label: '4 Credit' },
    { value: 12, label: '5 Credit' },
    { value: 13, label: '6 Credit' },
    { value: 14, label: '7 Credit' },
    { value: 15, label: '8 Credit' },
    { value: 16, label: '6 Credit' },
    { value: 17, label: '7 Credit' },
    { value: 18, label: '8 Credit' },
    { value: 15, label: '9 Credit' },
    { value: 16, label: '10 Credit' },
    { value: 17, label: '11 Credit' },
    { value: 18, label: '12 Credit' },
];
function FilterOptions(props) {
    const {filterOptions, setFilterOptions} = useContext(GlobalContext)

    const optionsHandler = selectedOptions => {
        setFilterOptions(selectedOptions);
    };
    return (
        <Select
            onChange={optionsHandler}
            value={filterOptions}
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