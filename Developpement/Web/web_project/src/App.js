import React from "react";
import "./App.css";
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
import { Map } from "./components/Map";

import {
  Stack,
  Divider,
  Tab,
  Tabs,
  Typography,
  FormControlLabel,
  Switch,
} from "@mui/material";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import MapRoundedIcon from "@mui/icons-material/MapRounded";
import CommuteRoundedIcon from "@mui/icons-material/CommuteRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import TodoList from "./routes/TodoList";

import Home from "./routes/Home";
import Itinerary from "./routes/Itinerary";
import NavigationBar from "./components/NavigationBar";
import Informations from "./routes/Informations";
import Members from "./routes/Members";
import TripSelection from "./routes/TripSelection";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mytrips" element={<TripSelection />}/>
          <Route path="/trip" element={<NavigationBar />}>
              <Route path="map" element={<Itinerary />} />
              <Route path="todolist" element={<TodoList />} />
              <Route path="informations" element={<Informations />} />
              <Route path="members" element={<Members />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
