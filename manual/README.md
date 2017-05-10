### Create Blog Site  
Create the new site using the hugo new site command, and we move into it.  

hugo new site hugo-wercker-example  

``` bash  
cd hugo-wercker-example  
``` 

Add the herring-cove theme by cloning it into the theme directory using the following commands.  

``` bash  
mkdir themes
cd themes
git clone https://github.com/spf13/herring-cove.git
```
Cloning the project like this will conflict with our own version control, so we remove the external git configuration.  

``` bash  
rm -rf herring-cove/.git
```  
Let’s add a quick about page.  

``` bash  
hugo new about.md  
```

Now we’ll edit contents/about.md to ensure it’s no longer a draft and add some text to it.

``` bash
hugo undraft content/about.md  
```


Once completed it’s a good idea to do a quick check if everything is working by running

``` bash  
hugo server --theme=herring-cove  
```

### Deploy  

``` bash  
git checkout gh-pages
git branch -d master
git push origin --delete master
git checkout -b master
git push origin master
git branch -d master
```

