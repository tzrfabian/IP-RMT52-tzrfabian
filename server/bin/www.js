if(process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const app = require('../app');
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});