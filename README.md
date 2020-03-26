# IPFS ETHEREUM BLOG

## 简介
基于以太坊和[IPFS](https://ipfs.io)实现的博客系统。在IPFS上使用DAG存储博客文章，将根hash值存在以太坊上。

合约使用[truffle](https://www.trufflesuite.com/)开发和部署，前端使用的是[react](https://github.com/facebook/react)框架。

网页前端一般需要配合[metamask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn)插件使用。

## 开发
使用git下载仓库
```
git clone https://github.com/myse1f/ipfs-eth-blog.git
```
安装依赖包
```
合约部署的依赖
npm install

前端的依赖
cd client
npm install
```

### 合约开发
合约开发参考truffle中的教程。
如果需要在测试网络或者主网下部署合约，可以自己修改truffle-config中的配置，在项目根目录下创建.secret文件，里面填写自己的助记词。
初次运行迁移,部署合约
```
truffle migrate --reset
```

### 前端开发
前端使用react框架，在client目录下创建.env文件，需要以下几个参数
```
REACT_APP_IPFS_API=
REACT_APP_IPNS=

REACT_APP_MY_GITHUB=
REACT_APP_MY_WEIXIN=
REACT_APP_MY_WEIBO=

REACT_APP_DEV_PUBKEY=
REACT_APP_PROD_PUBKEY=
```
分别是IPFS API的地址，可以是自己本地启动的ipfs节点；IPNS为自己节点的ID，方便访问；下面三个为自己社交网络的地址，为可选；DEV和PROD的PUBKEY代表自己在开发环境和生产环境中的公钥，用于权限访问（只有博客主才能添加新文章和编辑文章）

开发流程参考react的，可以自行进行hack。
```
npm start
```
启动开发环境，可以在浏览器localhost:3000预览

## 部署
运行`npm run build`将项目打包，要将打包部署到IPFS网络，这里使用[pinata](https://pinata.cloud/)进行部署。pinata提供ipfs的pin服务，每个用户有免费的1GB空间。

在client目录下，的.env文件中，添加两个参数
```
IPFS_DEPLOY_PINATA__API_KEY=
IPFS_DEPLOY_PINATA__SECRET_API_KEY=
```

安装ipfs-deploy工具
```
npm install -g ipfs-deploy
```

运行部署
```
ipd build -p pinata
```
会返回一个项目的QmHash值，将其绑定到自己的ipfs id，方便使用ipns访问
```
ipfs name publish ${QmHash}
```
接下来在自己的网关中访问
```
http://gateway/ipns/ipfsid
```