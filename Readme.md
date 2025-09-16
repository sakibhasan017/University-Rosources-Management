# University Management System  

This project is built with **React (Frontend & Admin)** and **Node.js/Express (Backend)**.  
Follow the instructions below to set up and contribute.  

---

# How to Use  

## 1. Clone the Project  
- Install [Git](https://git-scm.com/downloads)  
- Open your terminal (Git Bash, PowerShell, or VS Code Terminal).  
- Configure Git (only once per machine):  
  git config --global user.name <github_username>  
  git config --global user.email <github_email>  

- Clone the repository:  
  git clone https://github.com/sakibhasan017/University-Rosources-Management.git  

## 2. Navigate to the Project  
cd university-management-system  
code .  

Open terminal inside VS Code → Ctrl + J  

## 3. Install Dependencies  
The project has three parts: **Frontend**, **Backend**, and **Admin**.  
You must install dependencies for each:  

cd Backend  
npm install  

cd ../Frontend  
npm install  

cd ../Admin  
npm install  

## 4. Run the Project  
- Start **Backend**:  
  cd Backend  
  npm run dev  

- Start **Frontend**:  
  cd ../Frontend  
  npm start  

- Start **Admin**:  
  cd ../Admin  
  npm start  

### Open in Browser  
- Backend API → http://localhost:3000/  
- Frontend App → http://localhost:5173/  
- Admin App → http://localhost:5174/  
- 🌍 Live Domain → https://www.bice22.xyz  

---

# How to Develop  

## 1. Create a New Branch  
git checkout -b <new_branch_name>  

## 2. Make Changes  
- **Backend (Node/Express):** Add/update routes, controllers, or database models in the Backend folder.  
- **Frontend (React):** Add/update components, pages, or API calls in the Frontend folder.  
- **Admin (React):** Add/update components, dashboards, or admin-specific logic in the Admin folder.  

### Run servers locally:  
cd Backend  
npm run dev  

cd ../Frontend  
npm start  

cd ../Admin  
npm start  

### Run test cases (if tests are written):  
npm test  

## 3. Commit and Push Changes  
git add .  
git commit -m "Description of changes made"  
git push origin <new_branch_name>  

## 4. Check CI/CD  
- Go to GitHub Actions → Click on the pipeline → Check build/test results for Frontend, Backend, and Admin  

## 5. Create a Pull Request  
- Open GitHub and create a Pull Request (PR) from your branch → main/development branch.  

## 6. Review and Merge  
- Collaborators will review your PR.  
- If approved, merge changes into the main branch.  

## 7. Update Local Repository  
git checkout main  
git pull origin main  
git branch -d <new_branch_name>  
git push origin --delete <new_branch_name>  
