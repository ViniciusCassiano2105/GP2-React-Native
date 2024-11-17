import { MyProvider } from './src/context/General/MyContext';
import { Home } from './src/pages/Home';

export default function App() {
  return (
    <MyProvider>
      <Home />
    </MyProvider>
  );
}
