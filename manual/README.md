### Create Blog Site  
Create the new site using the hugo new site command, and we move into it.  

hugo new site hugo-wercker-example  

```
cd hugo-wercker-example  
``` 

Add the herring-cove theme by cloning it into the theme directory using the following commands.  

```
mkdir themes
cd themes
git clone https://github.com/spf13/herring-cove.git
```
Cloning the project like this will conflict with our own version control, so we remove the external git configuration.  

```
rm -rf herring-cove/.git
```  
Let’s add a quick about page.  

```
hugo new about.md  
```

Now we’ll edit contents/about.md to ensure it’s no longer a draft and add some text to it.

```
hugo undraft content/about.md  
```


Once completed it’s a good idea to do a quick check if everything is working by running

```
hugo server --theme=herring-cove  
```

### Deploy  

```
git checkout -b dev
git push origin --delete master
git branch -d master
git push origin dev

# deploy to master
# TODO
```
