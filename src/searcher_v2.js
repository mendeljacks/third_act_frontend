import {CircularProgress, TextField} from '@material-ui/core'
import {Autocomplete, createFilterOptions} from '@material-ui/lab'
import {observer} from 'mobx-react-lite'
import {identity} from 'ramda'
import React from 'react'


// /**
//  * @param {Object} props
//  * @param {SearcherStore} props.searcher_store 
//  * @param {Function} props.render_op 
//  * @param {any} props.value 
//  * @param {Function} props.onChange 
//  * @param {String} props.label 
//  * @param {Boolean} props.required 
//  * @param {any} props.error 
//  */
const SearcherV2_ = ({
    input_value,
    set_input_value,
    selected_option,
    set_selected_option,
    options,
    options_are_prefiltered,
    render_option,
    get_option_label,
    label,
    helper_text,
    is_loading,
    is_open,
    set_is_open,
    required,
    error,
    disabled,
    fullWidth,
    disableClearable,
}, ref) => {
    // console.log('rerendering...', toJS(searcher_store.options))
    // useEffect(() => {
    //     console.log('running effect')
    //     searcher_store.on_mount()
    // }, [])
    const filterOptions = createFilterOptions({
        limit: 20,
        stringify: option => JSON.stringify(option)
    })

    return <>
        <Autocomplete
            disableClearable={disableClearable}
            fullWidth={fullWidth}
            disabled={disabled}
            options={options}
            renderOption={render_option}
            getOptionLabel={option => get_option_label(option) ?? ''}
            getOptionSelected={(option, test_value) => get_option_label(option) === get_option_label(test_value)}
            value={Object.keys(selected_option).length === 0 ? null : selected_option}
            onChange={(e, option) => {
                set_selected_option(option ?? {})
            }}
            inputValue={input_value}
            onInputChange={(e, input_text, reason) => {
                set_input_value(input_text, reason)
            }}
            renderInput={props =>
                <TextField
                    label={label}
                    required={required}
                    error={error}
                    {...props}
                    variant='outlined'
                    helperText={helper_text}
                    inputRef={ref}
                    inputProps={{
                        ...props.inputProps,
                        autoComplete: 'new-password'
                    }}
                    InputProps={{
                        ...props.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {is_loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {props.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            }
            selectOnFocus
            open={is_open}
            onOpen={e => set_is_open(true)}
            onClose={e => set_is_open(false)}
            loading={is_loading}
            onKeyDown={e => {
                if (e.key === 'Enter') {
                    if (is_loading) {
                        // handle this by delaying execution until is_loading is false
                    }

                    const option_filter = options_are_prefiltered
                        ? () => {}
                        : raw_options => filterOptions(raw_options, {
                            inputValue: input_value,
                            getOptionLabel: option => (get_option_label(option) ?? '')
                        })

                    const filtered_options = option_filter(options)

                    if (filtered_options.length === 1) {
                        const first_option = filtered_options[0]
                        if (first_option) {
                            set_selected_option(first_option)
                        }
                        set_is_open(false)
                    }
                }
            }}
            filterOptions={options_are_prefiltered
                ? identity
                : filterOptions
            }
        />
    </>
}

export const SearcherV2 = observer(SearcherV2_, {forwardRef: true})