# Scribe Scholars  

## Project Documents 

* [Project Charter](https://docs.google.com/document/d/1rlNgGtS7QHZ3wr4Sp7D-LHs86oG0ozcbQydpwGDW4HE/edit?usp=sharing "Project Charter")
* [Product Backlog](https://docs.google.com/document/d/1ym-jV3zYGEfxxFjqYO0vz74T2HTIqgt0LOLZ027VM7M/edit?usp=sharing "Project Backlog")
* [Project Name](https://docs.google.com/document/d/1qU51leG5VEBYa4LwjqhnjOvpiPV0-KM6tztAhCRCd6M/edit?usp=sharing "Project Name")
* [Code Repository Setup](https://docs.google.com/document/d/13LSVg4G2cMyUz8bLSyp4DuyX_siBgqqaxNRlFp25WIo/edit?usp=sharing "Code Repository Setup")


## Using the Repository

###### I would highly recommend downloading Github Desktop because it gives a nice visualization of what is going on with all the different forks and branches. 

1. Fork the Repository onto your own github
2. Go to your personal repository and clone it do your computer 
 a. The Green button on your page will have a link to use command line to clone 
    ```bash
    $ cd cs307/ScribeScholars
    $ git clone https://github.com/YOUR-USERNAME/ScribeScholars
    ```
    b. Or just click clone and it will download a zip file you can manually place in your project folder.
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
   a. Once you have this setup you will be able to use git how you normally would on a personal project (branches, commits, pushes, etc.)
4. While you can pull through terminal I believe it is easier to do through git hub.
    
    a. When you have a version of your repository you want to add to the main repository, 
        
        1. Go to Create Pull Request in Github
        2. There you can edit the branch you want to merge with / your branch you want to send to merge.
        3. Add some messages to explain what you added in case of conflicts.
        4. Will shortly check the repo and if nothing seems wrong I will add it to the main repo.