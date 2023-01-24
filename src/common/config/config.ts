const db_port = process.env.DB_PORT;
const db_host = process.env.DB_HOST;
const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASSWORD;
const db_name = process.env.DB_NAME;

console.log(
  `Database host = ${db_host} port = ${db_port} env = ${process.env.NODE_ENV}`,
);

export default () => ({
  database: {
    host: db_host,
    port: db_port,
    user: db_user,
    password: db_pass,
    database: db_name,
  },
});
