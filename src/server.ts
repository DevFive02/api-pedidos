import "dotenv/config"
import app from "./app"

const PORT = process.env.PORT || 9000

app.listen(PORT, () => {
  console.log(`======= </> API rodando na porta ${PORT} </> =======`)
})
