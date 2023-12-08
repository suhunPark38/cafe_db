import React from "react";
import {StoreSalesList} from "./Data";
import {useParams} from "react-router-dom";
import MenuSalesTable from "./MenuSalesTable";
import '../css/Table.css'

const StoreSales = () => {
    const {storeId} = useParams();

    return(
    <>
        <h1>{storeId}번 가맹점 판매량</h1>
        <p> {TotalSales(storeId)} </p>
        {MenuSalesTable(storeId)}
    </>
)
}

const TotalSales = (storeId) => {
    const totalSales = StoreSalesList().filter((sales)=>(sales.store_id.toString() === storeId));
    return(
        <>
            <h2>매출: </h2>
            {totalSales.map(value=> <p style={{fontSize:'30px'}}>{value.sales}</p>)}
        </>
    )
}



export default StoreSales;