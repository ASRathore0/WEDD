# 🚀 Hostinger Deployment Guide — Wedding Universe
### Fullstack Deployment for Sweety Singh & Amit Kumar Singh's Wedding Invitation

This application has been pre-packaged and unified so that **both the React Frontend and the Laravel Backend run seamlessly on a single Hostinger domain/subdomain without CORS issues or complex server configuration**.

---

## 📦 What Was Prepared For You

1. **Pre-Built Frontend**: Compiled production React app (`dist/`) copied directly into `backend/public/`.
2. **Unified Routing**: Laravel's [web.php](file:///c:/Sampp/htdocs/wedding/backend/routes/web.php) automatically serves the React SPA on all web URLs, while `/api/*` handles the backend API and `/storage/*` serves uploads.
3. **Apache Redirection**: Root [backend/.htaccess](file:///c:/Sampp/htdocs/wedding/backend/.htaccess) automatically routes traffic from `public_html/` into `public/` while protecting `.env` from public access.
4. **Database Dump**: [wedding_universe_production.sql](file:///c:/Sampp/htdocs/wedding/backend/database/wedding_universe_production.sql) with all tables and live seed data (Sweety & Amit, Bride's Family, Ceremonies, Ganesha invocation).
5. **Production Config Template**: [.env.production.hostinger](file:///c:/Sampp/htdocs/wedding/backend/.env.production.hostinger).
6. **All-in-One Deployment ZIP**: `hostinger_deploy_ready.zip` located in your project root, containing the backend, pre-installed vendor libraries, compiled frontend, and SQL dump.

---

## 🛠️ Step-by-Step Deployment Instructions

### STEP 1: Create a MySQL Database on Hostinger
1. Log in to your **Hostinger Control Panel (hPanel)**: [https://hpanel.hostinger.com](https://hpanel.hostinger.com).
2. Go to **Databases** ➔ **MySQL Databases**.
3. Create a new database:
   - **Database Name**: e.g. `u123456789_wedding` (Hostinger adds a prefix).
   - **Database Username**: e.g. `u123456789_weddinguser`.
   - **Password**: Choose a secure password (e.g. `Wedding@2026!`).
4. Click **Create**.
5. Note down the **Database Name**, **Username**, and **Password**.

---

### STEP 2: Import the Database in phpMyAdmin
1. On the same **MySQL Databases** page in Hostinger, locate your new database and click **Enter phpMyAdmin**.
2. Inside phpMyAdmin, click on your database name in the left sidebar.
3. Click the **Import** tab at the top.
4. Click **Choose File** and select `wedding_universe_production.sql` (found inside your `database/` folder or extracted from the zip).
5. Click **Import** (or **Go**) at the bottom.
6. ✅ All tables (`invitations`, `wedding_events`, `rsvps`, `users`, `personal_access_tokens`, etc.) are now fully populated!

---

### STEP 3: Upload the Files to Hostinger File Manager
1. In Hostinger hPanel, go to **Files** ➔ **File Manager** (for your website).
2. Open the **`public_html`** directory.
3. Click the **Upload** button (arrow pointing up in the top right).
4. Upload **`hostinger_deploy_ready.zip`** (found in your workspace root `c:\Sampp\htdocs\wedding\hostinger_deploy_ready.zip`).
5. Once uploaded, right-click `hostinger_deploy_ready.zip` and click **Extract**.
   - Choose the current directory (`.` or `public_html`).
6. After extracting, you can delete `hostinger_deploy_ready.zip` to save space.

> **Directory Layout Verification:**
> Inside `public_html/` you should see:
> ```
> public_html/
> ├── app/
> ├── bootstrap/
> ├── config/
> ├── database/
> ├── public/           <-- (Contains index.html, assets, images, storage)
> ├── resources/
> ├── routes/
> ├── storage/
> ├── vendor/
> ├── .htaccess         <-- (Roots traffic to /public/)
> ├── .env.production.hostinger
> └── artisan
> ```

---

### STEP 4: Configure the `.env` File
1. In Hostinger File Manager inside `public_html`, find `.env.production.hostinger`.
2. Rename it to **`.env`** (if a `.env` already exists, edit it).
3. Open `.env` and update the following lines with your actual domain and Hostinger database details:

```env
APP_NAME="Wedding Universe"
APP_ENV=production
APP_KEY=base64:37b7GhInz92XlowQ9vqZXTPWNNR5SomBz6RGT6sSD2Q=
APP_DEBUG=false
APP_TIMEZONE=Asia/Kolkata
APP_URL=https://yourdomain.com
FRONTEND_URL=https://yourdomain.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=u123456789_wedding
DB_USERNAME=u123456789_weddinguser
DB_PASSWORD=YourDatabasePasswordHere
```
4. Save the `.env` file.

---

### STEP 5: Verify PHP Version on Hostinger
1. In Hostinger hPanel, go to **Advanced** ➔ **PHP Configuration**.
2. Make sure the PHP version is set to **PHP 8.2** or **PHP 8.3**.
3. Under **PHP Extensions**, ensure `pdo_mysql`, `mbstring`, `fileinfo`, `openssl`, and `tokenizer` are enabled (enabled by default on Hostinger).
4. Click **Update**.

---

### STEP 6: Create Storage Symlink (For Image Uploads)
If you have SSH access in Hostinger (hPanel ➔ Advanced ➔ SSH Access):
```bash
php artisan storage:link
```
*Note: If you do not have SSH access, the `public/storage` folder is already included and linked in the package.*

---

## 👑 Admin Panel Access on Live Site

Once your site is live at `https://yourdomain.com`:
- Click the floating **"Palace Control"** icon in the bottom right corner (or press the admin shortcut).
- **Default Admin Credentials**:
  - **Email**: `admin@weddinguniverse.luxury`
  - **Password**: `universe2026`
- From the Admin Panel, you can update couple details, upload new hero photos, edit ceremonies, manage the Bride's Family list, and review guest RSVPs in real time.

---

## ⚡ Continuous Deployment: Auto-Deploy on `git push` via GitHub Actions

The automated deployment pipeline in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) has been configured to use your exact GitHub Secrets:

### Your GitHub Repository Secrets:
| Secret Name | Value to Set |
|---|---|
| `HOSTINGER_SSH_HOST` | `82.25.107.63` |
| `HOSTINGER_SSH_PORT` | `65002` |
| `HOSTINGER_SSH_USER` | `u604295259` |
| `HOSTINGER_SSH_PASSWORD` | *(Your Hostinger SSH / Account Password)* |
| `HOSTINGER_REMOTE_PATH` | `domains/aqua-ant-730619.hostingersite.com/public_html` *(or `/home/u604295259/domains/aqua-ant-730619.hostingersite.com/public_html`)* |

### How It Deploys:
1. Every `git push origin main` triggers the GitHub Actions runner.
2. Compiles the React Vite frontend into `backend/public/`.
3. Installs optimized PHP production dependencies (`composer install --no-dev`).
4. Creates a release archive `release.tar.gz`.
5. Uploads it over SCP using port `65002` directly to your `HOSTINGER_REMOTE_PATH`.
6. Connects over SSH to extract the archive without overwriting your live `.env` or uploaded photos.
7. Executes `php artisan storage:link` and clears caches so updates show instantly on `https://aqua-ant-730619.hostingersite.com`.

