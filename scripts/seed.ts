import "dotenv/config";
import mongoose from "mongoose";
import { User } from "../server/models/User";
import { Board } from "../server/models/Board";
import { Card } from "../server/models/Card";
import { Note } from "../server/models/Note";
import bcrypt from "bcrypt";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/flowspace";

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Board.deleteMany({});
    await Card.deleteMany({});
    await Note.deleteMany({});
    console.log("Cleared existing data");

    // Create demo user
    const demoUserPassword = await bcrypt.hash("demo123", 10);
    const demoUser = await User.create({
      name: "Demo User",
      email: "demo@flowspace.app",
      password: demoUserPassword,
    });
    console.log("Created demo user");

    // Create demo board
    const demoBoard = await Board.create({
      title: "My First Board",
      description: "Welcome to FlowSpace! This is your demo board.",
      ownerId: demoUser._id,
      members: [{ userId: demoUser._id, role: "owner" }],
      columns: [
        { title: "To Do", order: 0 },
        { title: "In Progress", order: 1 },
        { title: "Review", order: 2 },
        { title: "Done", order: 3 },
      ],
    });
    console.log("Created demo board");

    // Create demo cards
    const columns = demoBoard.columns;
    const demoCards = [
      {
        boardId: demoBoard._id,
        columnId: columns[0]._id,
        title: "Welcome to FlowSpace! 👋",
        description: "Drag this card to different columns to see the magic happen",
        tags: ["Getting Started"],
        order: 0,
      },
      {
        boardId: demoBoard._id,
        columnId: columns[0]._id,
        title: "Create your first real task",
        description: "Click the 'Add Card' button to create a new task",
        tags: ["Tutorial"],
        order: 1,
      },
      {
        boardId: demoBoard._id,
        columnId: columns[1]._id,
        title: "Explore real-time collaboration",
        description: "Open this board in multiple tabs to see live sync in action",
        tags: ["Feature"],
        order: 0,
      },
      {
        boardId: demoBoard._id,
        columnId: columns[2]._id,
        title: "Check out the Notes panel",
        description: "Edit notes and see markdown preview update in real-time",
        tags: ["Feature"],
        order: 0,
      },
      {
        boardId: demoBoard._id,
        columnId: columns[3]._id,
        title: "Welcome task completed!",
        description: "Great job! You're ready to start using FlowSpace",
        tags: ["Completed"],
        order: 0,
      },
    ];

    await Card.insertMany(demoCards);
    console.log("Created demo cards");

    // Create demo note
    await Note.create({
      boardId: demoBoard._id,
      content: `# Welcome to FlowSpace! 🚀

## Getting Started

- Drag and drop cards between columns
- Click 'Add Card' to create new tasks
- Edit this note to see live markdown preview
- Try opening this in multiple tabs to see real-time sync!

## Features

**Real-time Collaboration**: See changes instantly as your team works together

**Visual Kanban**: Organize tasks with drag-and-drop simplicity

**Markdown Notes**: Keep all your documentation in one place

## Next Steps

1. Create your own board
2. Invite team members
3. Start collaborating!

---

*Happy organizing! 🎉*`,
      updatedBy: demoUser._id,
    });
    console.log("Created demo note");

    console.log("\n✅ Seed completed successfully!");
    console.log(`Demo user: demo@flowspace.app / demo123`);
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

seed();
