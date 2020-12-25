import {ButtonBase} from "../../formElements";
import React from "react";
import {BonusEnum} from "../../../platform/enums/bonus";
import t from "../../../i18n/translate";

interface IProps {
  nextContent: (BonusEnum) => void,
}

export function Activate(props: IProps) {
  return (
    <div className="P-bonus-modal-actions">
      <div className="P-action-title">
        {t('bonus_card_activation')}
      </div>
      <div className="P-action-description">
        {t('bonus_bottom_sheet_description')}
      </div>
      <div className='G-width-50'>
        <ButtonBase loading={false} classes='P-btn-bg-ping P-btn-primary' onClick={() => {
          props.nextContent(BonusEnum.verify)
        }}>
          {t('bonus_bottom_sheet_title')}
        </ButtonBase>
      </div>
    </div>
  )
}