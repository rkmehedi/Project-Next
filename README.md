# Next Store

Welcome to **Next Store**, a modern, full-stack e-commerce application built with Next.js 15 (App Router). This project demonstrates key web development concepts including server-side rendering, secure authentication, database integration, and a fully responsive, beautifully designed user interface.

Users can browse products, view detailed product pages, and log in using their Google account to access protected routes, such as a dashboard for adding new products to the store.

## Features

* **Modern Tech Stack**: Built with Next.js 15 (App Router) for optimal performance and developer experience.
* **Secure Authentication**: Robust user login and session management powered by **NextAuth.js (Auth.js v5)** with Google as an OAuth provider.
* **Database Integration**: Connected to a **MongoDB** database for persistent data storage of products.
* **Full CRUD Functionality**: Logged-in users can **Create** new products, and the application can **Read** all products and single products.
* **Protected Routes**: The `/dashboard` route is protected using Next.js Middleware, redirecting unauthenticated users.
* **Beautiful & Responsive UI**: The entire application is styled with **Tailwind CSS** and features professionally designed, accessible components from **shadcn/ui**.
* **User-Friendly Feedback**: Includes loading states on buttons and toast notifications for actions like login and product creation, powered by `react-toastify`.
* **Dynamic Image Uploads**: Integrates with the **ImgBB API** for seamless product image uploads.

## Technologies Used

* **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
* **Authentication**: [NextAuth.js (Auth.js v5)](https://authjs.dev/)
* **Database**: [MongoDB](https://www.mongodb.com/) with the native MongoDB Driver
* **Image Hosting**: [ImgBB API](https://api.imgbb.com/)
* **UI Feedback**: [React Toastify](https://fkhadra.github.io/react-toastify/)
* **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

* Node.js (v18 or later recommended)
* npm or yarn
* A MongoDB Atlas account (or a local MongoDB instance)
* A Google Cloud Platform account for OAuth credentials
* An ImgBB API key

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/rkmehedi/Project-Next.git](https://github.com/rkmehedi/Project-Next.git)
    cd Project-Next
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a new file named `.env.local` in the root of your project and add the following variables.

    ```env
    # NextAuth.js Configuration
    # Generate a secret here: [https://generate-secret.vercel.app/32](https://generate-secret.vercel.app/32)
    NEXTAUTH_SECRET="YOUR_GENERATED_SECRET_HERE"
    NEXTAUTH_URL="http://localhost:3000"

    # Google Provider for NextAuth
    # Get these from your Google Cloud Console
    GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID_HERE"
    GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET_HERE"

    # MongoDB Database
    # The full connection string from MongoDB Atlas
    MONGODB_URI="mongodb+srv://YOUR_DB_USERNAME:YOUR_DB_PASSWORD@YOUR_CLUSTER_URL"

    # ImgBB API Key
    # Get this from your ImgBB dashboard
    NEXT_PUBLIC_IMGBB_API_KEY="YOUR_IMGBB_API_KEY_HERE"
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Thank you.