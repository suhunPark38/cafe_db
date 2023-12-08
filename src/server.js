const express = require('express');
const app = express();
const path = require('path')
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.json());
const cors = require('cors');
app.use(cors());
app.use(express.urlencoded({extended: true}))

const mysql = require('mysql2'); // MySQL 라이브러리 로드

// MySQL 연결 설정
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', //본인 mysql 아이디로 바꿔줘야함
    password: 'qkrtngns0308', //본인 mysql 비번으로 바꿔줘야함
    database: 'cafedb', //본인 db 이름으로 바꿔줘야함
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 데이터베이스 연결 확인
pool.getConnection((err, connection) => {
    if (err) throw err; // 연결에 실패한 경우 예외를 던짐
    console.log('Connected as ID ' + connection.threadId);
    connection.release(); // 연결 해제

    app.listen(8082, function(){
        console.log('listening on 8082')
    });
});
//menu 테이블
app.get('/menu_data', function(요청, 응답) {
    pool.getConnection(function(err, connection){
        if (err) {
            connection.release();
            return console.log(err);
        }

        connection.query('SELECT * FROM menu', function (err, data) {
            connection.release(); // 연결 해제

            if (err) {
                return console.log(err);
            }

            응답.json(data);
        });
    });
});
//menu_category 테이블
app.get('/menu_category_data', function(요청, 응답) {
    pool.getConnection(function(err, connection){
        if (err) {
            connection.release();
            return console.log(err);
        }

        connection.query('SELECT * FROM menu_category', function (err, data) {
            connection.release(); // 연결 해제

            if (err) {
                return console.log(err);
            }

            응답.json(data);
        });
    });
});

//menu_state 테이블
app.get('/menu_state_data', function(요청, 응답) {
    pool.getConnection(function(err, connection){
        if (err) {
            connection.release();
            return console.log(err);
        }

        connection.query('SELECT * FROM menu_state', function (err, data) {
            connection.release(); // 연결 해제

            if (err) {
                return console.log(err);
            }

            응답.json(data);
        });
    });
});

//recipe 테이블
app.get('/recipe_data', function(요청, 응답) {
    pool.getConnection(function(err, connection){
        if (err) {
            connection.release();
            return console.log(err);
        }

        connection.query('SELECT * FROM recipe', function (err, data) {
            connection.release(); // 연결 해제

            if (err) {
                return console.log(err);
            }

            응답.json(data);
        });
    });
});
//stock_name 테이블
app.get('/stock_name_data', function(요청, 응답) {
    pool.getConnection(function(err, connection){
        if (err) {
            connection.release();
            return console.log(err);
        }

        connection.query('SELECT * FROM stock_name', function (err, data) {
            connection.release(); // 연결 해제

            if (err) {
                return console.log(err);
            }

            응답.json(data);
        });
    });
});

//stock_category 테이블
app.get('/stock_category_data', function(요청, 응답) {
    pool.getConnection(function(err, connection){
        if (err) {
            connection.release();
            return console.log(err);
        }

        connection.query('SELECT * FROM stock_category', function (err, data) {
            connection.release(); // 연결 해제

            if (err) {
                return console.log(err);
            }

            응답.json(data);
        });
    });
});


//store_stock 테이블
app.get('/store_stock_data', function(요청, 응답) {
    pool.getConnection(function(err, connection){
        if (err) {
            connection.release();
            return console.log(err);
        }

        connection.query('SELECT * FROM store_stock', function (err, data) {
            connection.release(); // 연결 해제

            if (err) {
                return console.log(err);
            }

            응답.json(data);
        });
    });
});

//store_stock 테이블 수정(방화벽 해제 필수)
app.put('/store_stock_data/:stock_id', function(요청, 응답) {
    const {stock_id} = 요청.params;
    const {store_id, stock_amount, stock_price, stock_import_date, stock_expiration_date, stock_name_code } = 요청.body;


    //not null 인 컬럼은 수정할때 반드시 값을 넣어줘야하므로 null 가능 컬럼만 수정할 수 있게 해줌.
    const query = 'UPDATE store_stock SET stock_amount = ?, stock_price = ?, stock_import_date = ?, stock_expiration_date = ? WHERE stock_id = ?';

    const values = [stock_amount, stock_price, stock_import_date, stock_expiration_date, stock_id];



    pool.getConnection(function(err, connection){
        if (err) {
            connection.release();
            return console.log(err);
        }

        connection.query(query, values, function (err, data) {
            connection.release();
            if (err) {
                return console.log(err);
            }
            응답.send('Store stock updated successfully for stock_id ' + stock_id);
        });
    });
});

//가맹점 메뉴 가져오기
app.get('/store_menu_data', function(요청, 응답) {


    const query = 'SELECT store_id, menu_name, menu_price, menu_explanation, menu_image, menu_category_name, menu_state_name\n '+
        'FROM store_menu s \n'+
        'INNER JOIN menu m on s.menu_id = m.menu_id\n '+
        'INNER JOIN menu_category c on m.menu_category_code = c.menu_category_code\n '+
        'INNER JOIN menu_state st on m.menu_state_code = st.menu_state_code\n' +
        'ORDER BY menu_name;'

    pool.getConnection(function(err, connection){
        if (err) {
            connection.release();
            return console.log(err);
        }

        connection.query(query, function (err, data) {
            connection.release(); // 연결 해제

            if (err) {
                return console.log(err);
            }
            응답.json(data);
        });
    });
});

//franchise_store 테이블
app.get('/franchise_store_data', function(요청, 응답) {
    pool.getConnection(function(err, connection){
        if (err) {
            connection.release();
            return console.log(err);
        }

        connection.query('SELECT\t store_id, store_owner, store_adress, store_tell, store_status_name\n' +
            'FROM\t franchise_store f \n' +
            'INNER JOIN store_status s on f.store_status_code = s.store_status_code ORDER BY store_id;', function (err, data) {
            connection.release(); // 연결 해제

            if (err) {
                return console.log(err);
            }

            응답.json(data);
        });
    });
});

// 가맹점 총 판매량 가져오기
app.get('/franchise_sales_data', function(요청, 응답) {

    pool.getConnection(function(err, connection){
        if (err) {
            connection.release();
            return console.log(err);
        }

        connection.query('SELECT store_id, sum(daily_sales_volume * menu_price) sales \n' +
            'FROM menu_sales_volume sv \n' +
            'INNER JOIN menu m on sv.menu_id = m.menu_id \n' +
            'GROUP BY store_id;'
            , function (err, data) {
            connection.release(); // 연결 해제

            if (err) {
                return console.log(err);
            }

            응답.json(data);
        });
    });
});

//프렌차이즈 메뉴 데이터 불러오기 (이름, 가격, 매출 등등)
app.get('/menu_sales_data', function(요청, 응답) {

    pool.getConnection(function(err, connection){
        if (err) {
            connection.release();
            return console.log(err);
        }

        connection.query('SELECT sm.store_id, m.menu_name, m.menu_price, msv.daily_sales_volume,(msv.daily_sales_volume * m.menu_price) AS total_sales \n'+
        'FROM store_menu sm \n'+
            'JOIN menu m ON sm.menu_id = m.menu_id \n'+
        'JOIN menu_sales_volume msv ON sm.store_id = msv.store_id AND sm.menu_id = msv.menu_id \n'+
        'ORDER BY sm.store_id, m.menu_id, msv.sales_date;'
            , function (err, data) {
                connection.release(); // 연결 해제

                if (err) {
                    return console.log(err);
                }

                응답.json(data);
            });
    });
});


//franchise_store 삽입 테이블, store_adress 스펠링 틀리긴했는데 일단 이걸로 함.
app.post('/franchise_store_data', function(요청, 응답) {
    const { store_id, store_owner, store_adress, store_tell, store_status_code } = 요청.body;
    const query = 'INSERT INTO franchise_store (store_id, store_owner, store_adress, store_tell, store_status_code) VALUES (?, ?, ?, ?, ?)';
    const values = [store_id, store_owner, store_adress, store_tell, store_status_code];

    pool.getConnection(function(err, connection){
        if (err) {
            connection.release();
            return console.log(err);
        }

        connection.query(query, values, function (err, data) {
            connection.release();
            if (err) {
                return console.log(err);
            }
            응답.send('New franchise store added successfully');
        });
    });
});








