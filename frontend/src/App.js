import { useEffect, useState } from "react";

function App() {
  const [file, setFile] = useState("");

  useEffect(() => {
    console.log(file);
  }, [file]);

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files)} />
    </div>
  );
}

export default App;
