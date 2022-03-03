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
import TodoList from "./TodoList/TodoList";

import Home from "./routes/Home";
import Itinerary from "./routes/Itinerary";
import NavigationBar from "./components/NavigationBar";

function App() {
  

  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NavigationBar />}>
              <Route path="itinerary" element={<Itinerary />} />
              <Route path="todolist" element={<TodoList />} />
            </Route>
          </Routes>
        </BrowserRouter>

        {/** 
         * <Stack style={{ width: '100%' }}>
           
          </Stack>
        */}
      
    </>
  );
}

export default App;
