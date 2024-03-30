/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/ui"],
  headers: async () => {
    return [
      {
        source: "/(.*)",
        headers: [
           { key: "Access-Control-Allow-Origin", value: "localhost:8080" },
        ],
      },
    ]
  }, 
  images: {
    domains: ['res.cloudinary.com'],
  }
};
