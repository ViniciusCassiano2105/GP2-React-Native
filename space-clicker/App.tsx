import { MyProvider } from './src/context/General/MyContext';
import { Home } from './src/pages/Home';
import { Placar } from './src/pages/Placar';


export default function App() {
  return (
    <MyProvider>
      <Placar />
    </MyProvider>
  );
}
