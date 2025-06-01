import { useEffect, useState } from "react";

const LearningReact = () => {
  const [renderCount, setRenderCount] = useState(1);
const [inputValue, setInputValue] = useState("");

useEffect(() => {
  setRenderCount((prev) => prev + 1);
}, [inputValue]);

return (
  <>

  <input
    type="text"
    value={inputValue}
    onChange={(e) => setInputValue(e.target.value)}
    className="h-[200px] bg-blue-600"
  />

  <h1>render count : {renderCount}</h1>
  
  </>
);

  
};

export default LearningReact;
