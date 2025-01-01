import React from "react";
import SignIn from "./Authentication/SignIn.jsx";
import Signup from "./Authentication/SignUp.jsx";
// import Home from "./Home.jsx";
import { Routes, Route } from "react-router-dom";
import PatientForm from "./Authentication/Addinformation.jsx";
// import HospitalLocator from "./Map.jsx";
import LandingPage from "./Pages/Landing.jsx";
import ContactUs from "./Pages/ContactUs.jsx";
// import HospitalLocator from "./Map/Maptemp.jsx";
import HospitalLocator from "./Map/Map.jsx";
import Admindash from "./Admin/Admindash.jsx";
import PatientTable from "./Admin/PatientAppoinment/Patientappoinment.jsx";
import AdminDoctorList from "./Admin/AdminDoctorList/AdmindoctorList.jsx";
import AdminPatient from "./Admin/AdminPatientList/Adminpatientlist.jsx";
import SuperAdminLogin from "./Authentication/SuperAdminLogin.jsx";
import AdminDashboard from "./Admin/AdminDashboard.jsx";
import AdminRoute from "./Admin/AdminRoute.jsx";
import LoginPage from "./Authentication/HealthOrgAndDoctor.jsx";
import Patientdash from "./Patient/PatientDash/Patientdash.jsx";
import PatientProfile from "./Patient/PatientProfile/Patientprofile.jsx";
import Patientappoinments from "./Patient/PatientAppoinment/Patientappoinments.jsx";
import HospitalCard from "./Patient/HospitalCard/Hospitalcard.jsx";
import Hospitaldash from "./Hospital/Hospitaldash.jsx";
import HospitalDoctorList from "./Hospital/HospitalDoctorList.jsx/HospitalDoctorlist.jsx";
import HospitalPatientList from "./Hospital/HospitalPatientAppoinment/HospitalPatientappoinment.jsx";
import HospitalPatientappoinments from "./Hospital/HospitalPatientAppoinment/HospitalPatientappoinment.jsx";
import AdminDashboard_New from "./Admin_new/AdminDash.jsx";
import AppointmentScheduler from "./Patient/PatientAppoinment/AppointmentScheduler.jsx";



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact" element={<ContactUs/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/adminlogin" element={<SuperAdminLogin />} />
        <Route path="/patientform" element={<PatientForm />} />
        <Route path="/map" element={<HospitalLocator />} />
        <Route path="/admindash" element={<Admindash />} />
        <Route path="/healthanddoc" element={<LoginPage />} />
        <Route path="/patientdash" element={<Patientdash />} />
        <Route path="/patientprofile" element={<PatientProfile />} />
        <Route path="/patient-appointments" element={<Patientappoinments />} />
        <Route path="/patientschedule" element={<AppointmentScheduler />} />
        <Route path="/hospital-card" element={<HospitalCard />} />
        <Route path="/hospitaldash" element={<Hospitaldash />} />
        <Route path="/hospital-doctorlist" element={<HospitalDoctorList />} />
        <Route path="/hospital-patientlist" element={<HospitalPatientList />} />
        <Route
          path="/hospital-patient-appoinment"
          element={<HospitalPatientappoinments />}
        />
        <Route
        path="/admin-patient-appointments"
        element={
          <AdminRoute>
            <PatientTable />
          </AdminRoute>
        }
      />
      <Route
        path="/admin-doctors"
        element={
          <AdminRoute>
            <AdminDoctorList />
          </AdminRoute>
        }
      />
      <Route
        path="/admin-patients"
        element={
          <AdminRoute>
            <AdminPatient />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard_New />
          </AdminRoute>
        }
      />
      </Routes>
    </>
  );
}

export default App;
