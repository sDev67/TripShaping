import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import TodoList from "./routes/TodoList";
import Home from "./routes/Home";
import Itinerary from "./routes/Itinerary";
import NavigationBar from "./components/NavigationBar";
import Informations from "./routes/Informations";
import Members from "./routes/Members";
import TripSelection from "./routes/TripSelection";
import Steps from "./routes/Steps";
import Signin from "./routes/Signin";
import Signup from "./routes/Signup";
import Documents from "./routes/Documents";
import NavigationBarAlbum from "./components/NavigationBarAlbum";
import Photos from "./routes/Photos";
import LogBook from "./routes/LogBook";
import { AuthProvider } from "./Authentication/auth";
import TripSettings from "./routes/TripSettings";
import Exploration from "./routes/Exploration";
import AppShowcase from "./routes/AppShowcase";
import {
  setTranslationConfig,
  registerTranslations,
} from "@psyycker/react-translation";
// Always call first before initialising the config
import "@psyycker/react-translation";
import french from "./translations/french.json";
import english from "./translations/english.json";
import ItineraryAlbum from "./routes/ItineraryAlbum";
import NavigationBarDisplay from "./components/NavigationBarDisplay";
import ItineraryDisplay from "./routes/ItineraryDisplay";
import { MapAlbum } from "./components/MapAlbum";

const queryClient = new QueryClient();

registerTranslations({
  en: english,
  fr: french,
});

// Do not call inside a component
setTranslationConfig({
  defaultLocale: "fr",
});

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/" element={<AppShowcase />} />
              <Route path="/discover" element={<Exploration />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/mytrips" element={<TripSelection />} />
              <Route path="/trip" element={<NavigationBar />}>
                <Route path=":idTravel/map" element={<Itinerary />} />
                <Route path=":idTravel/steps" element={<Steps />} />
                <Route path=":idTravel/todolist" element={<TodoList />} />
                <Route
                  path=":idTravel/informations"
                  element={<Informations />}
                />
                <Route path=":idTravel/documents" element={<Documents />} />
                <Route path=":idTravel/members" element={<Members />} />
                <Route
                  path=":idTravel/tripsettings"
                  element={<TripSettings />}
                />
              </Route>
              <Route
                path="/album/:cryptedName"
                element={<NavigationBarAlbum />}
              >
                <Route path="map" element={<MapAlbum />} />
                <Route path="photos" element={<Photos />} />
                <Route path="logbook" element={<LogBook />} />
              </Route>
              <Route path="/display" element={<NavigationBarDisplay />}>
                <Route path=":idTravel/map" element={<ItineraryDisplay />} />
              </Route>
            </Routes>
            {/* <ReactQueryDevtools />  */}
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
