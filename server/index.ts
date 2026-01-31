import express from "express";
import cors from "cors";
import customersRouter from "./routes/customers";
import contactsRouter from "./routes/contacts";
import dealsRouter, {
  createEvent,
  deleteEvent,
  getEventsForUser,
  updateEvent,
} from "./routes/deals";
import interactionsRouter from "./routes/interactions";
import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/customers", customersRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api/deals", dealsRouter);
app.use("/api", interactionsRouter);
app.use("/api/users", usersRouter);
// Another waay to import for these endpoints
app.post("/api/events", createEvent); // Create an event
app.get("/api/events/user/:user_id", getEventsForUser); // Get events for a specific user
app.put("/api/events/:id", updateEvent); // Update an event
app.delete("/api/events/:id", deleteEvent); // Delete an event

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
