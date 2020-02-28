# CMPT 470 Project : FoodLab

## Students: 

	Maoshun(Leo) Shang, Jingzhe(Zack) Zhou, Kang(Liam) Ling, Chang(Patrick) Liu, Qinxin(Abby) Xu, Wenyu(Betty) Huang

## Features:

Completed

	1. Each customer has their own personal account which will record all shopping transactions and the personal information.
	2. Sign in and sign up system.
	3. Advanced security protection on Credit information page.
	4. In personal user account, we have contact information, address, past shopping histories, and credit card information.
	6. Home page routes to shopping page and recipe page.
	7. For each item, we have the price for that particular item in the past few months, and the prediction about the price in the next month.
	8. Nutrition table on item details.
	9. Recipe page links to the ingredients items.
	10. Customer can add a recipe to their favourite recipe list.
	11. It will calculate the total price on customers' selected items.
	12. Customer membership scheme.
	13. Calculating delivery fee based on distance from store to home address.

In Progress:

	1. Search bar for customer looking for items.
	2. Predict health status for customer according to past shopping history and provide some reasonable suggestions accordingly.
	3. Recipe thumbs-up and thums-down feature.
	4. Track delivery status on map.

Issues:

	Connection problem between PosgreSQL and Express.js when deploy

Example: 

	Account: 123455; Password: 1234567890.

Step: 

	1. git clone git@github.com:Leo-Shang/FoodLab.git
	2. npm install
	3. setup Postgres DB as specified as the config in /src/backend/config.js
	4. run the dbschema.sql in root folder
	5. npm run dev
	(or 3. Run "docker-compose build && docker-compose up")
	6. visit: http://localhost:3000