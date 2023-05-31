import Nav from './Nav';
import MainPage from './MainPage';
import AttendConferenceForm from './AttendConferenceForm';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import PresentationForm from './PresentationForm';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom'

function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="presentations/new" element={<PresentationForm />} />
          <Route path="conferences/new" element={<ConferenceForm />} />
          <Route path="attendees/new" element={<AttendConferenceForm />} />
          <Route path="locations/new" element={<LocationForm />} />
          <Route path="attendees" element={<AttendeesList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
