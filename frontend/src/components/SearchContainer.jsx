import RegFormComponent from "./RegFormComponent";
import SelectFormComponent from "./SelectFormComponent";
import SelectFormComponent2 from "./SelectFormComponent2";

function SearchContainer() {
  return (
    <div className='searchContainer'>
      <form>
        <RegFormComponent
          label={"position"}
          name={"search"}
          type={"search"}
          //   defaultValues={"a"}
        />
        <RegFormComponent />
        <button type='submit'>Search</button>
      </form>
    </div>
  );
}
export default SearchContainer;
