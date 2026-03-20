# PCI Agent Web App — Regenerated Starter

This starter was regenerated using the merged HTML reference as the product reference, especially its grouped left navigation, call-script and SAQ study sections, global search, workspace floating action buttons, autosave pill, bookmarks, history, backups/snapshots, builder mode, and anchored note philosophy. See the uploaded reference file for those patterns. 

## What this starter already includes
- Supabase email/password auth
- Cloud-synced sections
- Cloud-synced notes, bookmarks, snapshots, and change logs
- Local browser backup cache
- Left grouped navigation similar to the HTML reference
- Workspace floating action buttons for Search / Bookmarks / Backups / History
- Autosave pill behavior
- Builder mode toggle
- Starter PCI sections seeded on first login

## Exact step-by-step from scratch

### Step 1 — Install the 3 tools on your computer
Install:
1. Node.js
2. Git
3. VS Code

After installing, restart your computer once if needed.

### Step 2 — Create 3 accounts in your browser
Open your browser and create accounts on:
1. GitHub
2. Supabase
3. Vercel

Best practice: sign into Vercel with GitHub.

### Step 3 — Download and extract this project
1. Download the ZIP that came with this response.
2. Extract it somewhere simple, for example:
   - `Documents/pci-agent-app-regen`
3. Open **VS Code**.
4. Click **File → Open Folder**.
5. Select the extracted folder.

### Step 4 — Install project dependencies
In VS Code:
1. Open **Terminal**.
2. Run:

```bash
npm install
```

Wait until installation finishes.

### Step 5 — Create your Supabase project
In your browser:
1. Open Supabase.
2. Click **New project**.
3. Choose the free plan.
4. Give the project a name.
5. Set a database password and save it somewhere safe.
6. Wait until the project is ready.

### Step 6 — Create the database tables
Still in Supabase:
1. Open **SQL Editor**.
2. Click **New Query**.
3. Open the file named `supabase-schema.sql` from this project.
4. Copy the full content of that file.
5. Paste it into Supabase SQL Editor.
6. Click **Run**.

This creates all required tables and security policies.

### Step 7 — Turn on authentication
In Supabase:
1. Go to **Authentication**.
2. Keep **Email** sign-in enabled.
3. For easier first testing, you may disable email confirmation.

### Step 8 — Copy the two Supabase values you need
In Supabase:
1. Open **Project Settings**.
2. Open **API**.
3. Copy:
   - Project URL
   - Anon key

### Step 9 — Create your environment file locally
Back in VS Code:
1. Find the file named `.env.example`.
2. Copy it and rename the copy to `.env.local`.
3. Put your real values into `.env.local` like this:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Step 10 — Run the app locally
In the VS Code terminal, run:

```bash
npm run dev
```

Vite will show a local URL, usually:

```bash
http://localhost:5173
```

Open that URL in your browser.

### Step 11 — Test the app locally
In the app:
1. Sign up
2. Sign in
3. Edit a section in Builder Mode
4. Add a bookmark
5. Add a note
6. Create a snapshot
7. Open Search / Bookmarks / Backups / History
8. Refresh the page

On first login, the app seeds starter sections into the database.

### Step 12 — Create your GitHub repository
In your browser:
1. Open GitHub.
2. Click **New repository**.
3. Create an empty repo.
4. Do not add README there.

### Step 13 — Push your local code to GitHub
Back in VS Code terminal, run:

```bash
git init
git add .
git commit -m "Initial PCI agent web app"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

Replace `YOUR_GITHUB_REPO_URL` with the URL from your GitHub repo page.

### Step 14 — Deploy on Vercel
In your browser:
1. Open Vercel.
2. Click **Add New Project**.
3. Import your GitHub repo.
4. Let Vercel detect the app.

### Step 15 — Add environment variables in Vercel
Before clicking final deploy, add these two variables in Vercel project settings:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Use the same values from `.env.local`.

### Step 16 — Deploy and test live
After deployment:
1. Open your live Vercel URL.
2. Sign in.
3. Confirm the seeded sections appear.
4. Add a note.
5. Refresh.
6. Open the site on another browser/device and sign in again.

If the data appears there too, Supabase sync is working.

## Project files included
- `package.json`
- `vite.config.ts`
- `vercel.json`
- `.env.example`
- `supabase-schema.sql`
- `src/App.tsx`
- `src/components/AuthGate.tsx`
- `src/components/LeftSidebar.tsx`
- `src/components/SectionCard.tsx`
- `src/components/WorkspacePanels.tsx`
- `src/lib/supabase.ts`
- `src/lib/storage.ts`
- `src/lib/seed.ts`
- `src/types/app.ts`
- `src/index.css`

## Important note
This is a regenerated **starter** based on the HTML reference patterns. It is not yet a 1:1 complete rebuild of the full `PCI_AgentSystem_Merged_Final_v18.html` system. The next phase would be:
1. migrate all real PCI content into structured data
2. move notes from section-level to block-level anchoring
3. add true draggable floating notes with stored coordinates
4. add richer builder tools for scenario cards and study-note accordions
