🧾 README.md

# 🍽️ Menu Management Backend (Node.js + Express + MongoDB)

This project is a **Menu Management System backend** built using **Node.js**, **Express.js**, and **MongoDB**.  
It provides REST APIs to manage:

- Categories
- Subcategories
- Items

Each category can have multiple subcategories, and each subcategory can have multiple items.  
The project demonstrates CRUD operations, search, and pagination — tested via **Postman**.

## 📁 Project Structure

menu-management/
├── src/
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ │ ├── categoryController.js
│ │ ├── subCategoryController.js
│ │ ├── authController.js
│ │ └── itemController.js
│ ├── models/
│ │ ├── Category.js
│ │ ├── SubCategory.js
│ │ ├── User.js
│ │ └── Item.js
│ ├── routes/
│ │ ├── categoryRoutes.js
│ │ ├── subCategoryRoutes.js
│ │ ├── authRoutes.js
│ │ └── itemRoutes.js
│ └── app.js
├── server.js
├── .env
├── .env.example
├── package.json
└── readme.md

Here’s your **one-page `README.md` setup section** — compact, clean, and ready to paste 👇

---

````markdown
## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/dishant987/menu-management.git
cd menu-management
```
````

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Create a `.env` File

Create a `.env` file in the root directory and add:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/menu_management
```

### 4️⃣ Run the Development Server

```bash
npm run dev
```

### 5️⃣ Test the API in Postman

Base URL:

```
http://localhost:5000/api
```

## 📦 Dependencies

| Package      | Description                        |
| ------------ | ---------------------------------- |
| **express**  | Web framework                      |
| **mongoose** | MongoDB ODM (Object Data Modeling) |
| **dotenv**   | Manage environment variables       |
| **morgan**   | HTTP request logger                |
| **nodemon**  | Dev auto-reload server             |

## 🧠 API Endpoints

### 🔹 CATEGORY APIs

| Method     | Endpoint                      | Description                              |
| ---------- | ----------------------------- | ---------------------------------------- |
| **POST**   | `/api/categories`             | Create a new category                    |
| **GET**    | `/api/categories`             | Get all categories (supports pagination) |
| **GET**    | `/api/categories/:id_or_name` | Get category by ID or name               |
| **PUT**    | `/api/categories/:id`         | Update category by ID                    |
| **DELETE** | `/api/categories/:id`         | Delete category by ID                    |

---

### 📘 Example — Create Category (POST)

**Endpoint:**  
`POST /api/categories`

**Request Body:**

```json
{
  "name": "Beverages",
  "image": "https://example.com/beverages.jpg",
  "description": "Refreshing drinks and juices",
  "tax_applicable": true,
  "tax": 10,
  "tax_type": "GST"
}
```

# 🧩 SUBCATEGORY APIs

This section provides details for managing **Subcategories** within categories, including creating, retrieving, updating, and deleting subcategories.

---

## 🔹 API Endpoints

| **Method** | **Endpoint**                              | **Description**                                 |
| ---------- | ----------------------------------------- | ----------------------------------------------- |
| **POST**   | `/api/subcategories`                      | Create a new subcategory under a category       |
| **GET**    | `/api/subcategories`                      | Get all subcategories (supports pagination)     |
| **GET**    | `/api/subcategories/category/:categoryId` | Get all subcategories under a specific category |
| **GET**    | `/api/subcategories/:id_or_name`          | Get subcategory by **ID** or **Name**           |
| **PUT**    | `/api/subcategories/:id`                  | Update subcategory by **ID**                    |
| **DELETE** | `/api/subcategories/:id`                  | Delete subcategory by **ID**                    |

---

## 🧾 Example: Create Subcategory (POST)

**Endpoint:**

POST /api/subcategories

**Request Body:**

```json
{
  "category_id": "6734f2a8c1e2f600f9d18b5e",
  "name": "Cold Drinks",
  "image": "https://example.com/cold-drinks.jpg",
  "description": "Soft drinks and sodas",
  "tax_applicable": true,
  "tax": 8
}
```

**Description:**

- `category_id`: The ID of the parent category (required)
- `name`: Name of the subcategory (required)
- `image`: Image URL for the subcategory
- `description`: Short description of the subcategory
- `tax_applicable`: Boolean indicating whether tax applies
- `tax`: Tax percentage (if applicable)

---

✅ **Note:** All endpoints require proper authentication (if applicable) and follow RESTful API standards.

# 🍾 ITEM APIs

This section provides detailed documentation for managing **Items** under categories or subcategories, including creating, retrieving, updating, deleting, and searching items.

---

## 🔹 API Endpoints

| **Method** | **Endpoint**                            | **Description**                                   |
| ---------- | --------------------------------------- | ------------------------------------------------- |
| **POST**   | `/api/items`                            | Create a new item under a category or subcategory |
| **GET**    | `/api/items`                            | Get all items (supports pagination)               |
| **GET**    | `/api/items/category/:categoryId`       | Get all items under a specific category           |
| **GET**    | `/api/items/subcategory/:subCategoryId` | Get all items under a specific subcategory        |
| **GET**    | `/api/items/:id_or_name`                | Get item by **ID** or **Name**                    |
| **PUT**    | `/api/items/:id`                        | Update item by **ID**                             |
| **DELETE** | `/api/items/:id`                        | Delete item by **ID**                             |
| **GET**    | `/api/items/search/:name`               | Search items by **Name**                          |

## 🧾 Example: Create Item (POST)

**Endpoint:**
POST /api/items

**Request Body:**

```json
{
  "category_id": "6734f2a8c1e2f600f9d18b5e",
  "sub_category_id": "6734f3e1c1e2f600f9d18b61",
  "name": "Coca Cola 500ml",
  "image": "https://example.com/cocacola.jpg",
  "description": "Chilled soft drink bottle",
  "tax_applicable": true,
  "tax": 8,
  "base_amount": 60,
  "discount": 10
}
```

**Description:**

- `category_id`: The ID of the parent category (required)
- `sub_category_id`: The ID of the subcategory (optional, if applicable)
- `name`: Name of the item (required)
- `image`: Image URL of the item
- `description`: Short description of the item
- `tax_applicable`: Boolean indicating whether tax applies
- `tax`: Tax percentage (if applicable)
- `base_amount`: Base price of the item before discount
- `discount`: Discount amount or percentage (if applicable)

---

✅ **Note:** All endpoints are RESTful and may require authentication depending on your project configuration.

# 🔍 SEARCH API

This section provides details for searching **Items** by name using a case-insensitive search query.

---

## 🔹 API Endpoint

| **Method** | **Endpoint**              | **Description**                         |
| ---------- | ------------------------- | --------------------------------------- |
| **GET**    | `/api/items/search/:name` | Search items by name (case-insensitive) |

---

## 🧾 Example: Search Item by Name (GET)

**Endpoint:**

```

GET /api/items/search/cola

```

**Description:**

- Searches for items whose names contain the keyword `"cola"`, regardless of case.
- Returns a list of matching items with key details.

---

## ✅ Example Response

```json
[
  {
    "_id": "6734f558c1e2f600f9d18b63",
    "name": "Coca Cola 500ml",
    "base_amount": 60,
    "discount": 10,
    "total_amount": 50
  }
]
```

**Response Fields:**

- `_id`: Unique identifier of the item
- `name`: Item name
- `base_amount`: Original price of the item
- `discount`: Discount applied to the item
- `total_amount`: Final price after discount

---

💡 **Tip:** You can use any part of the item name in your search query — the search is **case-insensitive** and supports **partial matches**.

# 📄 Pagination

All **"Get All"** APIs in this project support **pagination** to efficiently handle large datasets and improve performance.

---

## 🔹 Example Endpoint

GET /api/items?page=1&limit=5

**Description:**

- `page`: Specifies which page of results to fetch (default is `1`)
- `limit`: Specifies how many items to return per page (default may vary)

---

## ✅ Example Response

```json
{
  "total": 25,
  "page": 1,
  "limit": 5,
  "data": [ ...items... ]
}
```

**Response Fields:**

- `total`: Total number of items available
- `page`: Current page number
- `limit`: Number of items per page
- `data`: Array containing the items for the current page

---

💡 **Tip:**
You can adjust `page` and `limit` values in the query parameters to navigate through the data set — for example:

```
GET /api/items?page=2&limit=10
```

This will return the second page with 10 items per page.

# 🗑️ DELETE APIs

This section provides documentation for deleting **categories**, **subcategories**, and **items** from the system.  
Use these endpoints to remove records from your database when no longer needed.

---

## 🔹 API Endpoints

| **Method** | **Endpoint**             | **Description**                |
| ---------- | ------------------------ | ------------------------------ |
| **DELETE** | `/api/categories/:id`    | Delete a category by **ID**    |
| **DELETE** | `/api/subcategories/:id` | Delete a subcategory by **ID** |
| **DELETE** | `/api/items/:id`         | Delete an item by **ID**       |

---

## 💡 Sample Workflow (for Postman Testing)

Follow this sequence to test the entire workflow using **Postman** or any API client:

1️⃣ **Create a Category** → `POST /api/categories`  
2️⃣ **Create a Subcategory under that Category** → `POST /api/subcategories`  
3️⃣ **Create an Item under the Subcategory** → `POST /api/items`  
4️⃣ **Get All Items** → `GET /api/items`  
5️⃣ **Search for an Item** → `GET /api/items/search/cola`  
6️⃣ **Update an Item** → `PUT /api/items/:id`  
7️⃣ **Delete an Item** → `DELETE /api/items/:id`

---

## 📘 Inline Comments

Each controller and model file includes detailed inline comments explaining:

- 🧩 Controller functions and their purpose
- 🔗 Relationships between **Category → Subcategory → Item** models
- 🧮 Auto-calculation logic for total item amount (e.g., base amount - discount + tax)
- ⚠️ Error handling and input validation for all routes

---

## 🧩 Database Choice

**Database Used:** MongoDB (via Mongoose ORM)

**Reasoning:**

- Flexible schema supports hierarchical relationships (**category → subcategory → items**)
- JSON-like structure integrates naturally with Node.js
- Simplified CRUD operations using Mongoose methods (`find`, `populate`, `save`, etc.)

---

✅ **Note:**  
Deleting a **category** or **subcategory** may require cascading deletions (optional, based on implementation).  
Always ensure dependencies are handled properly to maintain data integrity.

# 🧠 Reflection Questions

---

### 1️⃣ Which database did you choose and why?

I chose **MongoDB** because it offers:

- Excellent **flexibility** for nested and hierarchical relationships (e.g., Category → Subcategory → Items).
- A **schema-less** structure that adapts easily to evolving data models.
- Seamless **integration with Node.js** using the **Mongoose** ORM, which simplifies schema definition, data validation, and querying.

---

### 2️⃣ Three things I learned from this assignment

1. **Designing relationships** between collections such as Category, Subcategory, and Items.
2. Implementing **CRUD operations**, **search functionality**, and **pagination** efficiently using **Express.js**.
3. **Structuring a Node.js project** for better scalability, maintainability, and modularity.

---

### 3️⃣ Most difficult part

The most challenging part was **managing relationships** between **Category**, **Subcategory**, and **Items**, especially ensuring clean linkage while keeping the **subcategory field optional** during item creation.

---

### 4️⃣ What I would have done differently with more time

If given more time, I would:

- Implement **JWT authentication** for secure access control.
- Add a **custom validation middleware**
- **Add a user account** system for user registration and authentication.
- **Pagination** for better user experience.

---
