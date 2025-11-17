import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import About from "../pages/About";
import Celliers from "../pages/Celliers";
import Cellier from "../pages/Cellier";
import Vins from "../pages/Vins";
import EditVin from "../pages/EditVin";
import ConfirmDeleteVin from "../pages/ConfirmDeleteVin";
import Pays from "../pages/Pays";
import Regions from "../pages/Regions";
import Millesimes from "../pages/Millesimes";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import VinsManager from "../pages/VinsManager";

export default function AppRoutes() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/celliers" element={<Celliers />} />
                <Route path="/celliers/:id" element={<Cellier />} />
                <Route path="/vins" element={<Vins />} />
                <Route path="/vins/:id/edit" element={<EditVin />} />
                <Route path="/vins/:id/delete" element={<ConfirmDeleteVin />} />
                <Route path="/manage/vins" element={<VinsManager />} />
                <Route path="/pays" element={<Pays />} />
                <Route path="/regions" element={<Regions />} />
                <Route path="/millesimes" element={<Millesimes />} />
                <Route path="/profile" element={<Profile />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </Layout>
    );
}
