import React, {useEffect, useState} from 'react';
import './styles.scss'
import {ICategoryModel} from "../../../platform/api/category/res/category-model";
import CategoriesApi from "../../../platform/api/category/category";
import defaultImg from "../../../assets/img/default.png";
import {Link} from "react-router-dom";

interface IProps {
  show: boolean
}

export function TopMenu(props: IProps) {

  const [categories, setCategories] = useState<ICategoryModel[]>([]);
  const [success, setSuccess] = useState(false);
  const [categoryImg, setCategoryImg] = useState('');

  useEffect(() => {
    CategoriesApi.categories(0, 100).then((res) => {
      if (res) {
        setCategories(res.data.content);
        if (res.data.content.length > 0) {
          setCategoryImg(res.data.content[0].imageUrl)
        }
        setSuccess(res.success);
      } else {
        setSuccess(false)
      }
    });
  }, []);

  const changeImg = (index) => {
    setCategoryImg(categories[index].imageUrl)
  }

  return (
    <div className='P-products-down'>
      <div className={`G-flex P-products-top-menu G-position-absolute ${props.show && 'P-product-open'}`}>
        <div className='P-products-content G-flex G-width-100' style={{opacity: `${props.show ? '1' : '0'}`}}>
          <div className='G-flex G-width-30 P-image' style={{backgroundImage: `url(${categoryImg || defaultImg})`}}>
          </div>
          <div className='G-flex-wrap G-width-70 P-right-section'>
            {success &&
            categories.map((val, index) => {
              return (
                <Link key={index} to={`/products/?category=${val.id}`} className='P-title'>
                  <div onMouseOver={() => changeImg(index)} >{val.categoryName}</div>
                  <div className="P-title-bottom-border"></div>
                </Link>
              )
            })
            }
          </div>
        </div>
      </div>
    </div>
  );
}
