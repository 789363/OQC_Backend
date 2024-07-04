# 使用带有 Node.js 的基础镜像
FROM node:16

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装项目依赖，包括全局安装 PM2
RUN npm install && npm install pm2 -g

# 复制项目文件到容器中
COPY . .

# 应用运行在哪个端口
EXPOSE 3000

# 使用 PM2 启动应用
CMD ["pm2-runtime", "start", "npm", "--", "start"]
