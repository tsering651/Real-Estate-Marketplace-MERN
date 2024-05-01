import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer';

// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));
const About = lazy(() => import('./pages/About'));
const Profile = lazy(() => import('./pages/Profile'));
const CreateListing = lazy(() => import('./pages/CreateListing'));
const Gallery = lazy(() => import('./pages/Gallery'));
const ShowListing = lazy(() => import('./pages/ShowListing'));
const UpdateListing = lazy(() => import('./pages/UpdateListing'));
const Listing = lazy(() => import('./pages/Listing'));
const ReqInfo = lazy(() => import('./pages/ReqInfo'));
const Search = lazy(() => import('./pages/Search'));

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route path="/show-listing" element={<ShowListing />} />
            <Route
              path='/update-listing/:listingId'
              element={<UpdateListing />}
            />
          </Route>
          <Route path='/search' element={<Search />} />
          <Route path="/about" element={<About />} />
          <Route path="/listing/:listingId" element={<Listing />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/request-info" element={<ReqInfo />} />
        </Routes>
      </Suspense>
      <Footer/>
    </BrowserRouter>
  );
}
