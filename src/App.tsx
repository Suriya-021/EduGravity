
import { EarthViewer } from './components/Map/EarthViewer';
import { ChatInterface } from './components/Chat/ChatInterface';

function App() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Map */}
      <EarthViewer />

      {/* Overlay Chat */}
      <ChatInterface />
    </div>
  );
}

export default App;
