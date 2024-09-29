const sampleListings = [
    // South Indian
    { title: "Masala Dosa", description: "Dosa filled with spiced potatoes", image: "https://t4.ftcdn.net/jpg/01/89/45/21/360_F_189452136_gJBG4ZRXY9NnZZCGV2s8QhObmpeerJTO.jpg", price: 90 },
    { title: "Idli", description: "Steamed rice cakes", image: "https://static.vecteezy.com/system/resources/thumbnails/035/375/375/small_2x/ai-generated-idli-with-sambar-coconut-chutney-and-kara-chutney-served-in-a-banana-leaf-photo.jpg", price: 40 },
    { title: "Vada", description: "Fried lentil donut", image: "https://cdn.pixabay.com/photo/2021/06/03/01/37/parippu-vada-6305692_640.jpg", price: 50 },
    { title: "Uttapam", description: "Thick dosa topped with vegetables", image: "https://media.istockphoto.com/id/609811304/photo/south-indian-food-uttapam-or-ooththappam-or-uthappa.jpg?s=612x612&w=0&k=20&c=mkFfxwamPGrcXHfPM8V_pA7EBs1SXNS7YvXBdFO_0xo=", price: 70 },
    { title: "Pongal", description: "Rice and lentil porridge", image: "https://t4.ftcdn.net/jpg/04/79/98/13/360_F_479981392_r8wU2xBi21ycKkoonjDLukhQ1vd4fdQs.jpg", price: 80 },
    { title: "Sambar Rice", description: "Rice with lentil-based sambar", image: "https://media.istockphoto.com/id/1255854695/photo/sambhar-rice.jpg?s=612x612&w=0&k=20&c=z0Hy9IhGtPncgrD8vMm7QhVr0BaZFPD76h_O2KYLU64=", price: 60 },
    { title: "Rasam", description: "Spicy and tangy South Indian soup", image: "https://t3.ftcdn.net/jpg/08/29/28/04/360_F_829280481_drEUDaALrpf5qznoeoWN4f4zIolTunt1.jpg", price: 50 },
    { title: "Appam", description: "Soft pancake served with curry", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvLYsTBWcJrE1sCfmcHPiw1a6KvMNpoei8pw&s", price: 60 },
    { title: "Upma", description: "Savory semolina breakfast dish", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2jISw2mcihJpZ88fzFT4B94_7WmZxjOxVcg&s", price: 40 },
    { title: "Medu Vada", description: "Crispy and savory lentil fritters", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNSyq5ugvI89eGQUnx1wnr3AlNCb0V7gsvsA&s", price: 50 },

    // Punjabi
    { title: "Chole Bhature", description: "Chickpea curry with fried bread", image: "https://www.headquarterspng.com/wp-content/uploads/2017/01/chole-bhature.jpg", price: 120 },
    { title: "Paneer Butter Masala", description: "Cottage cheese in creamy tomato gravy", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJZ7L7w-F002ig6lroqiLD9OafZaZ1KsE3AQ&s", price: 130 },
    { title: "Rajma Chawal", description: "Kidney beans curry with rice", image: "https://www.secondrecipe.com/wp-content/uploads/2017/08/rajma-chawal-1.jpg", price: 90 },
    { title: "Aloo Paratha", description: "Stuffed potato flatbread", image: "https://media.istockphoto.com/id/1418692758/photo/north-indian-famous-food-aloo-paratha-with-mango-pickle-and-butter.jpg?s=612x612&w=0&k=20&c=JDbBS-5EcSOKUeossLW2NufdKE0Mg7zFZV5ZBLdbpUE=", price: 60 },
    { title: "Sarson Ka Saag", description: "Mustard greens curry", image: "https://www.cubesnjuliennes.com/wp-content/uploads/2018/12/Sarson-Ka-saag-Recipe.jpg", price: 100 },
    { title: "Makki Ki Roti", description: "Cornmeal flatbread", image: "https://radheonline.com.au/wp-content/uploads/2020/03/makki-ki-roti.jpg", price: 40 },
    { title: "Amritsari Kulcha", description: "Stuffed flatbread with spices", image: "https://lh3.googleusercontent.com/Uef7RE3IVPtxA-9S6B6jlFrHvLsRnc9Eriz0irB3AjR9UmWVJ_NxFgZRmRUWqRnn2jO8HKLuNjAJcfLHBvsPijxuDoUvsUiuO9w8qO8B4w=w1200-rw", price: 80 },
    { title: "Lassi", description: "Sweet or salty yogurt-based drink", image: "https://img.freepik.com/free-photo/ayran-drink-with-mint-cucumber-glass_123827-21510.jpg", price: 40 },
    { title: "Dal Makhani", description: "Creamy black lentil curry", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLEPtOoreFKq5ZVi0jjJwhw-Da-w_G43KkGg&s", price: 110 },
    { title: "Aloo Gobi", description: "Potato and cauliflower curry", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTaDe7sBk9APpzfByv02GdLY7OXGByuTRTGg&s", price: 80 },

    // Maharashtrian
    { title: "Pav Bhaji", description: "Spicy mashed vegetables with bread", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTesqcN8gAIxFoqXuCCodLSwAk7L1E0GMDtiA&s", price: 100 },
    { title: "Misal Pav", description: "Spicy sprouted lentil curry with bread", image: "https://t3.ftcdn.net/jpg/03/67/95/04/360_F_367950457_q5L44UUBzQHjAn3D2m6HDePoIfnurDoX.jpg", price: 80 },
    { title: "Vada Pav", description: "Spicy potato fritter in a bun", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfRy_muKGMtHFwS52DItKFThZ3e5juDwN-4A&s", price: 40 },
    { title: "Puran Poli", description: "Sweet stuffed flatbread", image: "https://t3.ftcdn.net/jpg/03/23/59/74/360_F_323597455_uMy7LwIp6cdr8dqH5Irh5rLSKdvw5uEp.jpg", price: 60 },
    { title: "Thalipeeth", description: "Savory multi-grain flatbread", image: "https://img.freepik.com/premium-photo/thalipeeth-is-type-savoury-multi-grain-pancake-popular-maharashtra-india-served-with-curd-butter-ghee_466689-40563.jpg", price: 50 },
    { title: "Sabudana Khichdi", description: "Tapioca pearls stir-fried with peanuts", image: "https://t4.ftcdn.net/jpg/07/62/40/91/360_F_762409191_Gpgy9LmqMeNGJezSYTOoS9SMGguOXSx2.jpg", price: 60 },
    { title: "Kothimbir Vadi", description: "Coriander fritters", image: "https://www.secondrecipe.com/wp-content/uploads/2021/11/kothimbir-vadi.jpg", price: 50 },
    { title: "Bharli Vangi", description: "Stuffed brinjal curry", image: "https://dinedelicious.in/wp-content/uploads/2020/07/Bhareli-Vangi-Ingredients-7.jpg", price: 90 },
    { title: "Poha", description: "Flattened rice with spices", image: "https://c.ndtvimg.com/2023-04/ghgdqak8_poha_625x300_03_April_23.jpg?im=FaceCrop,algorithm=dnn,width=384,height=384", price: 40 },
    { title: "Batata Bhaji", description: "Spiced potato curry", image: "https://www.gayatriskitchen.com/wp-content/uploads/2020/10/DSC_1343-1-800x530.jpeg", price: 60 },

    // Chinese (Vegetarian)
    { title: "Veg Hakka Noodles", description: "Stir-fried noodles with vegetables", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbphFTBemK-YW-qKHvMtOE5b21r_pRWM8Bxg&s", price: 90 },
    { title: "Veg Manchurian", description: "Deep-fried vegetable balls in spicy sauce", image: "https://media.istockphoto.com/id/1208081427/photo/veg-manchurian-very-popular-chinese-snack-popular-in-india.jpg?s=612x612&w=0&k=20&c=C_Lsxts8SAyGTaMwiAx_S2PEaRzM0V1r93S6FeysW8I=", price: 100 },
    { title: "Spring Rolls", description: "Crispy rolls filled with vegetables", image: "https://t4.ftcdn.net/jpg/06/01/67/55/360_F_601675527_qWSgGaZA7MBi6btavu3pHWk9imkClRop.jpg", price: 60 },
    { title: "Chilli Paneer", description: "Paneer cubes tossed in a spicy sauce", image: "https://media.istockphoto.com/id/1389160681/photo/chilli-mushroom-indian-snack-food.jpg?s=612x612&w=0&k=20&c=YjI-qBxvYow2ExmwrEvxv63pEU4hRHu4sn4Dr_4a3to=", price: 120 },
    { title: "Fried Rice", description: "Fried rice with mixed vegetables", image: "https://t4.ftcdn.net/jpg/06/09/35/79/360_F_609357995_9f5MTF73kiu6UYAtpJZRT9BFWet4l3fX.jpg", price: 80 },
    { title: "Gobi Manchurian", description: "Crispy cauliflower tossed in Manchurian sauce", image: "https://media.istockphoto.com/id/1333972712/photo/cabbage-manchurian.jpg?s=612x612&w=0&k=20&c=eKpR7SsmS-UXJKoW5vUNyC0O5ZPK3fMGkCts6uUbc4E=", price: 110 },
    { title: "Veg Schezwan Noodles", description: "Spicy noodles with Schezwan sauce", image: "https://ahappytreat.com/wp-content/uploads/2020/05/DSC_0686-1024x683.jpg", price: 95 },
    { title: "Manchurian Schezwan Noodles", description: "Spicy mushroom stir-fry", image: "https://img.freepik.com/premium-photo/manchurian-hakka-schezwan-noodles-popular-indochinese-food-served-bowl-selective-focus_466689-34621.jpg", price: 100 }
];

module.exports = { data: sampleListings };
