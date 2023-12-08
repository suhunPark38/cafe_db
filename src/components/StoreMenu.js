import React from "react";
import {StoreMenuList} from "./Data";
import {useParams} from "react-router-dom";
import '../css/Table.css'

const StoreMenu = () => {
    const {storeId} = useParams();

    const storeMenu = StoreMenuList().filter((menu)=>(menu.store_id.toString() === storeId))

    return(
        <>
            <h2> {storeId}번 가맹점 메뉴 정보</h2>
            <div>
                <table className='table'>
                    <thead>
                    <tr>
                        <th>메뉴 이름</th>
                        <th>메뉴 이미지</th>
                        <th>메뉴 가격</th>
                        <th>메뉴 설명</th>
                        <th>메뉴 종류</th>
                        <th>메뉴 상태</th>
                    </tr>
                    </thead>
                    <tbody>
                    {storeMenu.map((menu)=>(
                        <tr key={menu.menu_name}>
                            <td>{menu.menu_name}</td>
                            <td> <img src={menu.menu_image} alt={menu.menu_name} style={{width:"200px", height:"200px"}}/> </td>
                            <td>{menu.menu_price}</td>
                            <td>{menu.menu_explanation}</td>
                            <td>{menu.menu_category_name}</td>
                            <td>{menu.menu_state_name}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default StoreMenu;