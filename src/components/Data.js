import {useState, useEffect} from "react";
import axios from "axios";
/*
Mysql에서 불러온 데이터를 모아둠
 */

//가맹점 정보 검색
export const StoreList = () => {
    const [stores, setStores] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8082/franchise_store_data');
                setStores(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return(stores);
}

//가맹점 메뉴 검색
export const StoreMenuList = () => {
    const [storeMenus, setStoreMenus]= useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8082/store_menu_data');
                setStoreMenus(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return storeMenus;
}

//가맹점 매출 검색
export const StoreSalesList = () => {
    const [storeSales, setStoreSales]= useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8082/franchise_sales_data');
                setStoreSales(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return storeSales;
}

export const MenuSalesList = () => {
    const [menuSales, setMenuSales]= useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8082/menu_sales_data');
                setMenuSales(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return menuSales;
}