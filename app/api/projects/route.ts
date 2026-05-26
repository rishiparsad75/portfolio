import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Define absolute path to JSON database
const dataFilePath = path.join(process.cwd(), "data", "projects.json");

// Helper function to read from JSON safely
function getProjectsData() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      // Ensure the directory exists
      const dir = path.dirname(dataFilePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      // Return empty database schema if file not found
      return { videos: [], graphics: [] };
    }
    const fileContent = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading projects database:", error);
    return { videos: [], graphics: [] };
  }
}

interface VideoProject {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  videoId: string;
  description: string;
  aspect: "portrait" | "landscape";
}

interface GraphicProject {
  id: number;
  title: string;
  category: string;
  image: string;
  aspect: "portrait" | "landscape" | "square";
}

interface ProjectCatalog {
  videos: VideoProject[];
  graphics: GraphicProject[];
}

// Helper function to write to JSON safely
function writeProjectsData(data: ProjectCatalog) {
  try {
    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Error writing to projects database:", error);
    return false;
  }
}

// Secure Local Admin Password
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "rishi2026";

export async function GET() {
  const data = getProjectsData();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, data } = body;

    // Verify simple password check
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Unauthorized access: Incorrect admin password." },
        { status: 401 }
      );
    }

    if (!data || typeof data !== "object") {
      return NextResponse.json(
        { error: "Invalid data payload provided." },
        { status: 400 }
      );
    }

    const success = writeProjectsData(data);
    if (success) {
      return NextResponse.json({ success: true, message: "Database updated successfully." });
    } else {
      return NextResponse.json(
        { error: "Failed to persist data to filesystem." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("API error during POST:", error);
    return NextResponse.json(
      { error: "Server encountered error during processing." },
      { status: 500 }
    );
  }
}
