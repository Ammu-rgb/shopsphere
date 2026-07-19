const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const randomStock = () => Math.floor(Math.random() * 91) + 10;

const products = [
  // =========================
  // Electronics (10)
  // =========================
  {
    name: "Apple iPhone 15 Pro",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200",
    description:
      "Premium smartphone with stunning display, powerful processor, and advanced camera system.",
    category: "Electronics",
    stock: randomStock(),
  },
  {
    name: "Samsung Galaxy S24",
    price: 1099,
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=1200",
    description:
      "Flagship Android smartphone with exceptional performance and battery life.",
    category: "Electronics",
    stock: randomStock(),
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200",
    description:
      "Industry-leading wireless noise-canceling headphones with crystal-clear sound.",
    category: "Electronics",
    stock: randomStock(),
  },
  {
    name: "Apple MacBook Air M3",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=1200",
    description:
      "Lightweight laptop featuring Apple's powerful M3 chip and all-day battery life.",
    category: "Electronics",
    stock: randomStock(),
  },
  {
    name: "Dell XPS 15 Laptop",
    price: 1799,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200",
    description:
      "High-performance laptop with InfinityEdge display for professionals.",
    category: "Electronics",
    stock: randomStock(),
  },
  {
    name: "Apple Watch Series 9",
    price: 449,
    image:
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=1200",
    description:
      "Smartwatch with advanced fitness tracking and seamless connectivity.",
    category: "Electronics",
    stock: randomStock(),
  },
  {
    name: "Canon EOS R50 Camera",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200",
    description:
      "Compact mirrorless camera perfect for creators and photography enthusiasts.",
    category: "Electronics",
    stock: randomStock(),
  },
  {
    name: "Mechanical RGB Keyboard",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=1200",
    description:
      "Mechanical gaming keyboard with customizable RGB lighting.",
    category: "Electronics",
    stock: randomStock(),
  },
  {
    name: "Gaming Mouse Pro",
    price: 79,
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=1200",
    description:
      "Ergonomic gaming mouse with adjustable DPI and programmable buttons.",
    category: "Electronics",
    stock: randomStock(),
  },
  {
    name: "Portable Bluetooth Speaker",
    price: 99,
    image:
      "https://images.unsplash.com/photo-1507878866276-a947ef722fee?w=1200",
    description:
      "Portable waterproof Bluetooth speaker with rich bass and long battery life.",
    category: "Electronics",
    stock: randomStock(),
  },

  // =========================
  // Fashion (10)
  // =========================
  {
    name: "Classic White T-Shirt",
    price: 25,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200",
    description: "Soft premium cotton t-shirt for everyday comfort.",
    category: "Fashion",
    stock: randomStock(),
  },
  {
    name: "Slim Fit Blue Jeans",
    price: 59,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200",
    description: "Stylish slim-fit denim jeans with stretch comfort.",
    category: "Fashion",
    stock: randomStock(),
  },
  {
    name: "Men's Casual Hoodie",
    price: 69,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1200",
    description: "Warm fleece hoodie perfect for casual wear.",
    category: "Fashion",
    stock: randomStock(),
  },
  {
    name: "Women's Summer Dress",
    price: 79,
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200",
    description: "Elegant lightweight summer dress with floral design.",
    category: "Fashion",
    stock: randomStock(),
  },
  {
    name: "Formal Blazer",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1593032465171-8bd93b94e15f?w=1200",
    description: "Premium tailored blazer suitable for office and events.",
    category: "Fashion",
    stock: randomStock(),
  },
  {
    name: "Polo T-Shirt",
    price: 39,
    image:
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=1200",
    description: "Classic polo t-shirt with breathable cotton fabric.",
    category: "Fashion",
    stock: randomStock(),
  },
  {
    name: "Women's Denim Jacket",
    price: 89,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1200",
    description: "Stylish denim jacket with timeless design.",
    category: "Fashion",
    stock: randomStock(),
  },
  {
    name: "Men's Chino Pants",
    price: 55,
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=1200",
    description: "Comfortable chinos ideal for casual and formal occasions.",
    category: "Fashion",
    stock: randomStock(),
  },
  {
    name: "Oversized Sweatshirt",
    price: 65,
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200",
    description: "Trendy oversized sweatshirt with premium fabric.",
    category: "Fashion",
    stock: randomStock(),
  },
  {
    name: "Classic Leather Jacket",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=1200",
    description: "Premium leather jacket with timeless style.",
    category: "Fashion",
    stock: randomStock(),
  },

  // =========================
  // Shoes (10)
  // =========================
  {
    name: "Nike Running Shoes",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200",
    description: "Lightweight running shoes with superior cushioning.",
    category: "Shoes",
    stock: randomStock(),
  },
  {
    name: "Adidas Sneakers",
    price: 119,
    image:
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=1200",
    description: "Comfortable sneakers designed for daily wear.",
    category: "Shoes",
    stock: randomStock(),
  },
  {
    name: "Puma Sports Shoes",
    price: 99,
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=1200",
    description: "Durable sports shoes with breathable mesh upper.",
    category: "Shoes",
    stock: randomStock(),
  },
  {
    name: "Leather Formal Shoes",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=1200",
    description: "Elegant leather formal shoes for business occasions.",
    category: "Shoes",
    stock: randomStock(),
  },
  {
    name: "Canvas Casual Shoes",
    price: 69,
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=1200",
    description: "Classic canvas shoes for everyday style.",
    category: "Shoes",
    stock: randomStock(),
  },
  {
    name: "White Trainers",
    price: 89,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200",
    description: "Minimal white trainers with modern comfort.",
    category: "Shoes",
    stock: randomStock(),
  },
  {
    name: "Hiking Boots",
    price: 179,
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=1200",
    description: "Rugged hiking boots built for outdoor adventures.",
    category: "Shoes",
    stock: randomStock(),
  },
  {
    name: "Slip-On Loafers",
    price: 85,
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200",
    description: "Comfortable loafers with premium finish.",
    category: "Shoes",
    stock: randomStock(),
  },
  {
    name: "Basketball Shoes",
    price: 159,
    image:
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=1200",
    description: "High-performance basketball shoes with ankle support.",
    category: "Shoes",
    stock: randomStock(),
  },
  {
    name: "Running Trainers Elite",
    price: 139,
    image:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=1200",
    description: "Professional running trainers for maximum performance.",
    category: "Shoes",
    stock: randomStock(),
  },

  // =========================
  // Accessories (10)
  // =========================
  {
    name: "Leather Wallet",
    price: 49,
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=1200",
    description: "Premium genuine leather wallet with multiple card slots.",
    category: "Accessories",
    stock: randomStock(),
  },
  {
    name: "Luxury Wrist Watch",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=1200",
    description: "Elegant stainless steel wrist watch with premium finish.",
    category: "Accessories",
    stock: randomStock(),
  },
  {
    name: "Polarized Sunglasses",
    price: 79,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1200",
    description: "UV protection polarized sunglasses with stylish frame.",
    category: "Accessories",
    stock: randomStock(),
  },
  {
    name: "Travel Backpack",
    price: 99,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200",
    description: "Spacious backpack with laptop compartment.",
    category: "Accessories",
    stock: randomStock(),
  },
  {
    name: "Baseball Cap",
    price: 29,
    image:
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=1200",
    description: "Adjustable cotton baseball cap for everyday use.",
    category: "Accessories",
    stock: randomStock(),
  },
  {
    name: "Leather Belt",
    price: 39,
    image:
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=1200",
    description: "Premium leather belt with durable metal buckle.",
    category: "Accessories",
    stock: randomStock(),
  },
  {
    name: "Wireless Power Bank",
    price: 69,
    image:
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=1200",
    description: "Fast charging wireless power bank with large capacity.",
    category: "Accessories",
    stock: randomStock(),
  },
  {
    name: "Laptop Sleeve",
    price: 35,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200",
    description: "Protective padded laptop sleeve with modern design.",
    category: "Accessories",
    stock: randomStock(),
  },
  {
    name: "Bluetooth Tracker",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200",
    description: "Keep track of your keys, wallet, and other essentials.",
    category: "Accessories",
    stock: randomStock(),
  },
  {
    name: "Premium Travel Mug",
    price: 32,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=1200",
    description: "Insulated stainless steel travel mug for hot and cold drinks.",
    category: "Accessories",
    stock: randomStock(),
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Product.deleteMany({});
    await Product.insertMany(products);

    console.log("40 Products Inserted Successfully ✅");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding products:", error);

    try {
      await mongoose.connection.close();
    } catch (_) {}

    process.exit(1);
  }
};

seedProducts();