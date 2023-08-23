import { useEffect, useState } from "react";
import "./App.css";

const localData = () => {
  const list = localStorage.getItem("data");

  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

function App() {
  const [input, setinput] = useState("");
  const [item, setItem] = useState(localData());
  const [togglebtn, setTogglebtn] = useState(true);
  const [isedit, setIsEdit] = useState(null);

  const deleteData = (id) => {
    const updateItem = item.filter((val, i) => {
      return val.id !== id;
    });

    setItem(updateItem);
  };

  const editData = (id) => {
    const newEditData = item.find((elem) => {
      return elem.id === id;
    });
    setTogglebtn(false);
    setinput(newEditData.name);
    setIsEdit(id);
  };
  
  const removeAll = () => {
  
    setItem([]);
  }

  const handlerChange = (e) => {
    setinput(e.target.value);
  };

  const handlerClick = () => {
    if (!input) {
      alert("Please filled something into input box");
    } else if (input && !togglebtn) {
      setItem(
        item.map((elem) => {
          if (elem.id === isedit) {
            return { ...elem, name: input };
          }

          return elem;
        }));
      
      setTogglebtn(true);
      setinput('');
      setIsEdit(null);
      
    } else {
      const inputData = { id: new Date().getTime().toString(), name: input };

      setItem([...item, inputData]);
      setinput("");
    }
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(item));
  }, [item]);

  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <div className="input-box">
            <input
              type="text"
              value={input}
              placeholder="Enter the Name"
              onChange={handlerChange}
            />
            {togglebtn ? (
              <button onClick={handlerClick}>Add</button>
            ) : (
              <button onClick={handlerClick}>Edit</button>
            )}
          </div>
          <div className="value">
            {item.map((val, i) => (
              <div key={i} className="itemmap">
                <h2>{val.name}</h2>

                <div className="editDeletebtn">
                  <button onClick={() => deleteData(val.id)}>Delete</button>
                  <button onClick={() => editData(val.id)}>Edit</button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="removeBtn">
        <button onClick={removeAll}>Remove All</button>
        </div>
        </div>
        
      </div>
    </>
  );
}

export default App;
