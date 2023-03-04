import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Context
import { UserProvider } from "./context/UserContext";
import { RoomProvider } from "./context/RoomContext";
import { ChatProvider } from "./context/ChatContext";
// Pages
import Home from "./pages/Home";
import Room from "./pages/Room";
// Styles
import "./index.css";
import 'react-tooltip/dist/react-tooltip.css'

ReactDOM.render(
    <BrowserRouter>
        <UserProvider>
            <RoomProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/room/:id"
                        element={
                            <ChatProvider>
                                <Room />
                            </ChatProvider>
                        }
                    />
                </Routes>
            </RoomProvider>
        </UserProvider>
    </BrowserRouter>,
    document.getElementById("root")
);
