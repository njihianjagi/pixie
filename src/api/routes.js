// This file would typically be in a separate API folder or backend service
// For a React app, these would be implemented in a Next.js API route or separate Express server

import { TriggerClient } from "@trigger.dev/sdk";

// Initialize Trigger.dev client
const trigger = new TriggerClient({
  id: "avatar-generation-api",
  apiKey: process.env.TRIGGER_API_KEY,
});

// In-memory storage for tracking job status (would use a database in production)
const jobStatus = new Map();

// Route to initiate avatar generation
export async function generateAvatar(req, res) {
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
}

// Route to check avatar generation status
export async function checkAvatarStatus(req, res) {
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
}

// Webhook endpoint for Trigger.dev to update job status
export async function updateJobStatus(req, res) {
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
}
