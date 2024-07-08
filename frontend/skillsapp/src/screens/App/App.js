
import '../App/App';
import {Form, Link,Route,BrowserRouter as Router,Routes} from 'react-router-dom';
import Login from '../Login/Login';
import Navbar from '../Navbar/Navbar';
import SkillRecommendationForm from '../dashboard/additionalFeatures/additionalfeature';
import Profile3 from '../Profile/profile3';
import BarChartComponent from '../dashboard/Chartforskills';
import AddSkillss from '../dashboard/Addskills/AddSkills';
import UpdateSkillss from '../updateskills/updateskills2';
import SignUp1 from '../Signup/signUp1';
import Dashboard2 from '../dashboard/dashboard';
import Profiledashboard from '../dashboard/Profiledashboard';
import ListSkills1 from '../Listskills/Listskills1';
import Sidebar2 from '../Login/sidebarlogin';
import MainContentlogin from '../Login/MainContentlogin';
import LoginMain from '../Login/Loginmain';


function App() {
  return (
    <>
    <Router>
    <Routes>
    <Route exact path='/' element={<LoginMain />}></Route>
    <Route exact path='/Login' element={<Login />}></Route>
    <Route exact path='/updateskills2' element={<UpdateSkillss />}></Route>
    <Route exact path='/navbar' element={<Navbar />}></Route>
    <Route exact path='/Addskills' element={<AddSkillss />}></Route>
    <Route exact path='/additionalfeatures' element={<SkillRecommendationForm />}></Route>
    <Route exact path='/chartforskills' element={<BarChartComponent/>}></Route>
    <Route exact path='/profile3' element={<Profile3/>}></Route>
    <Route exact path='/dashboard' element={<Dashboard2/>}></Route>
    <Route exact path='/signup1' element={<SignUp1/>}></Route>
    <Route exact path='/Listskill1' element={<ListSkills1/>}></Route>
    <Route exact path='/Profiledashboard' element={<Profiledashboard/>}></Route>
    <Route exact path='/sidebarlogin' element={<Sidebar2/>}></Route>
    <Route exact path='/maincontentlogin' element={<MainContentlogin/>}></Route>
    <Route exact path='/loginmain' element={<LoginMain/>}></Route>
    </Routes>
    </Router>
    </>
  );
}

export default App;

