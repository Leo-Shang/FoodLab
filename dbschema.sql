CREATE TABLE address
( 
 address_id serial NOT NULL,
 street_name character varying(40) NOT NULL,
 city_name character varying(40) NOT NULL,
 province_name character varying(40) NOT NULL,
 apt_number integer,
 buzz_code character varying(10),
 postal_code character varying(10) NOT NULL,
 PRIMARY KEY (address_id)
);

CREATE TABLE credit_card_info
(
    credit_card_id serial NOT NULL,
    cardholder_name character varying(60) NOT NULL,
    card_number character varying(16) NOT NULL,
    expire_date date NOT NULL,
    security_code integer NOT NULL,
    PRIMARY KEY (credit_card_id)
);

CREATE TABLE customer
(
    customer_id serial NOT NULL,
    user_name character varying(40) NOT NULL,
    password character varying(40) NOT NULL,
    phone character varying(15) NOT NULL,
    email character varying(60) NOT NULL,
    is_member boolean NOT NULL,
    address_id serial NOT NULL,
    credit_card_id serial NOT NULL,
    accumulate_amount double precision NOT NULL,
    img character varying(60),
    PRIMARY KEY (customer_id),
    CONSTRAINT "credit_card_id " FOREIGN KEY (credit_card_id)
        REFERENCES credit_card_info (credit_card_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT address_id FOREIGN KEY (address_id)
        REFERENCES address (address_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE nutrition_table
(
    calories integer NOT NULL,
    nutrition_id serial NOT NULL,
    fat integer,
    protein integer,
    vitamin_a integer,
    vitamin_c integer,
    carbohydrate integer,
    calcium integer,
    iron integer,
    sodium integer,
    PRIMARY KEY (nutrition_id)
);

CREATE TABLE item
(
    item_id serial NOT NULL,
    item_name character varying(60) NOT NULL,
    nutrition_id serial NOT NULL,
    img character varying(60) NOT NULL,
    PRIMARY KEY (item_id),
    CONSTRAINT nutrition_id FOREIGN KEY (nutrition_id)
        REFERENCES nutrition_table (nutrition_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE price
(
    price_id serial NOT NULL,
    item_id serial NOT NULL,
    regular_price double precision NOT NULL,
    posted_time timestamp without time zone,
    promotion_price double precision,
    member_price double precision,
    PRIMARY KEY (price_id),
    CONSTRAINT item_id FOREIGN KEY (item_id)
        REFERENCES item (item_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE recipe
(
    recipe_id serial NOT NULL,
    recipe_name character varying(60) NOT NULL,
    recipe_img character varying(100) NOT NULL,
    steps text NOT NULL,
    PRIMARY KEY (recipe_id)
);

CREATE TABLE favourite_recipe
(
    favourite_recipe_id serial NOT NULL,
    recipe_id serial NOT NULL,
    customer_id serial NOT NULL,
    PRIMARY KEY (favourite_recipe_id),
    CONSTRAINT customer_id FOREIGN KEY (customer_id)
        REFERENCES customer (customer_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT recipe_id FOREIGN KEY (recipe_id)
        REFERENCES recipe (recipe_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE order_list
(
    order_id serial NOT NULL,
    ordered_time timestamp without time zone NOT NULL,
    delivery_time timestamp without time zone NOT NULL,
    customer_id serial NOT NULL,
 	subtotal double precision NOT NULL,
 	distance double precision NOT NULL,
 	delivery_fee double precision NOT NULL,
 	tax double precision NOT NULL,
 	total double precision NOT NULL,
    PRIMARY KEY (order_id),
    CONSTRAINT customer_id FOREIGN KEY (customer_id)
        REFERENCES customer (customer_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE order_item
(
 order_item_id serial NOT NULL,
 order_id serial NOT NULL,
 item_id serial NOT NULL, 
 quantity integer NOT NULL,
 price double precision NOT NULL,
 PRIMARY KEY (order_item_id),
 CONSTRAINT item_id FOREIGN KEY (item_id)
        REFERENCES item (item_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
 CONSTRAINT order_id FOREIGN KEY (order_id)
  REFERENCES order_list (order_id) MATCH SIMPLE
  ON UPDATE NO ACTION 
  ON DELETE NO ACTION
);

CREATE TABLE shopping_cart
(
    shopping_cart_id serial NOT NULL,
    customer_id serial NOT NULL,
    PRIMARY KEY (shopping_cart_id),
    CONSTRAINT customer_id FOREIGN KEY (customer_id)
        REFERENCES customer (customer_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE shopping_cart_item
(
 shopping_cart_item_id serial NOT NULL, 
 shopping_cart_id serial NOT NULL,
 item_id serial NOT NULL,
 quantity integer NOT NULL,
 PRIMARY KEY (shopping_cart_item_id),
 CONSTRAINT item_id FOREIGN KEY (item_id)
        REFERENCES item (item_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
 CONSTRAINT shopping_cart_id FOREIGN KEY (shopping_cart_id)
        REFERENCES shopping_cart (shopping_cart_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE notes
(
    notes_id serial NOT NULL,
    customer_id serial NOT NULL,
    note text NOT NULL,
    recipe_id serial NOT NULL,
    posted_time timestamp without time zone NOT NULL,
    PRIMARY KEY (notes_id),
    CONSTRAINT customer_id FOREIGN KEY (customer_id)
        REFERENCES customer (customer_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT recipe_id FOREIGN KEY (recipe_id)
        REFERENCES recipe (recipe_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE recipe_item
(
    recipe_item_id serial NOT NULL,
    recipe_id serial NOT NULL,
    item_id serial NOT NULL,
    PRIMARY KEY (recipe_item_id),
    CONSTRAINT recipe_id FOREIGN KEY (recipe_id)
        REFERENCES recipe (recipe_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT item_id FOREIGN KEY (item_id)
        REFERENCES item (item_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);


INSERT INTO public.recipe(
    recipe_name, recipe_img, steps)
    VALUES ('Stir-fry egg and tomatoes', '1', '1. Peel off the skin of the tomatoes (see note). Then cut them into small chunks.%%%%2.Beat the eggs with 1 tablespoon of water.%%%%3.Heat 2 tablespoons of oil in a wok (or a frying pan) on high heat. Pour in eggs when oil smokes. When the edge is cooked, push to one side to let uncooked part touch the bottom of the wok. Take the egg out as soon as there is no more liquid (do not overcook).%%%%4.Put 1 teaspoon of oil to the same wok, cook tomato and garlic on medium heat until tomato is a little mushy.%%%%5.Add cooked egg. Roughly break up the egg with the end of a spatula. Sprinkle salt and sugar, then give everything a quick stir.%%%%6.Garnish with spring onion before serving if you wish.');

INSERT INTO public.nutrition_table(
    calories, fat, protein, vitamin_a, vitamin_c, carbohydrate, calcium, iron, sodium)
    VALUES (18, 0, 1, 0, 28, 1, 0, 0, 0);

INSERT INTO public.item(
    item_name, nutrition_id, img)
    VALUES ('tomatoes', 1, '1');

--tomatoes

INSERT INTO public.nutrition_table(
    calories, fat, protein, vitamin_a, vitamin_c, carbohydrate, calcium, iron, sodium)
    VALUES (70, 8, 6, 10, 0, 1, 2, 6, 3);

INSERT INTO public.item(
    item_name, nutrition_id, img)
    VALUES ('egg', 2, '2');


INSERT INTO public.nutrition_table(
    calories, fat, protein, vitamin_a, vitamin_c, carbohydrate, calcium, iron, sodium)
    VALUES (4, 0, 0, 0, 2, 0, 1, 0, 0);

INSERT INTO public.item(
    item_name, nutrition_id, img)
    VALUES ('garlic', 3, '3');

INSERT INTO public.nutrition_table(
    calories, fat, protein, vitamin_a, vitamin_c, carbohydrate, calcium, iron, sodium)
    VALUES (135, 23, 0, 38, 0, 0, 0, 0, 0);

INSERT INTO public.item(
    item_name, nutrition_id, img)
    VALUES ('vegetable oil', 4, '4');

INSERT INTO public.recipe(
    recipe_name, recipe_img, steps)
    VALUES ('Perfect French Fries', 2, '1.Peel and rinse the potatoes. Then cut them into sticks by cutting the potato in 4 or 5 vertical pieces, and then cutting each piece into sticks.%%%%2.Place them in a large bowl and cover with cold water. Allow them to soak, 2 to 3 hours. (You can also stick them in the fridge and let them soak overnight.) %%%%3. When you are ready to make the fries, drain off the water and lay the potatoes on 2 baking sheets lined with paper towels. Blot with paper towels to dry them. %%%%4.Heat a few inches of oil in a heavy pot to 300 degrees F. In 3 or 4 batches, cook the potatoes until soft, 4 to 5 minutes per batch. They should not be brown at this point! You just want to start the cooking process. Remove each batch and drain on new/dry paper towels. %%%%5.Once all the potatoes have been fried at 300 degrees F, turn up the heat until the oil reaches 400 degrees F. When the oil is hot, start frying the potatoes in batches again, cooking until the fries are golden and crisp. Remove the potatoes from the oil and drain on paper towels. %%%%6.Sprinkle with sea salt and dive in!');

INSERT INTO public.nutrition_table(
    calories, fat, protein, vitamin_a, vitamin_c, carbohydrate, calcium, iron, sodium)
    VALUES (110, 0, 1, 0, 45, 9, 2, 6, 0);

INSERT INTO public.item(
    item_name, nutrition_id, img)
    VALUES ('potatoes', 5, '5');


INSERT INTO public.recipe(
    recipe_name, recipe_img, steps)
    VALUES ('Sweet Potato Fired', 3, 'Preheat oven to 450 degrees F. %%%%2.Line a sheet tray with parchment. In a large bowl toss sweet potatoes with just enough oil to coat. Sprinkle with House Seasoning and paprika. Spread sweet potatoes in single layer on prepared baking sheet, being sure not to overcrowd. Bake until sweet potatoes are tender and golden brown, turning occasionally, about 20 minutes. Let cool 5 to 10 minutes before serving.');

INSERT INTO public.nutrition_table(
    calories, fat, protein, vitamin_a, vitamin_c, carbohydrate, calcium, iron, sodium)
    VALUES (86, 0, 2, 14, 2, 9, 2, 6, 10);

INSERT INTO public.item(
    item_name, nutrition_id, img)
    VALUES ('sweet potatoes', 6, '6');

INSERT INTO public.address(
    street_name, city_name, province_name, apt_number, buzz_code, postal_code)
    VALUES ('4166 Oxford Street', 'Burnaby', 'BC', null, null, 'V5B 1S7');

INSERT INTO public.credit_card_info(
    cardholder_name, card_number, expire_date, security_code)
    VALUES ('dheu hdaushd', '4406903877890234', '2019-09-30', 234);

INSERT INTO public.customer(
    user_name, password, phone, email, is_member, address_id, credit_card_id, accumulate_amount, img)
    VALUES ('123455', '1234567890', '7789904467', 'dhujsg@gmail.com', FALSE, 1, 1, 0.0, null);

INSERT INTO public.favourite_recipe(
    recipe_id, customer_id)
    VALUES (1, 1);

INSERT INTO public.notes(
    customer_id, note, recipe_id, posted_time)
    VALUES (1, 'Good one', 1, '2011-01-01 00:00:00');

INSERT INTO public.order_list(
    ordered_time, delivery_time, customer_id, subtotal, distance, delivery_fee, tax, total)
    VALUES ('2011-01-01 00:00:00', '2011-01-01 01:00:00', 1, 37.91, 4.5, 4.5, 4.5, 46.91);

INSERT INTO public.order_item(
    order_id, item_id, quantity, price)
    VALUES ( 1, 1, 2, 3.99);

INSERT INTO public.order_item(
    order_id, item_id, quantity, price)
    VALUES ( 1, 2, 4, 2.99);

INSERT INTO public.order_item(
    order_id, item_id, quantity, price)
    VALUES ( 1, 3, 3, 5.99);


INSERT INTO public.price(
    item_id, regular_price, posted_time, promotion_price, member_price)
    VALUES (1, 4.99,'2011-01-01 00:00:00' , 3.99, 3.19);

INSERT INTO public.price(
    item_id, regular_price, posted_time, promotion_price, member_price)
    VALUES (2, 3.59,'2011-01-01 00:00:00' , 2.99, 2.69);

INSERT INTO public.price(
    item_id, regular_price, posted_time, promotion_price, member_price)
    VALUES (3, 6.59,'2011-01-01 00:00:00' , 5.99, 5.69);

INSERT INTO public.recipe_item(
    recipe_id, item_id)
    VALUES (1, 1);

INSERT INTO public.recipe_item(
    recipe_id, item_id)
    VALUES (1, 2);

INSERT INTO public.shopping_cart(
    customer_id)
    VALUES (1);

INSERT INTO public.shopping_cart_item(
    shopping_cart_id, item_id, quantity)
    VALUES (1, 1, 2);

