import e = require("express");
import {Request, Response} from "express";


export class Generic_Controller {
	
	list() {
		return ((req: Request, res: Response) => {
			res.status(200).send({
				nickname: "Monkey",
				name: "Nicolas"
			})
		})
	}
}
