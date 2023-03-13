import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function App() {
  const [file, setFile] = useState("");
  const [text, setText] = useState("");
  const [contentContainer, setContentContainer] = useState(false);
  const formData = new FormData();
  formData.append("file", file[0]);

  const handleSubmit = async () => {
    try {
      setContentContainer(false);
      if (file == "") {
        setText("Please select a file");
        setContentContainer(true);

        throw new Error("Please select a file");
      }
      setContentContainer(true);
      setText("Loading...");
      const data = await axios.post("http://localhost:5000/convert", formData);

      console.log(data);
      setText(data.data.text);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(file);

    console.log(text);
  }, [file]);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 border border-danger ">
      <div>
        <h2>Textify</h2>
        <h5>Turning words to text</h5>

        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Select file</Form.Label>

            <div className="d-flex">
              <Form.Control
                type="file"
                onChange={(e) => setFile(e.target.files)}
              />
              <Button variant="outline-success" onClick={handleSubmit}>
                Textify
              </Button>
            </div>
          </Form.Group>
        </Form>
        {contentContainer && <p>{text}</p>}
      </div>
    </div>
  );
}

export default App;
