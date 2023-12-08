import Store from "./components/Store";
import Home from "./components/Home";
import StoreSales from "./components/StoreSales";
import StoreMenu from "./components/StoreMenu";
import {Route, Routes} from "react-router-dom";

function App() {
  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/store" element={<Store/>}/>
        <Route path="/menu/:storeId" element={<StoreMenu/>}/>
        <Route path="/sales/:storeId" element={<StoreSales/>}/>
        <Route/>
    </Routes>
  );
}

export default App;
