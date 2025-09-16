# University Management System  

This project is built with **React (Frontend & Admin)** and **Node.js/Express (Backend)**.  
Follow the instructions below to set up and contribute.  

---

# How to Use  

## 1. Clone the Project  
- Install [Git](https://git-scm.com/downloads)  
- Open your terminal (Git Bash, PowerShell, or VS Code Terminal)  
- Configure Git (only once per machine):  
  ```bash
  git config --global user.name <github_username>
  git config --global user.email <github_email>

    Clone the repository:

    git clone https://github.com/JU-High-Fives/university-management-system.git

2. Navigate to the Project

    Go to the project directory:

cd university-management-system

Open VS Code:

    code .

    Open terminal inside VS Code:
    Ctrl + J

3. Install Dependencies

The project has three parts: Frontend, Backend, and Admin.
You must install dependencies for each.

    Install for Backend:

cd Backend
npm install

Install for Frontend:

cd ../Frontend
npm install

Install for Admin:

    cd ../Admin
    npm install

4. Run the Project

    Start the Backend server (from Backend folder):

npm run dev

Start the Frontend React app (from Frontend folder):

npm start

Start the Admin React app (from Admin folder):

    npm start

    Open in browser:

        Backend API → http://localhost:5000/

        Frontend App → http://localhost:3000/

        Admin App → http://localhost:3001/ (or whichever port React assigns)

How to Develop
1. Create a New Branch

    Run command:

    git checkout -b <new_branch_name>

2. Make Changes

    For Backend (Node/Express):

        Add/update routes, controllers, or database models in the Backend folder.

    For Frontend (React):

        Add/update components, pages, or API calls in the Frontend folder.

    For Admin (React):

        Add/update components, dashboards, or admin-specific logic in the Admin folder.

    Run servers locally to test changes:

# Backend
cd Backend
npm run dev  

# Frontend
cd ../Frontend
npm start  

# Admin
cd ../Admin
npm start

Run test cases (if tests are written):

    npm test

3. Commit and Push Changes

    Stage and commit changes:

git add .
git commit -m "Description of changes made"

Push to remote repository:

    git push origin <new_branch_name>

4. Check CI/CD

    Go to GitHub Actions

    Click on the pipeline

    Check build/test results for Frontend, Backend, and Admin

5. Create a Pull Request

    Open GitHub and create a Pull Request (PR) from your branch → main/development branch

    Watch this guide

6. Review and Merge

    Collaborators will review your PR

    If approved, merge changes into the main branch

    Watch this

7. Update Local Repository

    Switch back to the main branch:

git checkout main

Pull the latest changes:

git pull origin main

Delete local feature branch (optional):

git branch -d <new_branch_name>

Delete remote feature branch (if merged):

git push origin --delete <new_branch_name>