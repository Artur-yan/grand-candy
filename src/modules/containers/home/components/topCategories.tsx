import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Paths from "../../../../routes/paths";
import {ButtonBase} from "../../../../components/formElements";
import {ITopCategoryModel} from "../../../../platform/api/category/res/top-category-model";
import CategoriesApi from "../../../../platform/api/category/category";
import {CircularProgress} from "@material-ui/core";
import t from "../../../../i18n/translate";

export function TopCategories({history}) {

  const categoriesColors = [
    'linear-gradient(to right, #F96776 , #EE549D)',
    'linear-gradient(to right, #FFC578 , #FF8F44)',
    'linear-gradient(to right, #71DFC9 , #65B9B4)',
    'linear-gradient(to right, #DF71AF , #D471DF)',
    'linear-gradient(to right, #32C5DC , #1FA3E2)',
    'linear-gradient(to right, #FC9F91 , #DE5151)',
    'linear-gradient(to right, #92F6AD , #47C257)',
    'linear-gradient(to right, #FCEA78 , #F9CC4E)',
  ];

  const [categories, setCategories] = useState<ITopCategoryModel[]>(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true)
    CategoriesApi.topCategories().then((res) => {
      setCategories(res.data.slice(0, 8))
      setLoader(false)
    });
  }, [])

  return (
    <div className='G-mt-100 G-position-relative'>
      <h3>{t('home_page_top_categories')}</h3>

      {loader ? (
        <CircularProgress size={70} className='G-full-center' color="secondary"/>
      ) : (
        <>
          <div className="P-top-categories">
            {categories && (
              categories.map((val, index) => {
                return (
                  <div key={index} className='P-top-category G-cursor-pointer' onClick={() => {
                    history.push(`${Paths.PRODUCTS}?category=${val.id}`)
                  }} style={{backgroundImage: `${categoriesColors[index]}`}}>
                    <div className='P-category-desc'>
                      <h4 className='G-mb-7'>{val.categoryName}</h4>
                      <span>{val.productCount} {t('products')}</span>
                    </div>
                    <div className="P-category-img" style={{backgroundImage: `url(${val.imageUrl}/250/250)`}}/>
                  </div>
                )
              })
            )}
          </div>
          <div className='G-mt-80 G-flex-align-center'>
            <Link className='G-width-20' to={`${Paths.PRODUCTS}?products=all`}>
              <ButtonBase loading={false} onClick={() => {
              }} classes='P-btn-bg-ping P-btn-primary'>
                {t('search_all_categories')}
              </ButtonBase>
            </Link>
          </div>
        </>
      )}
    </div>
  )
}