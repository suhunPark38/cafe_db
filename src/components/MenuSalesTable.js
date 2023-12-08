import {MenuSalesList} from "./Data";
import '../css/Table.css'

const MenuSalesTable = (storeId) => {
    const filteredList = MenuSalesList().filter((store)=>(store.store_id.toString() === storeId));
    return(
        <>
            <h1>Store Table</h1>
            <table className="table">
                <thead>
                <tr>
                    <th>메뉴 이름</th>
                    <th>메뉴 가격</th>
                    <th>메뉴 판매량</th>
                    <th>메뉴 매출</th>
                </tr>
                </thead>
                <tbody>
                {filteredList.map((value)=>(
                    <tr key={value.store_id}>
                        <td>{value.menu_name}</td>
                        <td>{value.menu_price}</td>
                        <td>{value.daily_sales_volume}</td>
                        <td>{value.total_sales}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}

export default MenuSalesTable;