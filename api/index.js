import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "erp-api"
  });
});

app.listen(PORT, () => {
  console.log(`ERP API running on port ${PORT}`);
});
