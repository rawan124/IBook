import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/layouts/index.css'

import { router } from './app/router/Routes.tsx'
import { RouterProvider } from 'react-router/dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './context/AuthProvider.tsx'
import ConfigProvider from 'antd/es/config-provider/index'
import "antd/dist/reset.css";

const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
   <ConfigProvider
    theme={{
      token: {
        //colorPrimary: "#991B1B",
        //colorPrimary: "#3730A3",
       //colorPrimary:"#FB923C",
        //colorPrimary:"#9daaf2",
       //colorBgBase: "#FCE7F3",
       //colorBgBase: "#f3f3f3",
       //colorBgBase: "#FEF3C7",
       //colorBgBase:"#f4db7d",
       //colorBgContainer: "#FEF3C7",
      
      //borderRadius: 12,             
      //colorTextBase: "#F87171",
      //colorTextBase: "#4F46E5",
      //colorTextBase: "#1F2937",
      //colorTextBase: "#1a2238",
      // colorPrimary: "#8C5A3C",
      // colorBgBase: "#F8F5F0",
      // colorBgContainer: "#FFFFFF",
      // colorTextBase: "#2C2C2C ",
      // borderRadius: 16,
      colorPrimary:"#2563EB",
      colorBgBase: "#F9FAFB",
      colorBgContainer: "#FFFFFF",
      colorTextBase: "#6B7280",
      borderRadius: 10,
       fontFamily: "'Inter', sans-serif",
        colorTextSecondary: "#50aceb",
      
      },
    }}
  >
  <StrictMode>
    <AuthProvider>
<QueryClientProvider client={queryClient}>
    
    <RouterProvider router={router} />
    </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
  </ConfigProvider>
)
 