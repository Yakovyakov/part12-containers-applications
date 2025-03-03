import { useState } from 'react'


export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const onReset = (event) => {
    setValue('')
  }


  return {
    inputFields:{
      type,
      value,
      onChange
    },
    onReset,
    setValue
  }
}

