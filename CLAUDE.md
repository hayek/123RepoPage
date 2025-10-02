# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern landing page for "123Repo", a Mac app for lightning-fast project access. The landing page follows Apple's design principles with sophisticated animations, clean typography, and premium visual effects.

## Architecture

### Core Files Structure
- `index.html` - Main landing page with semantic HTML structure
- `style.css` - Complete CSS with Apple-style design system (~1000 lines)
- `script.js` - Advanced JavaScript with scroll effects, animations, and interactions
- `*.png` images - Screenshot assets with descriptive names (e.g., `main-app-interface.png`, `keyboard-shortcuts.png`)

### Design System
The project uses a comprehensive CSS custom properties system with:
- Apple-style color palette (--primary-blue, --text-primary, etc.)
- Systematic spacing scale (--spacing-xs through --spacing-xxxl) 
- Typography using SF Pro Display font stack
- Responsive breakpoints and container widths
- Sophisticated shadow and border radius variables

### JavaScript Architecture
The `script.js` implements two main classes:
- `LandingPageController` - Handles all page interactions, animations, and effects
- `ScrollEffects` - Manages scroll-based animations and section snapping

Key features include:
- Intersection Observer-based scroll animations
- Parallax effects for images (disabled on mobile)
- Advanced hover effects with tilt transforms
- Keyboard navigation and accessibility support
- Performance optimizations with requestAnimationFrame
- Automatic scroll progress indicator

### Image Naming Convention
All screenshot images use descriptive names that reflect their content:
- `main-app-interface.png` - Primary app interface
- `appearance-settings.png` - App settings panel
- `keyboard-shortcuts.png` - Shortcut configuration screen
- `notification-center-widget.png` - Widget in macOS notification center
- `quick-launcher-menu.png` - App's quick launcher interface

## Development Notes

### CSS Organization
The CSS follows a structured approach:
1. CSS custom properties and reset
2. Typography and base styles
3. Navigation components
4. Hero section with overlay effects
5. Feature grid with card layouts
6. Interactive states and animations
7. Responsive design breakpoints

### Animation System
Uses CSS transitions with `cubic-bezier(0.16, 1, 0.3, 1)` easing for Apple-like motion. JavaScript handles:
- Scroll-triggered visibility animations
- Parallax movement calculations
- Image tilt effects on hover
- Ripple effects for button clicks

### Performance Optimizations
- Lazy loading for images with `data-src` attributes
- Throttled scroll and resize event handlers
- Hardware acceleration with `translate3d` transforms
- Reduced motion support for accessibility

### Responsive Behavior
- Mobile-first approach with progressive enhancement
- Parallax and tilt effects disabled below 768px width
- Flexible grid layouts that adapt to screen size
- Touch-optimized interactions for mobile devices

## Accessibility Features
- Keyboard navigation with visual focus indicators
- Screen reader support with proper ARIA labels
- Reduced motion preference detection
- High contrast mode support
- Focus management for interactive elements