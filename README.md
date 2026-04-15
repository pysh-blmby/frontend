# E-Commerce Platform Frontend

A modern, mobile-optimized e-commerce platform built with React, Vite, and Tailwind CSS. Features include advanced product filtering, real-time admin dashboard, PWA capabilities, and comprehensive performance optimizations.

## 🚀 Features

### Core Features
- **Product Catalog**: Advanced filtering and search with debounced search
- **Shopping Cart**: Persistent cart with local storage
- **User Authentication**: Secure login and registration
- **Admin Dashboard**: Real-time analytics and order management
- **Product Reviews**: User reviews and ratings system
- **Order Management**: Complete order lifecycle management

### Performance & Mobile
- **PWA Support**: Installable web app with offline capabilities
- **Mobile Optimized**: Touch-optimized components and responsive design
- **Performance Monitoring**: Core Web Vitals tracking and optimization
- **Lazy Loading**: Images and components loaded on demand
- **Service Worker**: Background sync and caching strategies

### Admin Features
- **Real-time Dashboard**: Live stats and analytics
- **Order Management**: View and update order status
- **Product Management**: Add, edit, and manage products
- **Category Management**: Organize products by categories
- **Coupon System**: Create and manage discount codes

## 🛠️ Tech Stack

- **Frontend**: React 19, React Router 7
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **PWA**: Workbox, Vite PWA Plugin
- **Charts**: Recharts

## 📦 Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Build with PWA support:**
   ```bash
   npm run build:pwa
   ```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:pwa` - Build with PWA optimizations
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run analyze` - Analyze bundle size
- `npm run lighthouse` - Run Lighthouse performance audit

## 📱 PWA Features

The app includes Progressive Web App features:
- **Offline Support**: Core functionality works offline
- **Installable**: Can be installed as a native app
- **Background Sync**: Orders sync when connection is restored
- **Push Notifications**: Order status updates (future feature)

## 🎯 Performance Optimizations

- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Lazy loading and responsive images
- **Caching**: Service worker with intelligent caching
- **Bundle Analysis**: Built-in bundle size monitoring
- **Core Web Vitals**: Performance metrics tracking

## 📂 Project Structure

```
frontend/
├── public/
│   ├── manifest.json          # PWA manifest
│   └── sw.js                  # Service worker
├── src/
│   ├── components/            # Reusable components
│   ├── hooks/                 # Custom React hooks
│   ├── pages/                 # Page components
│   ├── sections/              # Section components
│   └── utils/                 # Utility functions
├── package.json
├── vite.config.js             # Vite configuration with PWA
└── README.md
```

## 🔒 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=E-Commerce Platform
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Add environment variables in Vercel dashboard

### Netlify
1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### Manual Deployment
```bash
npm run build
# Deploy the 'dist' folder to your hosting service
```

## 📊 Performance Monitoring

The app includes built-in performance monitoring:
- Core Web Vitals tracking
- Bundle size analysis
- Lighthouse integration
- Error boundary handling

Run performance audit:
```bash
npm run lighthouse
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
