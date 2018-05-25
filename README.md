# Venue-Finder-in-Wordpress
The application visualises different venues in an area.
## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
### Prerequisites
What things you need to install the software and how to install them:
* [LAMP](http://lmgtfy.com/?q=How+to+install+LAMP)
### Installing
After installing a LAMP stack and cloning the repo, the wordpress.sql database file must be imported.
```
cd Venue-Finder-in-Wordpress
mysql -u USERNAME -p wordpress < wordpress.sql
```

The whole /wordpress directory must be moved to the webroot directory. This could be done with:
```
sudo cp -r wordpress /var/www/html
```

Since the application uses a multisite setup implemented with sub-domains the hosts file must be configured to redirect properlly.
The following lines must be added:
```
127.0.0.1       site1.localhost.com
127.0.0.1       site2.localhost.com
```

## Running the application
In order for the map to display the venues the Node.js server has to be running. This is done by going to the repo directory and runnning the following commands.
```
cd Node
node DBresponse.js
```
The server uses port 3000 by default. It could be changed if necessary in the DBresponse.js file. In that case, the port on the client side must be changed too.

The application could* be accessed at: http://site2.localhost.com/2018/05/21/please-work/

### Custom queries
Custom queries could be made by changing the values in the params dictionary located in Python/pullData.py .

After making the wanted changes the python script has to be run by:
```
cd Python
python pullData.py
```

## Known problems

* An extra not needed styling appears on the div containing the map. Removing the "position: relative" from dev tools in the browser fixes* it.
