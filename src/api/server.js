// This file would be used in a separate Express server or implemented as API routes in a Next.js app
// For the purposes of this example, we're showing how these endpoints would be implemented

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { TriggerClient } = require("@trigger.dev/sdk");
require("dotenv").config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize Trigger.dev client
const trigger = new TriggerClient({
  id: "avatar-generation-api",
  apiKey: process.env.TRIGGER_API_KEY,
});

// In-memory storage for tracking job status (would use a database in production)
const jobStatus = new Map();

// Route to initiate avatar generation
app.post("/api/generate-avatar", async (req, res) => {
  try {
    const { imageUrl, userId } = req.body;

    if (!imageUrl || !userId) {
      return res.status(400).json({
        error: "Missing required parameters: imageUrl and userId",
      });
    }

    // Generate a unique process ID
    const processId = `${userId}-${Date.now()}`;

    // Store initial status
    jobStatus.set(processId, {
      status: "queued",
      progress: 0,
      userId,
      imageUrl,
      createdAt: new Date(),
      avatarUrl: null,
    });

    // Trigger the workflow event
    await trigger.sendEvent({
      name: "avatar.generate",
      payload: { imageUrl, userId, processId },
    });

    // Update status to processing
    jobStatus.set(processId, {
      ...jobStatus.get(processId),
      status: "processing",
      progress: 10,
    });

    // Return the process ID for status tracking
    return res.status(200).json({
      processId,
      message: "Avatar generation started",
    });
  } catch (error) {
    console.error("Error generating avatar:", error);
    return res.status(500).json({
      error: "Failed to start avatar generation process",
    });
  }
});

// Route to check avatar generation status
app.get("/api/avatar-status/:processId", async (req, res) => {
  try {
    const { processId } = req.params;

    if (!processId) {
      return res.status(400).json({
        error: "Missing process ID",
      });
    }

    // Get status from the map
    const status = jobStatus.get(processId);

    if (!status) {
      return res.status(404).json({
        error: "Process not found",
      });
    }

    // Return current status
    return res.status(200).json(status);
  } catch (error) {
    console.error("Error checking avatar status:", error);
    return res.status(500).json({
      error: "Failed to check avatar status",
    });
  }
});

// Webhook endpoint for Trigger.dev to update job status
app.post("/api/webhook/job-status", async (req, res) => {
  try {
    const { processId, status, progress, avatarUrl, error } = req.body;

    if (!processId) {
      return res.status(400).json({
        error: "Missing process ID",
      });
    }

    const currentStatus = jobStatus.get(processId);

    if (!currentStatus) {
      return res.status(404).json({
        error: "Process not found",
      });
    }

    // Update the status
    jobStatus.set(processId, {
      ...currentStatus,
      status: status || currentStatus.status,
      progress: progress || currentStatus.progress,
      avatarUrl: avatarUrl || currentStatus.avatarUrl,
      error: error || currentStatus.error,
      updatedAt: new Date(),
    });

    return res.status(200).json({
      message: "Status updated successfully",
    });
  } catch (error) {
    console.error("Error updating job status:", error);
    return res.status(500).json({
      error: "Failed to update job status",
    });
  }
});

// Clean up old job statuses (run periodically)
setInterval(() => {
  const now = new Date();
  for (const [processId, status] of jobStatus.entries()) {
    // Remove entries older than 1 hour
    if (now - status.createdAt > 60 * 60 * 1000) {
      jobStatus.delete(processId);
    }
  }
}, 15 * 60 * 1000); // Run every 15 minutes

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
