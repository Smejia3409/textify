import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState("");
  const formData = new FormData();
  formData.append("file", file[0]);

  const handleSubmit = async () => {
    try {
      const data = await axios.post("http://localhost:5000/convert", formData);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(file);
  }, [file]);

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files)} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
