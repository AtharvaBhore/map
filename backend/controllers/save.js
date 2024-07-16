import * as db from "../db/index.js"

export const saveRoute = async (req,res,next) => {
	const name = "gg";
    console.log(req.body)
	const text =
			"INSERT INTO routes(name,route) VALUES($1,$2) RETURNING *"
		const values = [
			name,
			req.body.route
		]
		
	try {
		const {rows} = await db.query(text, values)
		res.status(200).json({msg:"Success"})
	} catch (err) {
		next(err);
	}
}

export const loadRoute = async (req,res,next) => {
	const name = "gg";
	const text =
			"SELECT * from routes where name=$1"
		const values = [
			name,
		]
		
	try {
		const {rows} = await db.query(text, values)
		res.status(200).json(rows[0])
	} catch (err) {
		next(err);
	}
}

export default {saveRoute,loadRoute};
