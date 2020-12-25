import React, {useState, useEffect} from 'react';
import {ClickOutside} from "../../platform/services/helpers";

export function Select({classes = '', onChange, data, placeholder}) {

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState({index:'', name:'', data:[0]});

  useEffect(() => {
    if (selected.name) {
      onChange(selected.data)
    }
  }, [selected])

  return (
    <ClickOutside onClickOutside={() => setIsOpen(false)}>
      <div className={`${classes} P-select G-flex-space-between G-bg-light-gray`} onClick={() => setIsOpen(!isOpen)}>
        <span className='G-font-md'>{selected.name ? selected.name : placeholder}</span>
        <i className='icon-ic_arrowdown G-arrow-down-sm G-pr-2 G-flex-vertical-center'/>
        <div className={`P-select-content ${isOpen ? '' : 'G-d-none'}`}>
          {
            data.map((val, index) => {
              return (
                <div className={selected.index === val.index ? 'P-select-active' : ''} onClick={() => {setSelected(val)}} key={index}>{val.name}</div>
              )
            })
          }
        </div>
      </div>
    </ClickOutside>
  );
}
