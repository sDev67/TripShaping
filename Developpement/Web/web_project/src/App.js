import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
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
import { AuthProvider } from "./Authentication/auth";


const queryClient = new QueryClient();

function App() {
  return (
    <>
      <BrowserRouter>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/mytrips" element={<TripSelection />} />
            <Route path="/trip" element={<NavigationBar />}>
              <Route path=":idTravel/map" element={<Itinerary />} />
              <Route path=":idTravel/steps" element={<Steps />} />
              <Route path=":idTravel/todolist" element={<TodoList />} />
              <Route path=":idTravel/informations" element={<Informations />} />
              <Route path=":idTravel/members" element={<Members />} />
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
