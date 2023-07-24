import React, {useContext} from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {GlobalContext} from "@/components/globalContext";

const animatedComponents = makeAnimated();
const genEdOptions = [
    { value: 'Social & Behavioral Sciences', label: 'Social & Behavioral Sciences' },
    { value: 'Cultural Studies', label: 'Cultural Studies' },
    { value: 'Humanities & the Arts', label: 'Humanities & the Arts' },
    { value: 'Advanced Composition', label: 'Advanced Composition' },
    { value: 'Quantitative Reasoning', label: 'Quantitative Reasoning' },
    { value: 'Natural Sciences & Technology', label: 'Natural Sciences & Technology' },
    { value: 'Composition I', label: 'Composition I' },
];
function FilterOptionsGenEds(props) {
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
            placeholder={'Filter by Gen Eds'}
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            width={'100%'}
            options={genEdOptions}
        />

    );
}

export default FilterOptionsGenEds;