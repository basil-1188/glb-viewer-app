# GLB Viewer App
GLB Viewer App

This is a small web app I built just for fun, to upload and view .glb 3D model files.

✨ What it does

Upload .glb files from your computer

Backend saves them and shows a list

You can view the 3D model directly in the browser

🔧 Tech Stack

React

Node.js & Express

MongoDB with Mongoose

Multer for uploads

Three.js for 3D model viewing

🏃‍♂️ How to run it

1. Clone the project
git clone https://github.com/basil-1188/glb-viewer-app.git
cd glb-viewer-app

2. Backend setup

cd backend
npm install

Create a .env file in the backend folder:

MONGO_URI=your_mongodb_uri
PORT=5000

Start the server:

npm start

3. Frontend setup

cd ../frontend
npm install
npm start

Visit http://localhost:3000 to try it out.

📌 Notes

Only .glb files work

Files get saved in backend/uploads

No user auth, no delete button, just basic upload + view

Built this as a learning mini project. Nothing fancy.

– Basil