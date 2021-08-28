const express = require("express");
const path = require("path")
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const bodyParser = require("body-parser")

const connectDB = require("./configs/db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Getting routes
const userController = require("./controllers/user.controller");
const foodItemController = require("./controllers/foodItem.controller")
const categoryController = require("./controllers/category.controller")

app.use("/users", userController);
app.use("/foodItems", foodItemController);
app.use("/categories", categoryController);

// Landing Page
app.get("/", async (req, res) => {
	try {
		res.render("landingPage");
	} catch (err) {
		return res.status(400).json({ err: err.message });
	}
})

app.get("/collections", async (req, res) => {
	try {
		res.render("collections");
	} catch (err) {
		return res.status(400).json({ err: err.message });
	}
})

app.get("/product", async (req, res) => {
	try {
		res.render("product");
	} catch (err) {
		res.render("collections");
	}
})

app.get("/checkout", async (req, res) => {
	try {
		res.render("checkout");
	} catch (err) {
		return res.status(400).json({ err: err.message });
	}
})

app.get("/order", async (req, res) => {
	try {
		res.render("order");
	} catch (err) {
		return res.status(400).json({ err: err.message });
	}
})

app.get("/profile", async (req, res) => {
	try {
		res.render("profile");
	} catch (err) {
		return res.status(400).json({ err: err.message });
	}
})

app.get("/about", async (req, res) => {
	try {
		res.render("about");
	} catch (err) {
		res.render("profile");
	}
})


app.get("/help", async (req, res) => {
	try {
		res.render("help");
	} catch (err) {
		return res.status(400).json({ err: err.message });
	}
})

// A unique identifier for the given session
const sessionId = uuid.v4();

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS, PUT")
	res.setHeader("Access-Control-Allow-Headers", "X-Requested-With-content-type");
	res.setHeader("Access-Control-Allow-Credentials", true)

	next();

})

app.post("/send-msg", async (req, res) => {
	const reply = await runSample(req.body.MSG);
	res.send({ Reply: reply })
})

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(msg, projectId = 'masai-unit3') {

	
	// Create a new session
	const sessionClient = new dialogflow.SessionsClient({
		keyFilename: "C:/Home/Personal/help-bot/masai-unit3-6345e09651e3.json"
	});
	const sessionPath = sessionClient.projectAgentSessionPath(
		projectId,
		sessionId
	);

	// The text query request.
	const request = {
		session: sessionPath,
		queryInput: {
			text: {
				// The query to send to the dialogflow agent
				text: msg,
				// The language used by the client (en-US)
				languageCode: 'en-US',
			},
		},
	};

	// Send request and log result
	const responses = await sessionClient.detectIntent(request);
	console.log('Detected intent');
	const result = responses[0].queryResult;
	console.log(`  Query: ${result.queryText}`);
	console.log(`  Response: ${result.fulfillmentText}`);
	if (result.intent) {
		console.log(`  Intent: ${result.intent.displayName}`);
	} else {
		console.log('  No intent matched.');
	}
	return result.fulfillmentText;
}



const PORT = 8080;
app.listen(PORT, async () => {
	try {
		await connectDB();
		console.log(`Listening to port: ${PORT}`)
	} catch (err) {
		console.log(`Database not connected`);
	}
})