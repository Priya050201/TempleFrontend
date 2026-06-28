import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Festivals from "./pages/Festivals";
import Renovation from "./pages/Renovation";
import Donation from "./pages/Donation";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import ManageFestivals from "./pages/ManageFestivals";
import ManageRenovation from "./pages/ManageRenovation";
import ManageDonation from "./pages/ManageDonation";

function App() {

    return (

        <Routes>

           <Route path="/" element={<Home />} />

           <Route path="/festivals"
                  element={<Festivals />} />

           <Route path="/renovation"
                  element={<Renovation />} />
                  <Route
                      path="/donation"
                      element={<Donation />}
                  />
                  <Route
                      path="/admin-login"
                      element={<AdminLogin />}
                  />
                 <Route
                    path="/dashboard"
                    element={<Dashboard />}
                 />
                 <Route

                     path="/manage-festivals"

                     element={

                         <PrivateRoute>

                             <ManageFestivals />

                         </PrivateRoute>
                     }
                 />
                 <Route

                                      path="/manage-renovation"

                                      element={

                                          <PrivateRoute>

                                              <ManageRenovation />

                                          </PrivateRoute>
                                      }
                                  />
                 <Route
                   path="/manage-donations"
                   element={
                     <PrivateRoute>
                       <ManageDonation />
                     </PrivateRoute>
                   }
                 />

        </Routes>
    );
}

export default App;