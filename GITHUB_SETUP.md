# GitHub Repository Setup Instructions

1. Install Git:
   - Download Git from: https://git-scm.com/downloads
   - Run the installer
   - Follow the installation steps
   - Restart your computer after installation

2. Create a GitHub Account:
   - Go to: https://github.com/signup
   - Sign up for a new account
   - Verify your email address

3. Create a New Repository:
   - Go to: https://github.com/new
   - Repository name: calculus-visualizer
   - Description: An interactive web application for visualizing calculus concepts
   - Make it Public
   - Don't initialize with README (we already have one)
   - Click "Create repository"

4. After creating the repository, GitHub will show you commands to push your existing repository. You'll need to run these commands in your terminal:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/calculus-visualizer.git
git push -u origin main
```

5. Deploy with Vercel:
   - Go to: https://vercel.com
   - Sign up with your GitHub account
   - Click "New Project"
   - Import your calculus-visualizer repository
   - Vercel will automatically detect it's a Vite project
   - Click "Deploy"

Your app will be live at: https://calculus-visualizer.vercel.app

Need help with any of these steps? Let me know! 