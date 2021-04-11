# Stock-sandbox
A stock web application to help you learn and track your investments!

## Initial Setup 
Once you clone the repo:
```
npm install
```
`cd` into the api directory (for UNIX and Cygwin)
and install flask and python-dotenv
and if we'll be needing other libraries, here is where we can install them:
```
cd api
python3 -m venv venv
source venv/bin/activate
pip install flask python-dotenv
```
**If we start using other python libraries pls add them here to the readme as well.**


There is an added a custom script in node.packages called `start-api` which starts the flask app from the top of the directory. It just executes `flask run`. This doesn't seem to work on cygwin though...

## To Run Flask server
### Mac/Linux:
```
npm run-script start-api
```

### Cygwin(Windows)/Mac/Linux
```
cd api
source venv/bin/activate
flask run
```

**REMEMBER: You need 2 terminals windows to run EACH of the servers**

![two-servers](https://user-images.githubusercontent.com/55335418/110071827-9a44c600-7d31-11eb-8dc7-149e7b04b174.PNG)


## Development Workflow

### Make a new branch for your development
```
git pull origin main
git checkout -b yourName-branch-topic
```

### Push your changes
```
git add .
git commit -m 'this feature is working'
git push origin yourName-branch-topic
```

**When merging, use the github merging tool**

