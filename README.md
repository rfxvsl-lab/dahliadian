# 📱 Portfolio Builder - Powered by Supabase

A modern, fully-featured portfolio builder with real-time editing and cloud storage using Supabase.

## ✨ Features

- ✏️ **Live Editing** - Edit portfolio content in real-time
- 💾 **Cloud Storage** - Data automatically saved to Supabase
- 🔐 **User Authentication** - Secure login with email/password
- 🎨 **Theme Customization** - Change colors, fonts, animations
- 📸 **Media Upload** - Add images and videos to your portfolio
- 📱 **Responsive Design** - Works perfectly on mobile, tablet, desktop
- 🎬 **Animations** - Beautiful CSS animations for sections
- 🖌️ **Drag & Drop Shapes** - Add decorative elements
- ⚡ **Fast** - Built with React + Vite for optimal performance

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn
- Supabase account (free at https://supabase.com)

### Installation

1. **Clone repository**
   ```bash
   git clone <your-repo>
   cd portofolio-saya
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Supabase**
   - Create account at https://supabase.com
   - Create new project
   - Get credentials from Settings > API
   - Create `.env.local`:
     ```
     VITE_SUPABASE_URL=your_url
     VITE_SUPABASE_ANON_KEY=your_key
     ```
   - Run `SUPABASE_SETUP.sql` in Supabase SQL Editor

4. **Start development**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📖 Documentation

- **Setup Guide**: See [SUPABASE_GUIDE.md](./SUPABASE_GUIDE.md)
- **Tailwind Help**: See [TAILWIND_FIX.md](./TAILWIND_FIX.md)
- **Database Schema**: See [SUPABASE_SETUP.sql](./SUPABASE_SETUP.sql)
- **Complete Checklist**: See [SETUP_COMPLETE.md](./SETUP_COMPLETE.md)

## 🎯 How to Use

1. Click **LOGIN** button (bottom right)
2. Register with email & password
3. Verify your email
4. Login to dashboard
5. Click **EDIT** button to edit portfolio
6. Make changes to content, colors, fonts
7. Click **SAVE** to store changes
8. Share your portfolio link!

## 🛠️ Project Structure

```
src/
├── components/
│   └── AuthModal.jsx          # Login/Register modal
├── lib/
│   ├── supabaseClient.js      # Supabase initialization
│   └── usePortfolio.js        # Authentication & data hooks
├── App.jsx                    # Main application
├── main.jsx                   # Entry point
├── index.css                  # Global styles
└── App.css                    # Component styles

📄 Configuration Files:
├── .env.local                 # Environment variables
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind CSS configuration
└── postcss.config.js          # PostCSS configuration
```

## 🔐 Security

- **Row Level Security (RLS)** - Users can only access their own data
- **Encrypted Passwords** - Handled by Supabase Auth
- **HTTPS** - All communication encrypted
- **Rate Limiting** - Built-in protection against abuse

## 📦 Technologies Used

- **React** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Supabase** - Backend & authentication
- **Lucide React** - Icons

## 🚀 Deployment

### Vercel
1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy

### Netlify
1. Push to GitHub
2. Connect repository to Netlify
3. Add build command: `npm run build`
4. Add environment variables
5. Deploy

### Other Platforms
Works with any platform that supports Node.js (Heroku, Railway, etc.)

## 📝 Environment Variables

Create `.env.local` in root directory:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🐛 Troubleshooting

### Build Errors
- See [TAILWIND_FIX.md](./TAILWIND_FIX.md) for Tailwind CSS issues
- Run `npm install` to ensure all dependencies installed
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`

### Connection Issues
- Verify `.env.local` has correct Supabase URL and key
- Check Supabase console for any errors
- Ensure CORS is configured correctly

### Can't Save Changes
- Verify you're logged in
- Check browser console for errors
- Verify Supabase credentials are correct

## 📚 Learn More

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 💡 Tips

- Use Google Fonts for better typography options
- Test on mobile to ensure responsive design
- Backup your portfolio data regularly
- Share portfolio URL with others to showcase your work

## 📞 Support

For issues or questions:
1. Check documentation files
2. Review Supabase console for errors
3. Check browser console for error messages
4. Refer to official documentation links above

## 📄 License

This project is open source and available under the MIT License.

---

**Made with ❤️ using React, Vite, and Supabase**
