import React from "react";
import {ICategoryModel} from "../../../platform/api/category/res/category-model";
import {Link} from "react-router-dom";
import Paths from "../../../routes/paths";
import t from "../../../i18n/translate";

interface IProps {
  category: ICategoryModel,
  product?: string
}

export function Breadcrumb(props: IProps) {
  return (
    <div className='P-path'>
      <Link to={`${Paths.PRODUCTS}?products=all`}>
        <span className='G-text-md-bold G-color-purple'>{t('products')}</span>
      </Link>
      {props.category &&
        <>
          <span className='G-ml-2 G-mr-2 G-text-md-bold G-color-purple'>/</span>
          <Link to={`${Paths.PRODUCTS}/?category=${props.category.id}`}>
              <span className={`G-text-md-bold ${props.product ? 'G-color-purple' : 'G-color-gray-dark'} `}>
                {props.category && props.category.categoryName}
              </span>
          </Link>
        </>
      }
      {props.product &&
      <>
          <span className='G-ml-2 G-mr-2 G-text-md-bold G-color-purple'>/</span>
          <span className='G-text-md-bold G-color-gray-dark'>{props.product && props.product}</span>
      </>
      }
    </div>
  )
}