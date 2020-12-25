import React, { useContext, useEffect, useState } from "react";
import { Select } from "../../components/formElements";
import { Card, Breadcrumb as Breadcrumb } from "../../components/products";
import StateContext from "../../contexsts/stateContext";
import CategoriesApi from "../../platform/api/category/category";
import { ICategoryModel } from "../../platform/api/category/res/category-model";
import { IProductModel } from "../../platform/api/products/res/product-model";
import ProductsApi from "../../platform/api/products/products";
import Paths from "../../routes/paths";
import {ProductsSort} from "../../platform/statics/productsSort";
import {ProductsSortEnum} from "../../platform/enums/productsSort";
import {PaginationUi} from "../../components/pagination/pagination";
import {checkBasketDuplications} from "../../platform/services/helpers";
import CircularProgress from "@material-ui/core/CircularProgress";
import t from "../../i18n/translate";
import {RightMenu} from "../../components/modals/rightMenu";
import messages from "../../i18n/messages";
import LanguageStorage from "../../platform/services/storages/languageStorage";

export function Products({match, history}) {

  const { basketState, activeCategory } = useContext(StateContext);
  const [rightMenuIsOpen, setRightMenuIsOPen] = useState(false);
  const [categories, setCategories] = useState<ICategoryModel[]>([]);
  const [products, setProducts] = useState<IProductModel[]>([]);
  const [currentCategory, setCurrentCategory] = useState<ICategoryModel>(null);
  const [sort, setSort] = useState<ProductsSortEnum>(null);
  const [pagination, setPagination] = useState({total: 0, page:0});
  const [currentPage, setCurrentPage] = useState(1);
  const [productsLoader, setProductsLoader] = useState(false);
  const [categoryLoader, setCategoryLoader] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  //content type
  const categoryId = urlParams.get('category');
  const search = urlParams.get('search');
  const all = urlParams.get('products');

  const checkDuplication = (item: IProductModel) => {
    const newBasket = checkBasketDuplications(basketState, item)
    basketState.setBasket(newBasket);
  };

  const setPage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPagination({...pagination, page: value -1 });

    if (all) {
      getProducts(value - 1)
    }

    if (categoryId) {
      productsByCategory(value - 1);
    }

    setCurrentPage(value);
  };

  const getProducts = (page:number) => {
    setCurrentCategory(null)
    setProductsLoader(true)

    ProductsApi.products(page, 9, sort).then((res) => {
      setProducts(res.data.content)
      setProductsLoader(false)
      setPagination({...pagination, total:res.data.totalPages})
    })
  }

  useEffect(() => {
    if (all) {
      getProducts(pagination.page)
    }
  }, [all])

  useEffect(() => {
    if (search) {
      setCurrentCategory(null)
      setProductsLoader(true)

      CategoriesApi.search(search).then((res) => {
        search ? setProducts(res.data.products) : setProducts([])
        setProductsLoader(false)
      });
    }
  }, [search])

  const productsByCategory = (page) => {
    urlParams.set("category", currentCategory.id.toString());
    setProductsLoader(true)

    CategoriesApi.productsByCategory(currentCategory.id, page, 9, sort).then((res) => {
      setProducts(res.data.content)
      setProductsLoader(false)
      setPagination({total:res.data.totalPages, page:0})
    })
    history.push("?"+urlParams.toString())
  }

  useEffect(() => {
    setCurrentPage(1)
    if (sort) {
      categoryId && productsByCategory(0);
      all        && getProducts(0);
    }
  }, [sort])

  useEffect(() => {
    setCategoryLoader(true)
    CategoriesApi.categories(0, 20).then((res) => {
      setCategories(res.data.content)
      setPagination({...pagination, page: 0})
      setCategoryLoader(false)
    });
  }, []);

  useEffect(() => {
    if (categoryId) {
      if (categories.length > 0) {
        if (search || all) {
          urlParams.delete('products');
          urlParams.delete('search');
          history.push("?" + urlParams.toString())
        }
        let category = {...categories[0]}
        category = categories.find(x => x.id === +categoryId) || category;
        setCurrentCategory(category)
      }
    }

  }, [categories, categoryId]);

  useEffect(() => {
    if (currentCategory) {
      productsByCategory(pagination.page)
      activeCategory.setActiveCategory(currentCategory)
      setCurrentPage(1);
    }
  }, [currentCategory]);

  return (
    <div className='P-products G-mb-100'>
      <RightMenu close={() => {setRightMenuIsOPen(false)}} isActive={rightMenuIsOpen}>
        <div className='G-p-15'>
          {categoryLoader ? (
            <CircularProgress size={70} className='G-full-center' color="secondary"/>
          ) : (
            <>
              {categories.length > 0 &&
              categories.map((val, index) => {
                return (
                  <div className={`P-category-section ${currentCategory && currentCategory.id === val.id && 'P-active-category'}`} key={index}>
                    <div className='G-text-md-bold P-category' onClick={() => { setCurrentCategory(val); setRightMenuIsOPen(false) }}>{val.categoryName}</div>
                  </div>
                )
              })
              }
            </>
          )}
        </div>
      </RightMenu>
      <div className='G-flex-column'>
        <div className='G-flex-space-between G-flex-column-mob'>
          <Breadcrumb category={activeCategory.category}/>
          {!urlParams.get('search') &&
            <div className='G-position-relative'>
                <Select placeholder={messages[LanguageStorage.getLanguage()]['sort_by']}
                        data={ProductsSort} classes='G-bg-light-gray G-border-none'
                        onChange={(selectedData) => { setSort(selectedData) }} />
            </div>
          }
        </div>
        <div className='G-flex P-category-content G-flex-column-mob'>
          <div className='G-flex-column G-position-relative P-categories G-width-100-mob G-width-20'>
            <div className='G-flex-space-between'>
              <div className='P-category-title G-text-uppercase'>{t('search_categories')}</div>
              <div onClick={() => {setRightMenuIsOPen(true)}}>
                <a className="burger-icon G-d-desc-none">&#9776;</a>
              </div>
            </div>

            <div className='G-d-mob-none'>
              {categoryLoader ? (
                <CircularProgress size={70} className='G-full-center' color="secondary"/>
              ) : (
                <>
                  {categories.length > 0 &&
                  categories.map((val, index) => {
                    return (
                      <div className={`P-category-section ${currentCategory && currentCategory.id === val.id && 'P-active-category'}`} key={index}>
                        <div className='P-category' onClick={() => { setCurrentCategory(val) }}>{val.categoryName}</div>
                      </div>
                    )
                  })
                  }
                </>
              )}
            </div>
          </div>
          {!productsLoader ?
            <div className='G-width-80 G-width-100-mob'>
              <div className='P-product-card G-m-15 G-flex-wrap'>
                {
                  products.map((val, index) => {
                    return (
                      <Card key={index} classes='P-card-item-lg' product={val} toProductPage={(id:number) => {history.push(`${Paths.PRODUCT}/${id}`)}} onClick={() => {checkDuplication(val)}}/>
                    )
                  })
                }
              </div>
              {pagination && pagination.total > 1 &&
                <div className="G-flex-align-center">
                  <PaginationUi page={currentPage} count={pagination.total} onChange={setPage}/>
                </div>
              }
            </div>
            : (
              <div>
                <CircularProgress size={70} className='G-full-center' color="secondary"/>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}
