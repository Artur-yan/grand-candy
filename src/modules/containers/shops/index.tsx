import React, {useEffect, useState} from "react";
import './style.scss'
import BranchApi from "../../../platform/api/branch/branch";
import {Card} from "../../../components/shop/card";
import {IBranchModel} from "../../../platform/api/branch/res/branch-model";
import Map2 from "../../../components/map/shopMap";
import {CircularProgress} from "@material-ui/core";
import t from "../../../i18n/translate";

export function Shops () {

  const [branches, setBranches] = useState<IBranchModel[]>([]);
  const [marks, setMarks] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loader, setLoader] = useState(false);
  const [zoom, setZoom] = useState(13.5);
  const [mapCenter, setMapCenter] = useState(null);

  useEffect(() => {
    setLoader(true)
    BranchApi.branches().then((res) => {

      if (res.data) {
        setBranches([...res.data])
        setSuccess(res.success)
        let newMarks = [];
        res.data.map((val, index) => {
          newMarks[index] = {lat: val.latitude, lng: val.longitude, title: val.title}
          setMarks(newMarks);
        })
      }

      setLoader(false)
    });
  }, [])

  const favorite = (id:number, favoriteIndex) => {
    BranchApi.setFavoriteBranch(id).then((res) => {
      setSuccess(res.success)
      if (res.success) {
        let newBranches = [...branches];
        newBranches.map((branch, index) => {
          index === favoriteIndex ? branch.favorite = true : branch.favorite = false;
        })
        setBranches(newBranches);
      }
    });
  }

  const zoomMap = (val) => {
    setMapCenter({lat:val.latitude, lng: val.longitude})
    setZoom(18)
  }

  return (
    <div className='P-shops'>
      <div className="P-shops-section">
        <div className="P-shop-title">
          {t('more_our_shops')}
        </div>
        <div className="P-shop-card">
          {loader && (
            <CircularProgress size={70} className='G-full-center' color="secondary"/>
          )}
          {branches.length > 0 && branches.map((val, index) => {
            return <Card
              onClick={() => {zoomMap(val)}}
              classes='P-card-item-md'
              isFavorite={val.favorite}
              favorite={() => {favorite(val.id, index)}}
              key={index} shop={val}/>
          })}
        </div>
      </div>
      <div className="P-map">
        {branches.length > 0 && <Map2 center={mapCenter} markers={marks} zoom={zoom}/>}
      </div>
    </div>
  );
}
