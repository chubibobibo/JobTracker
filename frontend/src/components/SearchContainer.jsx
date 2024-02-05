import RegFormComponent from "./RegFormComponent";
import SelectFormComponent from "./SelectFormComponent";
import SelectFormComponent2 from "./SelectFormComponent2";
import SelectFormComponent3 from "./selectFormComponent3";
import ButtonComponent from "./ButtonComponent";

import { useState } from "react";

//css styles
import "../utils/styles/searchContainer.css";
//object to use as the select input options
const statusObj = {
  pending: "pending",
  interview: "interview",
  declined: "declined",
};

const typeObj = {
  fullTime: "full-time",
  partTime: "part-time",
  internship: "internship",
};

const sortingOptions = {
  newest: "newest",
  oldest: "oldest",
  az: "a-z",
  za: "z-a",
};

function SearchContainer() {
  //state to manage select form data
  const [selectData, setSelectData] = useState({
    jobStatus: "",
    jobType: "",
    sort: "",
  });

  //state handleer to grab values from select inputs.
  const handleChange = (e) => {
    setSelectData((newData) => {
      return { ...newData, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className='searchContainer'>
      <form>
        <div className='regForm'>
          <RegFormComponent
            label={"position"}
            name={"search"}
            type={"search"}
            //   defaultValues={"a"}
          />
          <RegFormComponent label={"company"} name={"search"} type={"search"} />
          <SelectFormComponent
            selectData={selectData} //used to five value to the form
            handleChange={handleChange}
            label={"jobStatus"}
            status={statusObj} //for select input options
          />
          <SelectFormComponent2
            selectData={selectData} //used to five value to the form
            handleChange={handleChange}
            label={"jobType"}
            status={typeObj} //for select input options
          />
          <SelectFormComponent3
            selectData={selectData} //used to five value to the form
            handleChange={handleChange}
            label={"sort"}
            status={sortingOptions} //for select input options
          />
          <div className='buttonContainer'>
            <ButtonComponent
              type={"submit"}
              label={"Search"}
              color={"primary"}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
export default SearchContainer;
