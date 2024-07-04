// 引入 Express 框架
const express = require('express');
// 引入各模塊的路由
const moduleRoutes = require('./routes/moduleRoutes');
const OpRoutes = require('./routes/OpRoutes');

const cors = require('cors');
const machineRoutes = require('./routes/machineRoutes');  // 管理機器相關的路由
const lineRoutes = require('./routes/lineRoutes');
const itemRoutes = require('./routes/itemRoutes');
const resultRoutes = require('./routes/resultRoutes');
const checkItemsRoutes = require('./routes/checkItemsRoutes');
const reasonRoutes = require('./routes/reasonRoutes');
// 引入初始化管理者帳號函式
const createManageUser = require('./models/createManage'); // 导入createAdminUser函数
// 引入 Swagger UI 來自動生成 API 文件
const swaggerUi = require('swagger-ui-express');
// 加載 Swagger JSON 配置文件
const swaggerFile = require('./swagger_output.json');
const moduleOpRoutes = require('./routes/moduleOpRoutes');

// 創建一個 Express 應用
const app = express();

// 配置 CORS 中間件，允許所有域的請求
app.use(cors({
    origin: '*'  // 設置允許來自所有源的跨域請求
}));

// 使用中間件解析 JSON 格式的請求體
app.use(express.json());

// 掛載各路由到應用上，所有路由會添加 '/api' 前綴
app.use('/api', moduleRoutes);
app.use('/api', OpRoutes);
app.use('/api', machineRoutes);
app.use('/api', lineRoutes);
app.use('/api', itemRoutes);
app.use('/api', resultRoutes);
app.use('/api', checkItemsRoutes);
app.use('/api', moduleOpRoutes);
app.use('/api', reasonRoutes);

// 配置 Swagger 文檔路由
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// 添加預設路由
app.get('/', (req, res) => {
    res.send('Success');  // 當訪問根URL('/')時回應 'Success'
});

// 定義服務器監聽的端口
const PORT = process.env.PORT || 3000;
// 啟動服務器
app.listen(PORT, () => {
    createManageUser()
    console.log(`Server is running on http://localhost:${PORT}`); // 伺服器啟動時輸出運行端口
});
