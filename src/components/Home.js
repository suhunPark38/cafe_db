import {Link} from "react-router-dom";

const Home = () => (
    <>
        <h1>카페 데이터베이스 관리 시스템</h1>
        <p>카페 데이터베이스 관리 시스템 홈입니다.</p>
        <nav>
            <ul>
                <li> <Link to={"store"}>가맹점 정보</Link>  </li>
                <li> <Link to={"menu"}>가맹점 메뉴 정보</Link>  </li>
                <li> <Link to={"stock"}>가맹점 재고 카테고리</Link>  </li>
            </ul>
        </nav>
    </>
)

export default Home;