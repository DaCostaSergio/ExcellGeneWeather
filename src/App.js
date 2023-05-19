
import './App.css';
import NavHeader from './Components/NavHeader'

import WeatherDataFetcher from './Components/WeatherDataFetcher'

function App() {
  return (
    <div className="bg-[url('../src/Assets/pexels-darius-krause-2182040.png')] bg-cover h-screen">
      <NavHeader></NavHeader>
      <div className='mx-5'>
        <WeatherDataFetcher></WeatherDataFetcher>
      </div>

    </div>
  );
}

export default App;
