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
import { MapReview } from "./routes/MapReview";
import { AuthProvider } from "./Authentication/auth";
import TripSettings from "./routes/TripSettings";
import Exploration from "./routes/Exploration";
import AppShowcase from "./routes/AppShowcase";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/vitrine" element={<Exploration/>} />
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
              <Route path="/album" element={<NavigationBarAlbum />}>
                <Route path=":idTravel/map" element={<MapReview />} />
                <Route path="photos" element={<Photos />} />
                <Route path="logbook" element={<LogBook />} />
              </Route>
            </Routes>
            <ReactQueryDevtools /> 
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
