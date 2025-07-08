import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import {
  UserCircle2Icon,
  Settings,
  LayoutDashboard,
  BarChart3,
  BookText,
} from "lucide-react";

function App() {
  return (
    <>
      <Router>
        <div className="flex">
          <Sidebar>
            <Sidebar.Item
              icon={<LayoutDashboard size={20} />}
              text="Dashboard"
              active
            />
            <Sidebar.Item icon={<BookText size={20} />} text="Logs" alert />
            <Sidebar.Item icon={<BarChart3 size={20} />} text="Analytics" />
            <Sidebar.Item icon={<UserCircle2Icon size={20} />} text="Users" />
            <Sidebar.Item icon={<Settings size={20} />} text="Settings" />
          </Sidebar>
          <main className="flex-1">{/* Your main content here */}</main>
        </div>
      </Router>
    </>
  );
}

export default App;
