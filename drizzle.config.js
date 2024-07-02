/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://shantanusutar17:PsnMzWCr40Rc@ep-lingering-darkness-a1f40ckt.ap-southeast-1.aws.neon.tech/aiInterviewer?sslmode=require",
  },
};
