// import React from "react";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { Users, Building2, PhoneCall, DollarSign } from "lucide-react";
// import Customers from "./components/Customers";
// import Contacts from "./components/Contacts";
// import Sidebar from "./components/Sidebar";
// import Deals from "./components/Deals";
// import Interactions from "./components/Interactions";

// const queryClient = new QueryClient();

// function App() {
//   const [currentView, setCurrentView] = React.useState("customers");

//   const menuItems = [
//     { id: "customers", label: "Customers", icon: Users },
//     { id: "contacts", label: "Contacts", icon: Building2 },
//     { id: "interactions", label: "Interactions", icon: PhoneCall },
//     { id: "deals", label: "Deals", icon: DollarSign },
//   ];

//   return (
//     <QueryClientProvider client={queryClient}>
//       <div className="flex h-screen bg-gray-100">
//         <Sidebar
//           menuItems={menuItems}
//           currentView={currentView}
//           onViewChange={setCurrentView}
//         />

//         <main className="flex-1 overflow-auto p-8">
//           {currentView === "customers" && <Customers />}
//           {currentView === "contacts" && <Contacts />}
//           {currentView === "interactions" && <Interactions />}
//           {currentView === "deals" && <Deals />}

//           {/* Add other views here */}
//         </main>
//       </div>
//     </QueryClientProvider>
//   );
// }

// export default App;

// import React from "react";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { AuthProvider, useAuth } from "./AuthContext";
// import Sidebar from "./components/Sidebar";
// import Customers from "./components/Customers";
// import Contacts from "./components/Contacts";
// import Interactions from "./components/Interactions";
// import Deals from "./components/Deals";
// import Login from "./components/Login";
// import Signup from "./components/Signup";

// const queryClient = new QueryClient();

// function ProtectedRoute({ children }: { children: React.ReactNode }) {
//   const { user } = useAuth();

//   return user ? children : <Navigate to="/login" replace />;
// }

// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <AuthProvider>
//         <Router>
//           <Routes>
//             <Route
//               path="/"
//               element={
//                 <ProtectedRoute>
//                   <CRM />
//                 </ProtectedRoute>
//               }
//             />
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//           </Routes>
//         </Router>
//       </AuthProvider>
//     </QueryClientProvider>
//   );
// }

// function CRM() {
//   const [currentView, setCurrentView] = React.useState("customers");

//   const menuItems = [
//     { id: "customers", label: "Customers", icon: Users },
//     { id: "contacts", label: "Contacts", icon: Building2 },
//     { id: "interactions", label: "Interactions", icon: PhoneCall },
//     { id: "deals", label: "Deals", icon: DollarSign },
//   ];

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar
//         menuItems={menuItems}
//         currentView={currentView}
//         onViewChange={setCurrentView}
//       />

//       <main className="flex-1 overflow-auto p-8">
//         {currentView === "customers" && <Customers />}
//         {currentView === "contacts" && <Contacts />}
//         {currentView === "interactions" && <Interactions />}
//         {currentView === "deals" && <Deals />}
//       </main>
//     </div>
//   );
// }

// export default App;

// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { Users, Building2, PhoneCall, DollarSign } from "lucide-react";
// import { AuthProvider, useAuth } from "./hooks/AuthContext";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import Sidebar from "./components/Sidebar";
// import Customers from "./components/Customers";
// import Contacts from "./components/Contacts";
// import Interactions from "./components/Interactions";
// import Deals from "./components/Deals";

// function ProtectedRoute({ children }: { children: React.ReactNode }) {
//   const { user } = useAuth();
//   return user ? <>{children}</> : <Navigate to="/login" replace />;
// }

// const CRM: React.FC = () => {
//   const menuItems = [
//     { id: "customers", label: "Customers", icon: Users },
//     { id: "contacts", label: "Contacts", icon: Building2 },
//     { id: "interactions", label: "Interactions", icon: PhoneCall },
//     { id: "deals", label: "Deals", icon: DollarSign },
//   ];

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar menuItems={menuItems} />
//       <main className="flex-1 overflow-auto p-8">
//         <Routes>
//           {/* Define routes for each view */}
//           <Route path="customers" element={<Customers />} />
//           <Route path="contacts" element={<Contacts />} />
//           <Route path="interactions" element={<Interactions />} />
//           <Route path="deals" element={<Deals />} />
//           {/* Add nested route for customer interactions */}
//           <Route
//             path={`api/interactions/customer/${customerId}`}
//             element={<Interactions />}
//           />
//           {/* Redirect to customers as default view */}
//           <Route path="/" element={<Navigate to="customers" />} />
//         </Routes>
//       </main>
//     </div>
//   );
// };

// const App: React.FC = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route
//             path="/*"
//             element={
//               <ProtectedRoute>
//                 <CRM />
//               </ProtectedRoute>
//             }
//           />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;

// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   useParams,
// } from "react-router-dom";
// import { Users, Building2, PhoneCall, DollarSign } from "lucide-react";
// import { AuthProvider, useAuth } from "./hooks/AuthContext";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import Sidebar from "./components/Sidebar";
// import Customers from "./components/Customers";
// import Contacts from "./components/Contacts";
// import Interactions from "./components/Interactions";
// import Deals from "./components/Deals";
// import InteractContact from "./components/InteractContact";

// // Protected Route to ensure the user is authenticated
// function ProtectedRoute({ children }: { children: React.ReactNode }) {
//   const { user } = useAuth();
//   return user ? <>{children}</> : <Navigate to="/login" replace />;
// }

// const CRM: React.FC = () => {
//   const menuItems = [
//     { id: "customers", label: "Customers", icon: Users },
//     { id: "contacts", label: "Contacts", icon: Building2 },
//     { id: "interactions", label: "Interactions", icon: PhoneCall },
//     { id: "deals", label: "Deals", icon: DollarSign },
//   ];

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar menuItems={menuItems} />
//       <main className="flex-1 overflow-auto p-8">
//         <Routes>
//           {/* Define routes for each view */}
//           <Route path="customers" element={<Customers />} />

//           {/* Nested Routes for Customer Details */}
//           <Route path="customers/:customerId" element={<CustomerDetails />}>
//             <Route path="contacts" element={<Contacts />} />
//             <Route path="interactions" element={<Interactions />} />
//             <Route path="deals" element={<Deals />} />
//           </Route>

//           <Route path="contacts" element={<Contacts />} />
//           <Route path="interactions" element={<Interactions />} />
//           <Route path="deals" element={<Deals />} />
//           <Route path="/contacts/:id/interact" element={<InteractContact />} />

//           {/* Default redirect to customers */}
//           <Route path="/" element={<Navigate to="customers" />} />
//         </Routes>
//       </main>
//     </div>
//   );
// };

// // Component to display customer details
// const CustomerDetails: React.FC = () => {
//   const { customerId } = useParams();

//   // Here you can fetch customer details and display them
//   return (
//     <div>
//       <h2>Customer Details: {customerId}</h2>
//       {/* Add customer details and actions here */}
//       <div>
//         {/* Add Customer's info, e.g., name, email, etc. */}
//         <p>Details for customer {customerId}</p>
//       </div>
//       <div>
//         {/* Links to navigate within the customer page */}
//         <nav>
//           <ul>
//             <li>
//               <a href={`api/customers/${customerId}/contacts`}>Contacts</a>
//             </li>
//             <li>
//               <a href={`api/customers/${customerId}/interactions`}>
//                 Interactions
//               </a>
//             </li>
//             <li>
//               <a href={`api/customers/${customerId}/deals`}>Deals</a>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </div>
//   );
// };

// const App: React.FC = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route
//             path="/*"
//             element={
//               <ProtectedRoute>
//                 <CRM />
//               </ProtectedRoute>
//             }
//           />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
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
import InteractContact from "./components/InteractContact";

// Protected Route to ensure the user is authenticated
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  return user && isAuthenticated() ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace />
  );
}

// Dark mode support
const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("darkMode", isDarkMode.toString());
  }, [isDarkMode]);

  return { isDarkMode, toggleDarkMode: () => setIsDarkMode(!isDarkMode) };
};

const CRM: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const menuItems = [
    { id: "customers", label: "Customers", icon: Users },
    { id: "contacts", label: "Contacts", icon: Building2 },
    { id: "interactions", label: "Interactions", icon: PhoneCall },
    { id: "deals", label: "Deals", icon: DollarSign },
  ];

  return (
    <div
      className={`flex h-screen ${
        isDarkMode ? "bg-gray-950 text-white" : "bg-gray-100"
      }`}
    >
      <Sidebar menuItems={menuItems} isDarkMode={isDarkMode} />
      <main className="flex-1 overflow-auto p-8">
        <div className="flex justify-end mb-4">
          <div className="text-2xl cursor-pointer">
            <span className="" onClick={() => toggleDarkMode((prev) => !prev)}>
              {isDarkMode ? "※" : "◉"}
            </span>
          </div>
        </div>
        <Routes>
          {/* Define routes for each view */}
          <Route
            path="customers"
            element={<Customers isDarkMode={isDarkMode} />}
          />

          {/* Nested Routes for Customer Details */}
          <Route
            path="customers/:customerId"
            element={<CustomerDetails isDarkMode={isDarkMode} />}
          >
            <Route
              path="contacts"
              element={<Contacts isDarkMode={isDarkMode} />}
            />
            <Route
              path="interactions"
              element={<Interactions isDarkMode={isDarkMode} />}
            />
            <Route path="deals" element={<Deals isDarkMode={isDarkMode} />} />
          </Route>

          <Route
            path="contacts"
            element={<Contacts isDarkMode={isDarkMode} />}
          />
          <Route
            path="interactions"
            element={<Interactions isDarkMode={isDarkMode} />}
          />
          <Route path="deals" element={<Deals isDarkMode={isDarkMode} />} />
          <Route
            path="/contacts/:id/interact"
            element={<InteractContact isDarkMode={isDarkMode} />}
          />

          {/* Default redirect to customers */}
          <Route path="/" element={<Navigate to="customers" />} />
        </Routes>
      </main>
    </div>
  );
};

// Component to display customer details
const CustomerDetails: React.FC = () => {
  const { customerId } = useParams();

  return (
    <div>
      <h2>Customer Details: {customerId}</h2>
      <div>
        <p>Details for customer {customerId}</p>
      </div>
      <div>
        <nav>
          <ul>
            <li>
              <a href={`api/customers/${customerId}/contacts`}>Contacts</a>
            </li>
            <li>
              <a href={`api/customers/${customerId}/interactions`}>
                Interactions
              </a>
            </li>
            <li>
              <a href={`api/customers/${customerId}/deals`}>Deals</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/*"
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
