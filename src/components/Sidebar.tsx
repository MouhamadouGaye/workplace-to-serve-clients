// interface SidebarProps {
//   menuItems: { id: string; label: string; icon: string }[];
//   currentView: string;
//   onViewChange: (view: string) => void;
// }

// export default function Sidebar({
//   menuItems,
//   currentView,
//   onViewChange,
// }: SidebarProps) {
//   return (
//     <aside className="w-64 bg-white shadow-md">
//       <div className="p-6">
//         <h1 className="text-2xl font-bold text-gray-800">CRM System</h1>
//       </div>

//       <nav className="mt-6">
//         {menuItems.map((item) => {
//           const Icon = item.icon;
//           return (
//             <button
//               key={item.id}
//               onClick={() => onViewChange(item.id)}
//               className={`w-full flex items-center px-6 py-3 text-left ${
//                 currentView === item.id
//                   ? "bg-blue-50 text-blue-600"
//                   : "text-gray-600 hover:bg-gray-50"
//               }`}
//             >
//               <Icon className="w-5 h-5 mr-3" />
//               <span className="font-medium">{item.label}</span>
//             </button>
//           );
//         })}
//       </nav>
//       <div></div>
//     </aside>
//   );
// }

// import React from "react";
// import { useAuth } from "../hooks/AuthContext";
// import { useNavigate } from "react-router-dom";

// interface SidebarProps {
//   menuItems: { id: string; label: string; icon: any }[];
//   currentView: string;
//   onViewChange: (view: string) => void;
// }

// export default function Sidebar({
//   menuItems,
//   currentView,
//   onViewChange,
// }: SidebarProps) {
//   const { logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <aside className="w-64 bg-white shadow-md flex flex-col justify-between">
//       <div>
//         <div className="p-6">
//           <h1 className="text-2xl font-bold text-gray-800">CRM System</h1>
//         </div>

//         <nav className="mt-6">
//           {menuItems.map((item) => {
//             const Icon = item.icon;
//             return (
//               <button
//                 key={item.id}
//                 onClick={() => onViewChange(item.id)}
//                 className={`w-full flex items-center px-6 py-3 text-left ${
//                   currentView === item.id
//                     ? "bg-blue-50 text-blue-600"
//                     : "text-gray-600 hover:bg-gray-50"
//                 }`}
//               >
//                 <Icon className="w-5 h-5 mr-3" />
//                 <span className="font-medium">{item.label}</span>
//               </button>
//             );
//           })}
//         </nav>
//       </div>

//       <div className="p-6 border-t border-gray-200">
//         <button
//           onClick={handleLogout}
//           className="w-full flex items-center  px-6 py-3 text-left text-gray-600 hover:bg-gray-50"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="1.5"
//             stroke="currentColor"
//             className="w-5 h-5 mr-3"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-9A2.25 2.25 0 002.25 5.25v13.5A2.25 2.25 0 004.5 21h9a2.25 2.25 0 002.25-2.25V15M9 12h12m0 0l-3-3m3 3l-3 3"
//             />
//           </svg>
//           <span className="font-medium">Logout</span>
//         </button>
//       </div>
//     </aside>
//   );
// }

import React from "react";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarProps {
  menuItems: { id: string; label: string; icon: any }[];
  isDarkMode: boolean;
}

export default function Sidebar({ menuItems, isDarkMode }: SidebarProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside
      className={`w-64 ${
        isDarkMode ? "bg-gray-900 text-cyan-500" : "text-gray-800  bg-white"
      } shadow-md flex flex-col justify-between`}
    >
      <div>
        <div className="p-6">
          <h1
            className={`text-2xl font-bold ${
              isDarkMode ? "bg-gray-900 text-cyan-500 " : "text-gray-800"
            } `}
          >
            CRM System
          </h1>
        </div>

        <nav className="mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.includes(item.id);

            return (
              <button
                key={item.id}
                onClick={() => navigate(`/${item.id}`)}
                className={`w-full flex items-center px-6 py-3 text-left ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-500 hover:bg-gray-700 hover:text-cyan-500"
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-6 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-6 py-3 text-left text-gray-600 hover:bg-gray-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-9A2.25 2.25 0 002.25 5.25v13.5A2.25 2.25 0 004.5 21h9a2.25 2.25 0 002.25-2.25V15M9 12h12m0 0l-3-3m3 3l-3 3"
            />
          </svg>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
