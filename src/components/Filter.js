import React from 'react'
import {
  FormControl,
  Input,
  InputLabel,
  ListItem,
  MenuItem,
  Select,
} from '@mui/material'

function Filter({ value, onChange, options = [], label }) {
  return (
    <FormControl fullWidth>
      <InputLabel id={label}>{label}</InputLabel>
      <Select
        labelId="label"
        id="label"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label={label}
      >
        {
            options.map((option, index) => (
                <MenuItem key={`${index}${option.label}`} value={option.value}>{option.label}</MenuItem>
            ))
        }
      </Select>
    </FormControl>
  )
}

export default Filter
