import TaskManager from "./components/TaskManager";
import StarsBackground from "./components/StarsBackground"

export default function Page() {
  return (
    <div>
      <StarsBackground />
      <div style={{ textAlign: "center", padding: "20px" }}></div>
      <TaskManager />
    </div>
  );
}
