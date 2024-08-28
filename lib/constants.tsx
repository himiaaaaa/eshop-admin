import {
    LayoutDashboard,
    Shapes,
    ShoppingBag,
    Tag,
    UsersRound,
  } from "lucide-react";
  import { NavItem } from '@/lib/types';

//   export const navItems: NavItem[] = [
//     {
//       title: 'Dashboard',
//       href: '/dashboard',
//       icon: 'dashboard',
//       label: 'Dashboard'
//     },
//     {
//       title: 'User',
//       href: '/dashboard/user',
//       icon: 'user',
//       label: 'user'
//     },
//     {
//       title: 'Employee',
//       href: '/dashboard/employee',
//       icon: 'employee',
//       label: 'employee'
//     },
//     {
//       title: 'Profile',
//       href: '/dashboard/profile',
//       icon: 'profile',
//       label: 'profile'
//     },
//     {
//       title: 'Kanban',
//       href: '/dashboard/kanban',
//       icon: 'kanban',
//       label: 'kanban'
//     },
//     {
//       title: 'Login',
//       href: '/',
//       icon: 'login',
//       label: 'login'
//     }
//   ];
  
  
export const navItems: NavItem[] = [
    {
      href: "/",
      icon: 'layoutDashboard',
      label: "Dashboard",
      title: "Dashboard"
    },
    {
      href: "/collections",
      icon: 'shapes',
      label: "Collections",
      title: "Collections"
    },
    {
      href: "/products",
      icon: 'tag',
      label: "Products",
      title: "Products"
    },
    {
      href: "/orders",
      icon: 'shoppingBag',
      label: "Orders",
      title: "Orders"
    },
    {
      href: "/customers",
      icon: 'usersRound',
      label: "Customers",
      title: "Customers"
    },
  ];