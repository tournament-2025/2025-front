import { Card } from "@mui/material"
import Head from "next/head"
import Link from "next/link"

const width = {
  xs: 0.9, sm: 350, md: 450, lg: 450, xl: 450,
}

const Documents = () => {
  return (
    <div>
      <Head>
        <title>ルール・要項</title>
      </Head>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2>ルール・要項</h2>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
        <Card
          sx={{ width: width }}
          style={{ backgroundColor: "#eae9eb", borderRadius: 9, padding: 24 }}
        >
          <h3><Link href="documents/1">ルール</Link></h3>
          <h3><Link href="documents/7">要項</Link></h3>
        </Card>
      </div>
    </div>
  )
}

export default Documents