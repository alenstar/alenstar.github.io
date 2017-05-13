### 安装hugo  
```
 go get -u -v github.com/spf13/hugo  
 go install github.com/spf13/hugo  
```  

### 生成站点 
```
hugo new site /path/to/site 
``` 

### 安装主题 
```
mkdir themes   
cd themes  
git clone https://github.com/nodejh/hugo-theme-cactus-plus.git  
mv hugo-theme-cactus-plus cactus-plus  
cd cactus-plus  
rm -rf .git  
``` 

### 添加文章  
```
hugo new post/first.md  
```  

### 运行hugo  
```
hugo server --theme=cactus-plus --buildDrafts  
```  

