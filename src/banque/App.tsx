import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Users, Building2, PhoneCall, DollarSign } from "lucide-react";
import { AuthProvider, useAuth } from "./hooks/AuthContext";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Sidebar from "./components/Sidebar";
import Customers from "./components/Customers";
import Contacts from "./components/Contacts";
import Interactions from "./components/Interactions";
import Deals from "./components/Deals";
import { useNavigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" replace />;
}

const CRM: React.FC = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = React.useState(
    () => localStorage.getItem("currentView") || "customer" // Default to "customers"
  );

  const menuItems = [
    { id: "customers", label: "Customers", icon: Users },
    { id: "contacts", label: "Contacts", icon: Building2 },
    { id: "interactions", label: "Interactions", icon: PhoneCall },
    { id: "deals", label: "Deals", icon: DollarSign },
  ];

  React.useEffect(() => {
    // Store currentView in localStorage whenever it changes
    localStorage.setItem("currentView", currentView);
    // Navigate to the route corresponding to the current view
    // navigate(`/${currentView}`);
  }, [currentView, navigate]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        menuItems={menuItems}
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      <main className="flex-1 overflow-auto p-8">
        {currentView === "customers" && <Customers />}
        {currentView === "contacts" && <Contacts />}
        {currentView === "interactions" && <Interactions />}
        {currentView === "deals" && <Deals />}
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <CRM />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

//-----------------------------------------------------------
//               WHEN WE TRY TO FETCH TWO TABLES
//               FROM THE SERVICES
//-----------------------------------------------------------

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         setLoading(true);
//         const [fetchedDeals, fetchedContacts] = await Promise.all([
//           fetchDeals(),
//           fetchContacts(),
//         ]);
//         setDeals(fetchedDeals);
//         setContacts(fetchedContacts);
//       } catch (error) {
//         console.error("Error loading data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, []);
