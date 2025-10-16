const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS category (
    category_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category_name VARCHAR ( 50 ) UNIQUE,
    category_color VARCHAR ( 9 ),
    category_image_url TEXT
);

CREATE TABLE IF NOT EXISTS brand (
    brand_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    brand_name VARCHAR ( 28 ) UNIQUE
);

CREATE TABLE IF NOT EXISTS products (
    product_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    product_name VARCHAR ( 50 ),
    price DECIMAL,
    description VARCHAR ( 500 ),
    quantity INTEGER,
    product_image_url TEXT,
    category_id INTEGER REFERENCES category(category_id),
    brand_id INTEGER REFERENCES brand(brand_id)
);

INSERT INTO category (category_name, category_color, category_image_url)
VALUES 
    ('Produce', '#d6f5e3', 'https://media.licdn.com/dms/image/v2/C561BAQECKYPL5SZdgA/company-background_10000/company-background_10000/0/1614115931141/charlies_produce_cover?e=2147483647&v=beta&t=0lDqZHUr7XUZ6vas6mI32_XdnJD2i3oCf3Vn-D5XzBU'),
    ('Dairy & Eggs', '#fff7cc', 'https://whisk.com/wp-content/uploads/2023/02/shutterstock_1679020255.jpg'),
    ('Meat & Seafood', '#f5cccc', 'https://stumpsfamilymarket.com/wp-content/uploads/2020/03/Meat-1024x683.jpeg'),
    ('Bakery', '#ffe5cc', 'https://www.fooodlove.com/images/jcogs_img/cache/012-close-up-view-of-freshly-baked-bakery_-_28de80_-_8782e36ca3e8764a9e4719edc333d3a48e3f4ae7.webp'),
    ('Pantry', '#cce5f5', 'https://denverite.com/cdn-cgi/image/width=3840,quality=75,format=auto/https://wp-denverite.s3.amazonaws.com/wp-content/uploads/sites/4/2022/11/221109-GOODR-GROCERY-STORE-FOOD-PANTRY-PLACE-BRIDGE-ACADEMY-DENVER-PUBLIC-SCHOOLS-DPS-FOOD-HUNGER-WASHINGTON-VIRGINIA-VALE-KEVINJBEATY-24.jpg'),
    ('Snacks', '#ede0ff', 'https://static01.nyt.com/images/2025/07/17/multimedia/17biz-frito-health-tpbw/17biz-frito-health-tpbw-googleFourByThree.jpg'),
    ('Frozen Foods', '#e0f0ff', 'https://www.chowhound.com/img/gallery/12-store-bought-frozen-meals-to-keep-out-of-your-cart/l-intro-1725980976.jpg'),
    ('Beverages', '#ffd6cc', 'https://eu-images.contentstack.com/v3/assets/blta023acee29658dfc/blta9f158c45627aa62/651dbb742365a678d7ec7f18/AdobeStock_279692163_Editorial_Use_Only-Beverage-FTR-new.jpg?disable=upscale&width=1200&height=630&fit=crop'),
    ('Household', '#ebeff5', 'https://www.bobvila.com/wp-content/uploads/2023/07/iStock-1350786800-flammable-household-items-cleaning-supplies-arranged-in-circle.jpg?quality=85');


INSERT INTO brand (brand_name)
VALUES 
    ('Dole'),              -- bananas, pineapples
    ('Driscoll''s'),        -- strawberries, blueberries
    ('Chiquita'),          -- apples, bananas
    ('Kraft'),             -- cheddar cheese, mac & cheese
    ('Chobani'),           -- Greek yogurt, oat milk
    ('Eggland''s Best'),    -- large eggs, cage-free eggs
    ('Tyson'),             -- chicken breast, chicken nuggets
    ('Oscar Mayer'),       -- bacon, hot dogs
    ('Wonder'),            -- white bread, hamburger buns
    ('Arnold'),           -- whole wheat bread, sandwich thins
    ('Barilla'),          -- spaghetti, penne pasta
    ('Heinz'),            -- ketchup, mustard
    ('Del Monte'),        -- canned green beans, canned corn
    ('Goya'),             -- black beans, chickpeas
    ('Lay''s'),            -- potato chips, BBQ chips
    ('Oreo'),             -- Oreo cookies, Golden Oreos
    ('Nature Valley'),    -- granola bars, protein bars
    ('DiGiorno'),         -- frozen pizza, flatbread pizza
    ('Birds Eye'),        -- frozen peas, frozen broccoli
    ('Ben & Jerry''s'),    -- Cherry Garcia, Chocolate Fudge Brownie
    ('Coca-Cola'),        -- Coke, Sprite
    ('PepsiCo'),          -- Pepsi, Mountain Dew
    ('Tropicana'),        -- orange juice, grapefruit juice
    ('Bounty'),           -- paper towels, napkins
    ('Clorox'),           -- disinfecting wipes, bleach
    ('Tide');             -- laundry detergent, pods


INSERT INTO products (product_name, price, description, quantity, category_id, brand_id, product_image_url)
VALUES
    -- Produce
    ('Bananas', 0.59, 'Fresh ripe bananas', 200, 1, 1, 'https://assets.farmjournal.com/dims4/default/37f32b7/2147483647/strip/true/crop/840x561+0+20/resize/800x534!/quality/90/?url=https%3A%2F%2Ffj-corp-pub.s3.us-east-2.amazonaws.com%2Fs3fs-public%2F2023-03%2FDole-bananas-Conventional-Bananas_Small-GS1-Sticker.png'),
    ('Pineapple', 2.99, 'Sweet whole pineapple', 60, 1, 1, 'https://www.dole.com/sites/default/files/styles/512w512h-80/public/media/2025-02/Dole_HP_Motiv_1080x1080px_Ananas_TAG.jpg?itok=7JlOF0ss-Qgqpc-_6'),
    ('Strawberries', 3.49, 'Fresh strawberry pack', 80, 1, 2, 'https://api.hy-vee.cloud/cdn-cgi/image/f=auto,w=828,q=60,dpr=1/https://e22d0640933e3c7f8c86-34aee0c49088be50e3ac6555f6c963fb.ssl.cf2.rackcdn.com/f5fe81a8-7ecb-4ca4-ad16-7462d03563df_large.png'),
    ('Blueberries', 3.99, 'Sweet blueberry pack', 75, 1, 2, 'https://images.freshop.ncrcloud.com/00715756300204/7a9e34113f094811af09923be7a24491_large.png'),
    ('Gala Apples', 1.29, 'Crisp gala apples', 120, 1, 3, 'https://www.melissas.com/cdn/shop/files/image-of-organic-baby-gala-apples-fruit-1125637733_512x512.jpg?v=1738751875'),
    ('Bananas (Organic)', 0.79, 'Organic Chiquita bananas', 100, 1, 3, 'https://chiquitabrands.com/wp-content/uploads/2019/08/Organics2.jpg'),

    -- Dairy
    ('Cheddar Cheese', 4.49, 'Sharp cheddar block', 50, 2, 4, 'https://i5.walmartimages.com/asr/06ca8061-42ce-493b-8252-a558ee92afcd.933c35347ee768f7766a97ee373298e1.jpeg'),
    ('Mac & Cheese', 1.29, 'Classic Kraft Mac & Cheese box', 120, 2, 4, 'https://i5.walmartimages.com/seo/Kraft-Original-Mac-N-Cheese-Macaroni-and-Cheese-Dinner-7-25-oz-Box_d319d3cf-f863-4a49-b807-cc6f6999a360.0138166a12e1b3db3413140a83d8ba01.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF'),
    ('Greek Yogurt', 1.29, 'Chobani Greek yogurt cup', 150, 2, 5, 'https://images.cdn.retail.brookshires.com/detail/00894700010014_C1C1.jpeg'),
    ('Oat Milk', 3.99, 'Chobani oat milk carton', 80, 2, 5, 'https://target.scene7.com/is/image/Target/GUEST_61149c77-16ef-43b4-a587-6439fe8621ac'),
    ('Large Eggs', 3.19, 'One dozen large eggs', 90, 2, 6, 'https://cdn2.egglandsbest.com/assets/images/products/_productFeatureMobi/EB-RWB-12ct-productthumbnail-2872x1616_2024-11-07-201129_bdpr.jpg'),
    ('Cage-Free Eggs', 4.19, 'One dozen cage-free eggs', 60, 2, 6, 'https://cdn2.egglandsbest.com/assets/images/products/_1200x630_crop_center-center_82_none/EB-cagefree-12ct-productthumbnail-2872x1616.jpg?mtime=1731010580'),

    -- Meat & Seafood
    ('Chicken Breast', 7.99, 'Boneless chicken breast', 70, 3, 7, 'https://www.kroger.com/product/images/xlarge/front/0026094600000'),
    ('Chicken Nuggets', 5.49, 'Tyson frozen nuggets', 85, 3, 7, 'https://i5.walmartimages.com/asr/830d348f-856b-43b7-b291-0169d646aa7c.d5ecc8f9ecb9689379038f78e6a38947.jpeg'),
    ('Bacon', 6.49, 'Oscar Mayer smoked bacon', 60, 3, 8, 'https://res.cloudinary.com/kraft-heinz-whats-cooking-ca/image/upload/f_auto/q_auto/r_8/c_limit,w_3840/f_auto/q_auto/v1/dxp-images/oscarmayer/products/00044700102787-naturally-hardwood-smoked-bacon-original/marketing-view-color-front_5b5c92ca042df7f21590788169d904b3ad32163e_a542232ee4543b0a2f97c4ed2958880d?_a=BAVAfVDW0'),
    ('Hot Dogs', 4.99, 'Oscar Mayer beef hot dogs', 100, 3, 8, 'https://res.cloudinary.com/kraft-heinz-whats-cooking-ca/image/upload/f_auto/q_auto/c_limit,w_3840/f_auto/q_auto/v1/dxp-images/oscarmayer/products/00044700000045-bun-length-wieners-hot-dogs/marketing-view-color-front_content-hub-9456492_61bab4204f0dbe8443dbe6ff73940d81?_a=BAVAfVDW0'),

    -- Bakery
    ('White Bread', 2.49, 'Soft sandwich bread', 80, 4, 9, 'https://images.heb.com/is/image/HEBGrocery/002197279-1'),
    ('Hamburger Buns', 3.29, 'Classic Wonder buns', 60, 4, 9, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxzkgjQaQVFPdbJt0UbCdKlVC5mW19sbmmjg&s'),
    ('Whole Wheat Bread', 3.49, 'Healthy wheat loaf', 75, 4, 10, 'https://www.arnoldbread.com/sites/default/files/recipe/Arnold%20100%25%20WW_1.png'),
    ('Sandwich Thins', 3.89, 'Light sandwich thins', 65, 4, 10, 'https://www.arnoldbread.com/sites/default/files/recipe/Arnold%20Sandwich%20Thins%20Multigrain%207341095572.png'),

    -- Pantry
    ('Spaghetti', 1.29, 'Classic Barilla spaghetti', 200, 5, 11, 'https://i5.walmartimages.com/asr/22be1689-431c-428e-a9ec-b129b8dcbdf2.17989f33d79f30d7438ca49116c7dd14.jpeg'),
    ('Penne Pasta', 1.39, 'Barilla penne pasta', 180, 5, 11, 'https://i5.walmartimages.com/asr/1dab454e-ceb6-4a79-aa5b-58dbf203beae.e5ee5a0cdcd5f245083c08c4a7fd074a.jpeg'),
    ('Ketchup', 3.99, 'Heinz tomato ketchup bottle', 150, 5, 12, 'https://s23.q4cdn.com/357178376/files/doc_multimedia/P_3464_Heinz_Orig_Recipe_EN_PHOTO_FOR_BUSINESS_WIRE.jpg'),
    ('Mustard', 2.99, 'Heinz yellow mustard bottle', 140, 5, 12, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxg2bPhO1SntfIVS40cvwOuVN9bs3CwCp7UA&s'),
    ('Canned Green Beans', 1.19, 'Del Monte canned beans', 120, 5, 13, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh4KUNrcEVQQG6ViTj-P7E6oyzlKeJh7OBYA&s'),
    ('Canned Corn', 1.29, 'Del Monte canned corn', 110, 5, 13, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAgqaB1sa1iLcLlRvQf-LpoKkFN6C7o5Qdfw&s'),
    ('Black Beans', 1.39, 'Goya canned black beans', 100, 5, 14, 'https://shop.goya.com/cdn/shop/products/BlackBeans_28c155a8-f3f3-451f-ae76-79f70c54993c_1400x.png?v=1661812943'),
    ('Chickpeas', 1.49, 'Goya canned chickpeas', 95, 5, 14, 'https://shop.goya.com/cdn/shop/products/Chick_Peas.png?v=1659462996'),

    -- Snacks
    ('Potato Chips', 3.49, 'Classic Lay''s chips', 200, 6, 15, 'https://cdnimg.webstaurantstore.com/images/products/large/440561/1657011.jpg'),
    ('BBQ Chips', 3.79, 'Lay''s BBQ flavored chips', 180, 6, 15, 'https://digitalassets.pepsico.com/m/686dfab31afbb342/Std_Res-00028400199612_C1C1.jpg'),
    ('Oreo Cookies', 3.99, 'Original Oreo cookies', 160, 6, 16, 'https://i5.walmartimages.com/asr/6eb0098c-bc40-42e6-b7de-d1eabcaf1e15.2d99213044dc76346c7d75fed7d49fc4.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF'),
    ('Golden Oreos', 3.99, 'Golden vanilla Oreos', 140, 6, 16, 'https://i5.walmartimages.com/asr/0848381f-bef5-4ead-90cb-8245a70f97c9_2.dded28135f970e901ed8df48ecb6acd7.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF'),
    ('Granola Bars', 4.99, 'Nature Valley crunchy bars', 120, 6, 17, 'https://m.media-amazon.com/images/I/71sYFaMFhpL._UF894,1000_QL80_.jpg'),
    ('Protein Bars', 5.49, 'Nature Valley protein bars', 100, 6, 17, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYXK8kLuMyKbgDW3flIGcRhiBK5yb0HwpsgQ&s'),

    -- Frozen
    ('Frozen Pizza', 6.99, 'DiGiorno rising crust pizza', 90, 7, 18, 'https://www.goodnes.com/sites/g/files/jgfbjl321/files/styles/gdn_hero_pdp_product_image/public/gdn_product/field_product_images/digiorno-0a9d8de9c1dc5b07cd5ebfbee29b33c954cf939a.png.webp?itok=Z2D8zN18'),
    ('Flatbread Pizza', 7.49, 'DiGiorno flatbread pizza', 80, 7, 18, 'https://www.instacart.com/image-server/1200x1200/www.instacart.com/assets/domains/product-image/file/large_a7db67ad-8873-430b-b980-23ee6d14123d.png'),
    ('Frozen Peas', 2.19, 'Birds Eye frozen peas', 120, 7, 19, 'https://i5.walmartimages.com/seo/Birds-Eye-Steamfresh-Premium-SeleCounts-Sweet-Peas-Frozen-10-oz_262b3901-a2e3-4dc1-9003-bef2a6f2dd72.2ac249fb2bca88bd4cac74544b5d7088.jpeg'),
    ('Frozen Broccoli', 2.39, 'Birds Eye frozen broccoli', 115, 7, 19, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0GOiw18vF8zImXG5mbCUsjp7RIkrbdLTErA&s'),
    ('Cherry Garcia', 5.99, 'Ben & Jerry''s ice cream', 100, 7, 20, 'https://www.benjerry.com/files/live/sites/systemsite/files/US%20and%20Global%20Assets/Flavors/Product%20Assets/US/Cherry%20Garcia%20Ice%20Cream/Cherry-Garcia_120ml_Open_Brand-1920px.png'),
    ('Chocolate Fudge Brownie', 5.99, 'Ben & Jerry''s fudge brownie ice cream', 100, 7, 20, 'https://www.benjerry.com/files/live/sites/systemsite/files/US%20and%20Global%20Assets/Flavors/Product%20Assets/US/Chocolate%20Fudge%20Brownie%20Ice%20Cream/38876_US_IC_Chocolate-Fudge-Brownie_120ml_Open_Brand-1920px.png'),

    -- Beverages
    ('Coke', 1.99, 'Coca-Cola classic can', 300, 8, 21, 'https://i5.walmartimages.com/seo/Coca-Cola-Soda-Pop-12-fl-oz-Can_14a1f5dc-f8bf-4071-9aea-0f753c3eecf4.08041b7f0a409ee67d80e489be3c1c55.jpeg'),
    ('Sprite', 1.99, 'Crisp Sprite can', 280, 8, 21, 'https://beverages2u.com/wp-content/uploads/2022/09/BCF7081A-3889-4B05-9F90-1158F3272C99.png'),
    ('Pepsi', 1.99, 'Pepsi cola can', 300, 8, 22, 'https://www.kroger.com/product/images/xlarge/front/0001200000013'),
    ('Mountain Dew', 1.99, 'Refreshing Mountain Dew', 260, 8, 22, 'https://images.squarespace-cdn.com/content/v1/54c5a9a6e4b0a642bb47ea45/1600174149267-PZVOP7D7DJPSQMVUHFCA/Mtn+Dew+can.jpg?format=1000w'),
    ('Orange Juice', 3.99, 'Tropicana orange juice', 150, 8, 23, 'https://www.happysliquor.com/cdn/shop/files/Tropicana-Pure-Premium-Some-Pulp-100-Orange-Juice-12-oz-Bottle_34f25fdc-2ec0-4bb8-b6f9-a83ab811a770.062cc036ec0cf3c91e6eb29b248923de_1080x.webp?v=1698793663'),
    ('Grapefruit Juice', 3.99, 'Tropicana grapefruit juice', 130, 8, 23, 'https://www.tropicana.com/images/products/tropicana-pure-premium-red-grapefruit-320.png'),

    -- Household
    ('Paper Towels', 12.99, 'Bounty large roll pack', 80, 9, 24, 'https://www.instacart.com/assets/domains/product-image/file/large_9a210c87-5157-4ad6-a8a7-a33aa0ec242f.png'),
    ('Napkins', 3.49, 'Bounty napkin pack', 120, 9, 24, 'https://i5.walmartimages.com/asr/9c0b1425-8bc2-4ad7-9c22-c4beba885d5e.e7e32bcbd7e9aacceb36e361971c0349.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF'),
    ('Disinfecting Wipes', 4.99, 'Clorox lemon wipes', 100, 9, 25, 'https://m.media-amazon.com/images/I/61jiK0-dXVL._UF1000,1000_QL80_.jpg'),
    ('Bleach', 3.99, 'Clorox household bleach', 90, 9, 25, 'https://i5.walmartimages.com/seo/Clorox-Disinfecting-Bleach-Regular-121-Ounce-Bottle_fb4cd656-4975-4d53-99af-671ebc5a5777_1.7e37c694e18b4d988f6f365af3104c22.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF'),
    ('Laundry Detergent', 10.99, 'Tide liquid detergent', 70, 9, 26, 'https://m.media-amazon.com/images/I/81gWmI6Th8L._UF1000,1000_QL80_.jpg'),
    ('Tide Pods', 12.99, 'Tide laundry pods', 65, 9, 26, 'https://m.media-amazon.com/images/I/81Yw8gFOqoL._UF894,1000_QL80_.jpg');
`;

async function main() {
  console.log("seeding...");

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();
  await client.query(SQL);
  await client.end();

  console.log("done");
}

main();
