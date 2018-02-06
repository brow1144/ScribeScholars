# Scribe Scholars  

## Project Documents 

* [Project Charter](https://docs.google.com/document/d/1rlNgGtS7QHZ3wr4Sp7D-LHs86oG0ozcbQydpwGDW4HE/edit?usp=sharing "Project Charter")
* [Product Backlog](https://docs.google.com/document/d/1ym-jV3zYGEfxxFjqYO0vz74T2HTIqgt0LOLZ027VM7M/edit?usp=sharing "Project Backlog")
* [Project Name](https://docs.google.com/document/d/1qU51leG5VEBYa4LwjqhnjOvpiPV0-KM6tztAhCRCd6M/edit?usp=sharing "Project Name")
* [Code Repository Setup](https://docs.google.com/document/d/13LSVg4G2cMyUz8bLSyp4DuyX_siBgqqaxNRlFp25WIo/edit?usp=sharing "Code Repository Setup")
* [Design Document](https://docs.google.com/document/d/14O7Y7iUnMbdKpfP351IBvpko4Sjz3i7CBKBjFg_ovEo/edit?usp=sharing")
* [Sprint One Planning Document](https://docs.google.com/document/d/1g6hue1YXV_LCmL4IvRSkukYwyH4taZjaCf-zcEth-Kw/edit?usp=sharing")



## Using the Repository

###### I would highly recommend downloading Github Desktop because it gives a nice visualization of what is going on with all the different forks and branches. 

1. Fork the Repository onto your own github
2. Go to your personal repository and clone it do your computer 
 a. The Green button on your page will have a link to use command line to clone 
    ```bash
    $ cd cs307/ScribeScholars
    $ git clone https://github.com/YOUR-USERNAME/ScribeScholars
    ```
3. Once you have the repository cloned onto your computer run these commands to initialize your repo.
   ```bash
   $ cd cs307/ScribeScholars
   $ git init 
   $ git add .
   $ git commit -m "Initial Commit"
   $ git remote -v
   $ git remote add upstream https://github.com/brow1144/ScribeScholars.git
   $ git remote -v
   $ git push origin master
   ```
   
  ###Once you have the repository set up, type "yarn" in the directoy to add all dependencies. After that you can type "yarn start" and it will open the development server.
  
  
   
   a. Once you have this setup you will be able to use git how you normally would on a personal project (branches, commits, pushes, etc.)
4. Before you start working on anything make sure you get up to date with the master branch. You can do this in Github Desktop by going to Branch->Merge Into Current Branch then choose that you want to merge with upstream master. Then make sure to click fetch origin to refresh your local files. 
    
    a. When you have a version of your repository you want to add to the main repository, 
        
        1. Go to github in your browser and click pull request, write a short description of what you are adding and then if you feel it is ready then commmit merge and it will be updated on the master branch.
