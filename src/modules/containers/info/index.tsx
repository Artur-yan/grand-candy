import React, {useEffect, useState} from "react";
import './styles.scss'
import {Privacy} from "./contents/privacy";
import {Terms} from "./contents/terms";
import {Link} from "react-router-dom";
import Paths from "../../../routes/paths";
import {Delivery} from "./contents/delivery";
import t from "../../../i18n/translate";

export function Info({match}) {

  const contents = [
    {
      name: 'terms',
      component: <Terms/>,
      label: t('terms_and_conditions'),
    },
    {
      name: 'delivery',
      component: <Delivery/>,
      label: t('delivery_and_returns'),
    },
    {
      name: 'privacy',
      component: <Privacy/>,
      label: t('privacy_policy'),
    }
  ];

  const [activeContent, setActiveContent] = useState(null);

  useEffect(() => {
    contents.map((content, index) => {
      content.name === match.params.content && setActiveContent(content);
    })
  }, [match.url])

  return (
    <div className='P-info-section G-flex-start G-mb-100'>
      <div className='P-left-menu'>
        {activeContent &&
        contents.map((content, index) => {
          return (
            <Link key={index} to={`${Paths.INFO_PAGES}/${content.name}`}>
              <div className="P-menu-item">
                <span>{content.label}</span>
                {content.name !== activeContent.name ? (
                  <i className="P-menu-arrow icon-ic_arrowdown"></i>
                ) : (
                  <i className="P-menu-arrow icon-ic_arrowright"></i>
                )}
              </div>
            </Link>
          )
        })
        }
      </div>
      <div className='P-info-content'>
        {activeContent ? activeContent.component : contents[0].component}
      </div>
    </div>
  )
}