import React, {useState} from 'react';

interface IProps {
  type ?: string,
  name: string,
  classes?: string,
  onChange?: (name, value) => void,
  onBlur?: (name, value) => void,
  placeholder : string,
  defaultValue: string
}

export function Textarea(props: IProps) {

    const [value, setValue] = useState(null)

    return (
      <div className='G-width-100 P-input'>
          <textarea
            defaultValue={props.defaultValue}
            name={props.name}
            placeholder={props.placeholder}
            className={`${props.classes} P-textarea`}
            onBlur={(e) => {props.onBlur && props.onBlur(e.target.name, e.target.value)}}
            onChange={(e) => {
              setValue(e.target.value);
              if (props.onChange) {
                props.onChange(e.target.name, e.target.value)
              }
            }}/>
      </div>
    );
}
