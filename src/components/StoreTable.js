import {StoreList} from "./Data";
import '../css/Table.css'
import {Link} from "react-router-dom";


const StoreTable = () => (
    <>
        <h1>Store Table</h1>
        <table className="table">
            <thead>
            <tr>
                <th>가맹점 ID</th>
                <th>가맹점주</th>
                <th>가맹점 주소</th>
                <th>가맹점 전화번호</th>
                <th>가맹점 상태</th>
                <th>가맹점 메뉴</th>
                <th>가맹점 매출</th>
                <th>가맹점 직원 정보</th>
                <th>가맹점 재고</th>
            </tr>
            </thead>
            <tbody>
            {StoreList().map((store)=>(
                <tr key={store.store_id}>
                    <td>{store.store_id}</td>
                    <td>{store.store_owner}</td>
                    <td>{store.store_adress}</td>
                    <td>{store.store_tell}</td>
                    <td>{store.store_status_name}</td>
                    <td>
                        <Link to={`/menu/${store.store_id}`}>메뉴 보기</Link>
                    </td>
                    <td><Link to={`/sales/${store.store_id}`}>메뉴 보기</Link></td>
                    <td></td>
                    <td></td>
                </tr>
            ))}
            </tbody>
        </table>
    </>
    )


export default StoreTable;