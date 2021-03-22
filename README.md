## About Orders

This is a laravel and Vue (with Quasar components) app to manage orders, suppliers and products


## API back end (laravel) Installation instructions
This repo only contains the back end of the app. 

There's a seperate repo with the front end that consumes this api

Open the terminal and navigate into the hosting directory and run the following commands:

#terminal
````
 git clone https://github.com/EspiraMarvin/order-app

 cd order-app

 composer install

```` 
 <p> Create a database and give it a name, e.g orders. Copy .env.example to <b>.env</b> Then update the database name and password in this .env file</p>
 
 #terminal
 ``````
php artisan key:generate

 php artisan migrate:fresh --seed

 php artisan passport:install 

``````
<p>If everything went well up to this point, then the app is ready to server API end points. Start the serve using the command: </p>

#To serve the app
 ````
 php artisan serve

````

<p> The next step is to head to the front end Vue Repo and set it up. It will be calling this API from the url:  http://127.0.0.1:8000 that the previous command exposes. </p>
