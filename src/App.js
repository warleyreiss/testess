
import { AppRouter } from "./routes";
import { AuthProvider } from "./context/AuthContext";
import JustificationVisit from "./components/pages/visit/form-justification";
export const App = () => {
  return (
    <AuthProvider>
    <JustificationVisit/>
      <AppRouter />
    </AuthProvider>
  );
};
