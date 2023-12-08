import React, {useState} from "react";
import axios from "axios";

const AddStore = () => {
    const [formData, setFormData] = useState({
        store_id:'', store_owner:'', store_adress:'', store_tell:'', store_status_code:''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8082/franchise_store_data', formData);
            console.log('Data inserted successfully!');
            // Add any additional logic or feedback as needed
            window.location.reload();
        } catch (error) {
            console.error('Error inserting data:', error);
            // Handle errors or provide feedback to the user
        }
    };

    return(
        <>
            <h2>가맹점 정보 추가하기</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    가맹점 ID: <input type="text" name="store_id" value={formData.store_id} onChange={handleChange}/>
                </label>
                <label>
                    가맹점주: <input type="text" name="store_owner" value={formData.store_owner} onChange={handleChange}/>
                </label>
                <label>
                    가맹점 주소: <input type="text" name="store_adress" value={formData.store_adress} onChange={handleChange}/>
                </label>
                <label>
                    가맹점 전화번호: <input type="text" name="store_tell" value={formData.store_tell} onChange={handleChange}/>
                </label>
                <label>
                    가맹점 상태: <input type="text" name="store_status_code" value={formData.store_status_code} onChange={handleChange}/>
                </label>

                <button type="submit">추가하기</button>
            </form>
        </>
    )

}

export default AddStore;