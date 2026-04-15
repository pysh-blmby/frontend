import React from 'react'
import { motion } from 'framer-motion'
import { useIsMobile, useIsTouchDevice, usePrefersReducedMotion } from '../hooks/usePerformance'

const MobileOptimizedWrapper = ({ children, className = '' }) => {
  const isMobile = useIsMobile()
  const isTouch = useIsTouchDevice()
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div
      className={`${className} ${isMobile ? 'touch-manipulation' : ''}`}
      style={{
        // Optimize for touch devices
        WebkitTouchCallout: isTouch ? 'none' : 'default',
        WebkitUserSelect: isTouch ? 'none' : 'auto',
        // Prevent zoom on input focus for iOS
        WebkitTextSizeAdjust: '100%',
        // Optimize scrolling on mobile
        WebkitOverflowScrolling: isMobile ? 'touch' : 'auto',
      }}
    >
      {children}
    </div>
  )
}

export const MobileCard = ({ children, onClick, className = '', ...props }) => {
  const isMobile = useIsMobile()
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <motion.div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 ${isMobile ? 'active:bg-gray-50' : 'hover:shadow-md'} transition-shadow ${className}`}
      onClick={onClick}
      whileTap={isMobile && !prefersReducedMotion ? { scale: 0.98 } : {}}
      style={{
        // Optimize for touch targets
        minHeight: isMobile ? '44px' : 'auto',
        padding: isMobile ? '16px' : '12px',
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export const MobileButton = ({ children, onClick, variant = 'primary', size = 'md', className = '', ...props }) => {
  const isMobile = useIsMobile()
  const prefersReducedMotion = usePrefersReducedMotion()

  const baseStyles = 'rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  const sizeStyles = {
    sm: isMobile ? 'px-4 py-3 text-sm' : 'px-3 py-2 text-sm',
    md: isMobile ? 'px-6 py-4 text-base' : 'px-4 py-3 text-base',
    lg: isMobile ? 'px-8 py-5 text-lg' : 'px-6 py-4 text-lg'
  }
  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500',
    outline: 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 focus:ring-gray-500'
  }

  return (
    <motion.button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      whileTap={isMobile && !prefersReducedMotion ? { scale: 0.95 } : {}}
      style={{
        // Ensure minimum touch target size
        minHeight: isMobile ? '44px' : 'auto',
        minWidth: isMobile ? '44px' : 'auto',
      }}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export const MobileModal = ({ isOpen, onClose, children, title }) => {
  const isMobile = useIsMobile()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className={`relative bg-white rounded-t-lg sm:rounded-lg shadow-xl w-full ${
          isMobile ? 'max-h-[90vh] rounded-t-3xl' : 'max-w-md mx-4'
        }`}
        style={{
          // Full width on mobile, constrained on desktop
          width: isMobile ? '100%' : 'auto',
          maxWidth: isMobile ? 'none' : '28rem',
        }}
      >
        {/* Handle for mobile swipe to close */}
        {isMobile && (
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
          </div>
        )}

        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Content */}
        <div className={`p-4 ${isMobile ? 'pb-safe' : ''}`}>
          {children}
        </div>
      </motion.div>
    </div>
  )
}

export const MobileSearchBar = ({ value, onChange, placeholder = "Search...", className = '' }) => {
  const isMobile = useIsMobile()

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          isMobile ? 'text-base' : 'text-sm'
        }`}
        style={{
          // Prevent zoom on iOS
          fontSize: isMobile ? '16px' : '14px',
        }}
      />
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  )
}

export const MobileNavigation = ({ children, className = '' }) => {
  const isMobile = useIsMobile()

  if (!isMobile) return null

  return (
    <nav className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 pb-safe ${className}`}>
      <div className="flex justify-around items-center max-w-md mx-auto">
        {children}
      </div>
    </nav>
  )
}

export const MobileNavItem = ({ icon, label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
        isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
      }`}
    >
      <div className="text-xl mb-1">{icon}</div>
      <span className="text-xs font-medium">{label}</span>
    </button>
  )
}

export default MobileOptimizedWrapper