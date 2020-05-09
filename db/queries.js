const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const getProducts = (request, response) => {
  pool.query("SELECT * FROM products", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getBasket = (request, response) => {
  pool.query("SELECT * FROM basket", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const removeFromBasketById = (request, response) => {
  const id = request.params.id;

  pool.query("DELETE FROM basket WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response
      .status(200)
      .send(`Product has been deleted from basket with id: ${id}`);
  });
};

const addProductToBasket = (request, response) => {
  const { productName, productPrice, productUrl } = request.body;

  pool.query(
    "INSERT INTO basket (product_name, product_price, product_url) VALUES ($1, $2, $3)",
    [productName, productPrice, productUrl],
    (error) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .send(
          `product has been added to basket(name: ${productName}, price: ${productPrice})`,
          request.body,
          request.params
        );
    }
  );
};

const createUser = (request, response) => {
  const { name, email, login, password } = request.body;

  pool.query(
    "INSERT INTO users (name, email, login, password) VALUES ($1, $2, $3, $4)",
    [name, email, login, password],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${results.insertId}`);
    }
  );
};

const getUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3",
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteUser = (request, response) => {
  const name = request.params.name;

  pool.query("DELETE FROM users WHERE name = $1", [name], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with name: ${name}`);
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getProducts,
  addProductToBasket,
  getBasket,
  removeFromBasketById,
};
