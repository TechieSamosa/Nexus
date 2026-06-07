# Nexus Portfolio Maintenance Guide

Welcome to your portfolio! Since this is built with Next.js, React, and Tailwind CSS, you don't need to know deep React logic to update your information. All your data is neatly organized into arrays. 

Here is how you update your site in the future:

## 1. Updating Your Resumes/CVs
You do **not** need to touch the code to update your resumes. 
Just go to the `public/resumes/` folder in your project directory:
`D:\Projects and Coding\Version Control Systems\Portfolio\aditya-portfolio\public\resumes\`

Replace the existing files with your new PDFs. **Important:** Your new files must have the exact same names:
- `cv.pdf`
- `cv-general.pdf`
- `cv-usa.pdf`
- `cv-europass.pdf`
- `cv-germany.pdf`
- `cv-full.pdf`

## 2. Adding New Work Experience or Internships
1. Open `src/components/QuestLog.tsx` in a text editor (like VS Code or Notepad).
2. Scroll to the top where you see `const quests: Quest[] = [...]`.
3. Copy one of the existing blocks enclosed in `{ ... },` and paste it below or above the others.
4. Update the `title`, `company`, `date`, `summary`, and `achievements` (which is a list of strings `"..."`).
5. **Adding Logos:** To add a logo, place the image file (e.g., `new-logo.png`) into the `public/` folder. Then, in the `icon` field of your new experience, update the image source like this: 
   `icon: <div className="..."><img src="/new-logo.png" alt="Company Name" className="..." /></div>,`

## 3. Adding New Skills
1. Open `src/components/TechMarquee.tsx`.
2. Find the `const techStack = [...]` array.
3. Add a new line for your skill: `{ name: "New Skill Name", icon: <Code2 size={20} /> },`
*(You can use other icons like `<Database />`, `<Brain />`, `<Terminal />`, or `<Server />` from `lucide-react`)*.

## 4. Updating Education & Trophies
1. Open `src/components/Trophies.tsx`.
2. Find the `const achievements = [...]` array.
3. Add or modify the entries just like you did for experiences.

## 5. Changing the Terminal Hobbies / Text
1. Open `src/components/Footer.tsx`.
2. Search for the `handleCommand` function.
3. You will see text like `newOutput.push("- Swimming (South Zone Swimmer) & Gymming");`. You can simply edit this text between the quotes to update your hobbies.

## Running the Site Locally
If you want to see your changes before pushing to GitHub:
1. Open PowerShell or Command Prompt.
2. Navigate to your project folder: `cd "D:\Projects and Coding\Version Control Systems\Portfolio\aditya-portfolio"`
3. Run: `npm run dev`
4. Open your browser to `http://localhost:3000`.

## Pushing Changes to GitHub / Vercel
Once you save your changes, run these commands in your terminal to update the live site:
```bash
git add .
git commit -m "Updated my portfolio"
git push
```
Vercel will automatically detect the push and deploy the new version!
