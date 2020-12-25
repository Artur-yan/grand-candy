import React, { useState } from 'react';

export function Radio({name, classes = '', value, onChange}) {
    return (
      <label className="P-radio">
        <input type="radio" value={value} name={name} onChange={() => onChange(name, value)}/>
          <span className="checkmark"></span>
      </label>
    );
}
