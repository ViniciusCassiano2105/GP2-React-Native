import { MyProvider } from './src/context/General/MyContext';
import { Home } from './src/pages/Home';
import { Inicial } from './src/pages/Inicial';

export default function App() {
  return (
    <MyProvider>
      {/* <Home /> */}
      <Inicial/>
    </MyProvider>
  );
}
