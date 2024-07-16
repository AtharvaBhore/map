import pg from "pg"
const {Pool} = pg

const pool = new Pool({
	connectionString: "postgresql://neondb_owner:ncHpF12qtOgN@ep-morning-frog-a1kf6tt5-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require",
	ssl: {
		rejectUnauthorized: false,
	},
})

export const query = (text, params) => {
	return pool.query(text, params)
}
