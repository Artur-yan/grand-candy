import React, {useEffect, useState} from 'react';
import Checkbox from '@material-ui/core/Checkbox';

export function Check({onChange, name, isChecked = false}) {

  const [checked, setChecked] = useState(isChecked)

  useEffect(() => {
    setChecked(isChecked)
  }, [isChecked])

  return (
    <Checkbox
      checked={checked}
      name={name}
      onChange={() => {
        setChecked(!checked);
        onChange(!checked, name);
      }}
      inputProps={{'aria-label': 'primary checkbox'}}
    />
  );
}
