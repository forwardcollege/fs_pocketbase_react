import React from 'react';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage'

const App = () => {
    return (
    <MantineProvider>
        <NotificationsProvider position='top-right' limit={3}>
            <ModalsProvider>
                <BrowserRouter>
                    <Routes>

                        <Route exact path="/login" element={<LoginPage />} />
                        <Route exact path="/signup" element={<SignUpPage />} />

                        <Route exact path="/" element={<Dashboard />} />

                        
                    </Routes>
                </BrowserRouter>
            </ModalsProvider>
        </NotificationsProvider>
    </MantineProvider>
    );
}

export default App;
