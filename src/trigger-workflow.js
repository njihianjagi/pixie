import { Trigger } from "@trigger.dev/sdk";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import fs from "fs/promises";
import path from "path";

// Initialize Trigger.dev client
const trigger = new Trigger({
  id: "avatar-generation-service",
  apiKey: process.env.TRIGGER_API_KEY,
});

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

trigger.defineJob({
  id: "readyplayerme-avatar-generation",
  name: "Generate Avatar via Ready Player Me and Upload to Supabase",
  version: "1.0.0",
  trigger: trigger.event({
    name: "avatar.generate", // Event triggered by front-end upon file upload
  }),
  run: async (event, ctx) => {
    // Extract user ID and source image URL from event data
    const { imageUrl, userId } = event.payload;

    ctx.logger.info("Starting avatar generation for user", { userId });

    try {
      // Step 1: Call Ready Player Me API to generate the avatar
      ctx.logger.info("Calling Ready Player Me API...");
      const response = await axios.post(
        "https://api.readyplayer.me/v1/avatars",
        { source: imageUrl },
        {
          headers: {
            Authorization: `Bearer ${process.env.READY_PLAYER_ME_API_KEY}`,
          },
          responseType: "arraybuffer",
        }
      );

      const avatarData = response.data;
      ctx.logger.info("Avatar data received from Ready Player Me");

      // Step 2: Save avatar data temporarily if needed
      const tempDir = path.join(process.cwd(), "tmp");
      await fs.mkdir(tempDir, { recursive: true });
      const tempFilePath = path.join(tempDir, `${userId}-avatar.glb`);
      await fs.writeFile(tempFilePath, avatarData);
      ctx.logger.info("Avatar saved temporarily at: " + tempFilePath);

      // Step 3: Upload to Supabase Storage
      const bucketName = "avatars";
      const storagePath = `${userId}/avatar.glb`;

      // Create bucket if it doesn't exist
      const { data: bucketData, error: bucketError } =
        await supabase.storage.createBucket(bucketName, {
          public: true,
          fileSizeLimit: 52428800, // 50MB
        });

      if (bucketError && !bucketError.message.includes("already exists")) {
        throw new Error(`Failed to create bucket: ${bucketError.message}`);
      }

      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(storagePath, avatarData, {
          cacheControl: "3600",
          upsert: true,
          contentType: "model/gltf-binary",
        });

      if (error) {
        ctx.logger.error("Error uploading file to Supabase", {
          error: error.message,
        });
        throw new Error(error.message);
      }

      ctx.logger.info("Avatar successfully uploaded to Supabase", {
        path: storagePath,
      });

      // Get public URL for the avatar
      const { data: urlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(storagePath);

      const publicUrl = urlData.publicUrl;
      ctx.logger.info("Public URL for the avatar", { url: publicUrl });

      // Step 4: Clean up temporary file
      await fs.unlink(tempFilePath);
      ctx.logger.info("Temporary file deleted");

      // Return success with avatar URL
      return {
        success: true,
        avatarUrl: publicUrl,
        userId: userId,
      };
    } catch (error) {
      ctx.logger.error("Error in avatar generation process", {
        error: error.message,
        userId: userId,
      });
      return {
        success: false,
        error: error.message,
        userId: userId,
      };
    }
  },
});

export default trigger;
