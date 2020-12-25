import React, {useEffect, useState} from 'react';
import '../style.scss';
import './style.scss'
import {ButtonBase, SearchInputFull} from "../../formElements";
import Logo from "../../../assets/svg/sunCover.svg";
import {Products} from "./products";
import {IProductModel} from "../../../platform/api/products/res/product-model";
import {Link} from "react-router-dom";
import Paths from "../../../routes/paths";
import CategoriesApi from "../../../platform/api/category/category";
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchIcBub from "../../../assets/svg/emptyViews/ic_searchbubbles.svg";
import SearchIc from "../../../assets/svg/emptyViews/ic_search.svg";
import {EmptyView} from "../../emptyView";
import t from '../../../i18n/translate';
import messages from "../../../i18n/messages";
import LanguageStorage from "../../../platform/services/storages/languageStorage";

interface IModal {
  show: boolean,
  close:  () => void,
  submit: () => void,
  onChange: (name, val) => void,
  history:any
}

export function SearchModal(props: IModal) {

  const [search, setSearch] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<IProductModel[]>([]);

  useEffect(() => {

    setSuccess(false);
    if (!!search.trim()) {
      setLoading(true)
      CategoriesApi.search(search.trim()).then((res) => {
        setSuccess(res.success);
        setLoading(false)
        setProducts(res.data.products);
      });
    } else {
      setProducts([])
    }
  }, [search])

  useEffect(() => {
    setSearch('')
  }, [props.show]);

  return (
    <div className='P-modal'>
      <div onClick={props.close} className='P-modal-cover'  style={props.show ? {display: "block"} : {display: "none"}}></div>
      <div className="P-modal-wrapper P-modal-search-wrapper G-bg-white"
           style={{
             transform: props.show && 'translateY(0%)',
             top: props.show ? '0' : '-60%',
             opacity: props.show ? '1' : '0'
           }}>
        <div className='P-search-content'>
          <img className="P-logo-img" src={Logo} alt="logo"/>
          <SearchInputFull value={search} placeholder={messages[LanguageStorage.getLanguage()]['search']} onChange={(value) => {setSearch(value)}}/>
          {props.show && search && <Products onClick={() => {props.close()}} products={products.slice(0, 6)} history={props.history}/>}
          {products.length > 6 && search &&
            <div className='G-mt-32 G-flex-align-center'>
              <Link className='G-width-15' to={`${Paths.PRODUCTS}/?search=${search}`}>
                <ButtonBase loading={false} onClick={props.close} classes='P-btn-bg-ping P-btn-primary'>
                  {t('view_all')}
                </ButtonBase>
              </Link>
            </div>
          }
          {products.length == 0 && search && success &&
            <EmptyView height={200} title={t('empty_faq_title')} desc={t('empty_faq_description')} bubble={SearchIcBub} icon={SearchIc}/>
          }
          <div className='G-flex-horizontal-center'>
            {loading && <CircularProgress color='secondary'/>}
          </div>
          <span className="P-modal-close" onClick={() => props.close()}><i className='icon-ic_close'/></span>
        </div>
      </div>
    </div>
  )
}
